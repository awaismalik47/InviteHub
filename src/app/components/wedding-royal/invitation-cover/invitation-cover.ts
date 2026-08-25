import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';

@Component({
  imports: [],
  selector: 'app-invitation-cover',
  styleUrl: './invitation-cover.scss',
  templateUrl: './invitation-cover.html',
})
export class InvitationCover implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  readonly playing = signal(false);
  readonly finished = signal(false);

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

    video.addEventListener('ended', () => this.finished.set(true));
  }

  /** The video stays paused on load and only starts once the visitor taps the play button. */
  playVideo(): void {
    if (this.playing()) return;
    this.video()
      ?.nativeElement.play()
      .then(() => this.playing.set(true))
      .catch(() => {});
  }
}
