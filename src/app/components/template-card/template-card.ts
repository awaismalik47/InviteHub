import { Component, ElementRef, computed, effect, input, signal, viewChild } from '@angular/core';
import { TemplateItem } from '../../data/template-categories';

@Component({
  imports: [],
  selector: 'app-template-card',
  styleUrl: './template-card.scss',
  templateUrl: './template-card.html',
})
export class TemplateCard {
  item = input.required<TemplateItem>();
  /** Only the active (centered) card in its carousel plays with sound by default — every other card stays muted. */
  active = input(false);
  /** Whether this card's whole carousel is actually on-screen right now.
   * All visible cards autoplay (muted) once true — this just stops every
   * category's videos autoplaying at once regardless of scroll position. */
  carouselVisible = input(true);

  /** Explicit visitor override from the mute/unmute button — null means "follow the active-based default". */
  private readonly manualMuted = signal<boolean | null>(null);
  readonly muted = computed(() => this.manualMuted() ?? !this.active());

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    // Reset back to the automatic default whenever this card becomes (in)active,
    // so an override doesn't linger once a different slide takes over.
    effect(() => {
      this.active();
      this.manualMuted.set(null);
    });

    // Browsers block unmuted autoplay without a real user gesture — when that
    // happens the video would otherwise just sit there blank. Attempt to play
    // at the desired mute state, and if that's rejected, fall back to muted
    // playback (and reflect that back into state so the button matches reality)
    // rather than leaving the card frozen on nothing.
    effect(() => {
      const el = this.video()?.nativeElement;
      if (!el) return;
      const shouldBeMuted = this.muted();
      el.muted = shouldBeMuted;
      el.play().catch(() => {
        if (!el.muted) {
          el.muted = true;
          this.manualMuted.set(true);
          el.play().catch(() => {});
        }
      });
    });
  }

  toggleMute(event: Event): void {
    event.stopPropagation();
    this.manualMuted.set(!this.muted());
  }
}
