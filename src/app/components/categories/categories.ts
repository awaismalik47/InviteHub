import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { CategoryCard } from '../category-card/category-card';
import { FloralFlourish } from '../floral-flourish/floral-flourish';
import { CATEGORIES } from '../../data/categories';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [CategoryCard, FloralFlourish],
  selector: 'app-categories',
  styleUrl: './categories.scss',
  templateUrl: './categories.html',
})
export class Categories implements AfterViewInit {
  readonly categories = CATEGORIES;

  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const cards = this.grid().nativeElement.querySelectorAll('.category-card');
    this.anim.revealGroupOnScroll(this.grid().nativeElement, cards, { stagger: 0.08 });
  }
}
