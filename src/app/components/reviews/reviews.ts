import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { Review } from '../../data/reviews';
import { ReviewCard } from '../review-card/review-card';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [ReviewCard],
  selector: 'app-reviews',
  styleUrl: './reviews.scss',
  templateUrl: './reviews.html',
})
export class Reviews implements AfterViewInit {
  reviews = input.required<Review[]>();

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);
    this.anim.revealGroupOnScroll(this.grid().nativeElement, this.grid().nativeElement.querySelectorAll('app-review-card'));
  }
}
