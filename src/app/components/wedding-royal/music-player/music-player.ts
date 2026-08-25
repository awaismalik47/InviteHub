import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-music-player',
  styleUrl: './music-player.scss',
  templateUrl: './music-player.html',
})
export class MusicPlayer {
  musicSrc = input<string>();
  slug = input.required<string>();

  private readonly audio = viewChild.required<ElementRef<HTMLAudioElement>>('audio');

  readonly playing = signal(false);

  /** Called by the parent once the visitor taps "Open Invitation" — a real user gesture, so autoplay-with-sound is allowed. */
  start(): void {
    if (!this.musicSrc()) return;
    if (window.sessionStorage.getItem(this.storageKey()) === 'off') return;

    this.audio()
      .nativeElement.play()
      .then(() => this.playing.set(true))
      .catch(() => this.playing.set(false));
  }

  toggle(): void {
    const el = this.audio().nativeElement;
    if (this.playing()) {
      el.pause();
      this.playing.set(false);
      window.sessionStorage.setItem(this.storageKey(), 'off');
    } else {
      el.play()
        .then(() => {
          this.playing.set(true);
          window.sessionStorage.setItem(this.storageKey(), 'on');
        })
        .catch(() => {});
    }
  }

  private storageKey(): string {
    return `wedding-music:${this.slug()}`;
  }
}
