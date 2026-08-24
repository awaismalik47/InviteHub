import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { PricingCard } from '../pricing-card/pricing-card';
import { PRICING_TIERS } from '../../data/pricing';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [PricingCard],
  selector: 'app-pricing',
  styleUrl: './pricing.scss',
  templateUrl: './pricing.html',
})
export class Pricing implements AfterViewInit {
  readonly tiers = PRICING_TIERS;

  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const cards = this.grid().nativeElement.querySelectorAll('.pricing-card');
    this.anim.revealGroupOnScroll(this.grid().nativeElement, cards, { stagger: 0.1 });
  }

  onChoose(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
