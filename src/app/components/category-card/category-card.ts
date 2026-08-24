import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { Category } from '../../data/categories';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-category-card',
  styleUrl: './category-card.scss',
  templateUrl: './category-card.html',
})
export class CategoryCard implements AfterViewInit {
  category = input.required<Category>();

  private readonly cardEl = viewChild.required<ElementRef<HTMLElement>>('card');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.addCardInteraction(this.cardEl().nativeElement);
  }
}
