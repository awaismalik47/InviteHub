import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FloralFlourish } from '../floral-flourish/floral-flourish';
import { PORTFOLIO_ITEMS, PortfolioCategory } from '../../data/portfolio-items';
import { GsapAnimation } from '../../services/gsap-animation';

type FilterId = 'all' | PortfolioCategory;

interface FilterTab {
  id: FilterId;
  label: string;
}

interface SwiperContainerEl extends HTMLElement {
  initialize: () => void;
  swiper?: {
    update: () => void;
    slideToLoop: (index: number) => void;
    slidePrev: () => void;
    slideNext: () => void;
  };
}

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

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainerEl>>('swiperEl');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const el = this.swiperEl().nativeElement;

    Object.assign(el, {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      spaceBetween: 20,
      grabCursor: true,
      speed: 500,
      pagination: { clickable: true },
      keyboard: { enabled: true },
      a11y: { enabled: true },
      breakpoints: {
        900: { spaceBetween: 32 },
        1400: { spaceBetween: 44 },
      },
    });
    el.initialize();

    this.anim.revealOnScroll(this.section().nativeElement);
  }

  setFilter(id: FilterId): void {
    if (this.activeFilter() === id) return;
    this.activeFilter.set(id);
    requestAnimationFrame(() => {
      this.swiperEl().nativeElement.swiper?.slideToLoop(0);
      this.swiperEl().nativeElement.swiper?.update();
    });
  }

  slidePrev(): void {
    this.swiperEl().nativeElement.swiper?.slidePrev();
  }

  slideNext(): void {
    this.swiperEl().nativeElement.swiper?.slideNext();
  }
}
