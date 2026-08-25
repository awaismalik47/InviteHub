import { AfterViewInit, Component, ElementRef, computed, input, signal, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-hashtag-share',
  styleUrl: './hashtag-share.scss',
  templateUrl: './hashtag-share.html',
})
export class HashtagShare implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  readonly copied = signal(false);

  readonly shareUrl = computed(() => (typeof window !== 'undefined' ? window.location.href : ''));

  readonly whatsappShare = computed(
    () => `https://wa.me/?text=${encodeURIComponent(`${this.config().hashtag} — ${this.shareUrl()}`)}`,
  );
  readonly facebookShare = computed(
    () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl())}`,
  );
  readonly twitterShare = computed(
    () =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.config().hashtag)}&url=${encodeURIComponent(this.shareUrl())}`,
  );

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }

  async copyHashtag(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.config().hashtag);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      this.copied.set(false);
    }
  }
}
