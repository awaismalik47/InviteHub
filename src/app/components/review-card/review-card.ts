import { Component, input } from '@angular/core';
import { Review } from '../../data/reviews';

@Component({
  imports: [],
  selector: 'app-review-card',
  styleUrl: './review-card.scss',
  templateUrl: './review-card.html',
})
export class ReviewCard {
  review = input.required<Review>();

  readonly stars = [1, 2, 3, 4, 5];

  get initials(): string {
    return this.review()
      .name.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
