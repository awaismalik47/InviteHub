import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, computed, input, viewChild } from '@angular/core';
import { TemplateItem } from '../../data/template-categories';
import { TemplateCard } from '../template-card/template-card';
import { GsapAnimation } from '../../services/gsap-animation';

interface Slide {
  key: string;
  item: TemplateItem;
}

interface SwiperInstance {
  activeIndex: number;
  update: () => void;
  slideTo: (index: number, speed?: number) => void;
  slidePrev: () => void;
  slideNext: () => void;
  on: (event: string, callback: () => void) => void;
}

interface SwiperContainerEl extends HTMLElement {
  initialize: () => void;
  swiper?: SwiperInstance;
}

/** How many slides get duplicated at each end to fake an infinite loop — same trick as the "Our Work" portfolio slider. */
const MAX_BUFFER = 5;

/**
 * A single-category "Our Work"-style reel slider: identical mechanism and
 * look (buffered infinite loop, tiered coverflow depth, prev/next nav) to
 * the portfolio slider, just pre-scoped to one category's items with no
 * filter tabs — used once per template category (Trending, Hot Selling, …).
 */
@Component({
  imports: [TemplateCard],
  selector: 'app-template-carousel',
  styleUrl: './template-carousel.scss',
  templateUrl: './template-carousel.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplateCarousel implements AfterViewInit {
  eyebrow = input.required<string>();
  heading = input.required<string>();
  items = input.required<TemplateItem[]>();
  /** Optional anchor id so nav/hero links can scroll straight to a specific category. */
  sectionId = input<string>();

  /** The real items padded with duplicate slides at each end, same approach as the portfolio slider — see its comment for why. */
  readonly slideSet = computed(() => {
    const items = this.items();
    const bufferSize = Math.min(MAX_BUFFER, items.length);
    const head: Slide[] = items.slice(-bufferSize).map((item, i) => ({ item, key: `pre-${i}-${item.id}` }));
    const main: Slide[] = items.map((item) => ({ item, key: `real-${item.id}` }));
    const tail: Slide[] = items.slice(0, bufferSize).map((item, i) => ({ item, key: `post-${i}-${item.id}` }));
    return { slides: [...head, ...main, ...tail], bufferSize, realCount: items.length };
  });

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainerEl>>('swiperEl');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const el = this.swiperEl().nativeElement;
    const { bufferSize } = this.slideSet();

    Object.assign(el, {
      slidesPerView: 1.7,
      centeredSlides: true,
      initialSlide: bufferSize,
      spaceBetween: 20,
      grabCursor: true,
      speed: 500,
      keyboard: { enabled: true },
      a11y: { enabled: true },
      breakpoints: {
        640: { slidesPerView: 2.6, spaceBetween: 24 },
        900: { slidesPerView: 3.4, spaceBetween: 32 },
        1200: { slidesPerView: 4.2, spaceBetween: 36 },
        1500: { slidesPerView: 5, spaceBetween: 44 },
      },
    });
    el.initialize();
    el.swiper?.on('transitionEnd', () => this.snapIntoBuffer());

    this.anim.revealOnScroll(this.section().nativeElement);
  }

  /** Once a transition settles inside a duplicate buffer zone, jump
   * instantly (0ms) to the matching real slide — invisible to the user
   * since it only happens after motion has already stopped. */
  private snapIntoBuffer(): void {
    const swiper = this.swiperEl().nativeElement.swiper;
    if (!swiper) return;
    const { bufferSize, realCount } = this.slideSet();
    const index = swiper.activeIndex;
    if (index < bufferSize) {
      swiper.slideTo(index + realCount, 0);
    } else if (index >= bufferSize + realCount) {
      swiper.slideTo(index - realCount, 0);
    }
  }

  slidePrev(): void {
    this.swiperEl().nativeElement.swiper?.slidePrev();
  }

  slideNext(): void {
    this.swiperEl().nativeElement.swiper?.slideNext();
  }
}
