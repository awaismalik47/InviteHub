import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [DatePipe],
  selector: 'app-hero-section',
  styleUrl: './hero-section.scss',
  templateUrl: './hero-section.html',
})
export class HeroSection implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly bg = viewChild.required<ElementRef<HTMLElement>>('bg');
  private readonly content = viewChild.required<ElementRef<HTMLElement>>('content');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.parallaxOnScroll(this.section().nativeElement, this.bg().nativeElement, { yPercent: 14 });
    this.anim.revealGroupOnScroll(this.content().nativeElement, Array.from(this.content().nativeElement.children), { start: 'top 90%' });
  }
}
