import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

interface SwiperContainerEl extends HTMLElement {
  initialize: () => void;
}

@Component({
  imports: [],
  selector: 'app-gallery',
  styleUrl: './gallery.scss',
  templateUrl: './gallery.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Gallery implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly swiperEl = viewChild<ElementRef<SwiperContainerEl>>('swiperEl');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);

    const el = this.swiperEl()?.nativeElement;
    if (!el) return;

    Object.assign(el, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: true,
      },
      autoplay: {
        delay: 2800,
        disableOnInteraction: false,
      },
      pagination: { clickable: true },
      keyboard: { enabled: true },
      a11y: { enabled: true },
    });
    el.initialize();
  }
}
