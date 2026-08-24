import { AfterViewInit, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { PricingTier } from '../../data/pricing';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-pricing-card',
  styleUrl: './pricing-card.scss',
  templateUrl: './pricing-card.html',
})
export class PricingCard implements AfterViewInit {
  tier = input.required<PricingTier>();
  choose = output<string>();

  private readonly cardEl = viewChild.required<ElementRef<HTMLElement>>('card');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.addCardInteraction(this.cardEl().nativeElement);
  }
}
