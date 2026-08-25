import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FloralFlourish } from '../floral-flourish/floral-flourish';
import { PORTFOLIO_ITEMS, PortfolioCategory, PortfolioItem } from '../../data/portfolio-items';
import { GsapAnimation } from '../../services/gsap-animation';

type FilterId = 'all' | PortfolioCategory;

interface FilterTab {
  id: FilterId;
  label: string;
}

interface Slide {
  key: string;
  item: PortfolioItem;
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

/** How many slides get duplicated at each end to fake an infinite loop. */
const MAX_BUFFER = 5;

@Component({
  imports: [FloralFlourish],
  selector: 'app-portfolio',
  styleUrl: './portfolio.scss',
  templateUrl: './portfolio.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Portfolio implements AfterViewInit {
  readonly tabs: FilterTab[] = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'baby-shower', label: 'Baby Shower' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'corporate', label: 'Corporate' },
  ];

  readonly activeFilter = signal<FilterId>('all');

  readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((item) => item.category === filter);
  });

  /** The real items padded with duplicate slides at each end so navigating
   * past either edge lands on a matching card instead of running out of
   * track — Swiper's own `loop` option turned out to be unreliable with our
   * responsive fractional slidesPerView, so this fakes it by hand instead. */
  readonly slideSet = computed(() => {
    const items = this.filteredItems();
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

  setFilter(id: FilterId): void {
    if (this.activeFilter() === id) return;
    this.activeFilter.set(id);
    requestAnimationFrame(() => {
      const swiper = this.swiperEl().nativeElement.swiper;
      const { bufferSize } = this.slideSet();
      swiper?.update();
      swiper?.slideTo(bufferSize, 0);
    });
  }

  slidePrev(): void {
    this.swiperEl().nativeElement.swiper?.slidePrev();
  }

  slideNext(): void {
    this.swiperEl().nativeElement.swiper?.slideNext();
  }
}
