import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { PortfolioItem } from '../../data/portfolio-items';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-portfolio-card',
  styleUrl: './portfolio-card.scss',
  templateUrl: './portfolio-card.html',
})
export class PortfolioCard implements AfterViewInit {
  item = input.required<PortfolioItem>();

  private readonly cardEl = viewChild.required<ElementRef<HTMLElement>>('card');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.addCardInteraction(this.cardEl().nativeElement);
  }
}
