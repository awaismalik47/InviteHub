import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-couple-section',
  styleUrl: './couple-section.scss',
  templateUrl: './couple-section.html',
})
export class CoupleSection implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);
    this.anim.revealGroupOnScroll(this.grid().nativeElement, this.grid().nativeElement.querySelectorAll('.couple-section__profile'), {
      stagger: 0.15,
    });
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }
}
