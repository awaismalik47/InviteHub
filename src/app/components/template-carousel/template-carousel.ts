import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, viewChild } from '@angular/core';
import { GsapAnimation } from '../../services/gsap-animation';

interface SwiperContainerEl extends HTMLElement {
  initialize: () => void;
}

/**
 * The reusable "browse our templates" carousel shell: an eyebrow + heading
 * above a swiper-container, with the actual slides content-projected in by
 * the caller — so a "Trending Templates" section and a "Reviews" section
 * are just this same component with a different heading and different
 * <swiper-slide> children, matching the existing gallery/portfolio sliders.
 */
@Component({
  imports: [],
  selector: 'app-template-carousel',
  styleUrl: './template-carousel.scss',
  templateUrl: './template-carousel.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplateCarousel implements AfterViewInit {
  eyebrow = input.required<string>();
  heading = input.required<string>();

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly swiperEl = viewChild.required<ElementRef<SwiperContainerEl>>('swiperEl');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const el = this.swiperEl().nativeElement;

    Object.assign(el, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 110,
        modifier: 1,
        slideShadows: false,
      },
      autoplay: {
        delay: 3200,
        disableOnInteraction: false,
      },
      pagination: { clickable: true },
      keyboard: { enabled: true },
      a11y: { enabled: true },
    });
    el.initialize();

    this.anim.revealOnScroll(this.section().nativeElement);
  }
}
