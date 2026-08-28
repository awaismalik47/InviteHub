import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, input, signal, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';

@Component({
  imports: [],
  selector: 'app-invitation-cover',
  styleUrl: './invitation-cover.scss',
  templateUrl: './invitation-cover.html',
})
export class InvitationCover implements AfterViewInit, OnDestroy {
  config = input.required<WeddingConfig>();

  private readonly section = viewChild<ElementRef<HTMLElement>>('section');
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  readonly playing = signal(false);
  readonly finished = signal(false);

  /** Fires the first time the visitor actually interacts with the video (tapping pause/resume) —
   *  a real user gesture, so the parent can safely start the music with sound right then. */
  @Output() userInteracted = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasInteracted = false;

  ngAfterViewInit(): void {
    const video = this.video()?.nativeElement;
    if (!video) return;

    // Paused videos don't always paint their first frame just from preload
    // (notably on Safari/iOS) — nudging currentTime forces that frame to
    // render so the video is visible immediately, without actually playing.
    const paintFirstFrame = () => {
      video.currentTime = 0.01;
    };
    if (video.readyState >= 1) {
      paintFirstFrame();
    } else {
      video.addEventListener('loadedmetadata', paintFirstFrame, { once: true });
    }

    video.addEventListener('play', () => this.playing.set(true));
    video.addEventListener('pause', () => this.playing.set(false));
    video.addEventListener('ended', () => this.finished.set(true));

    // Auto-play while the cover is actually in view, pause once it's scrolled away —
    // muted, so this needs no user gesture. Only for the first watch-through; once the
    // cinematic has finished, scrolling back into view shouldn't restart it on its own.
    const section = this.section()?.nativeElement;
    if (section && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (this.finished()) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.4 },
      );
      this.observer.observe(section);
    } else {
      video.play().catch(() => {});
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /** Manual pause/resume control. Also doubles as the first real user gesture, which is
   *  what unlocks starting the music (see userInteracted above). */
  togglePlay(): void {
    const video = this.video()?.nativeElement;
    if (!video) return;

    if (video.paused) {
      if (video.ended) {
        video.currentTime = 0;
        this.finished.set(false);
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    if (!this.hasInteracted) {
      this.hasInteracted = true;
      this.userInteracted.emit();
    }
  }
}
