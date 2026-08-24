import { AfterViewInit, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { PortfolioCard } from '../portfolio-card/portfolio-card';
import { PORTFOLIO_ITEMS, PortfolioCategory } from '../../data/portfolio-items';
import { GsapAnimation } from '../../services/gsap-animation';

type FilterId = 'all' | PortfolioCategory;

interface FilterTab {
  id: FilterId;
  label: string;
}

@Component({
  imports: [PortfolioCard],
  selector: 'app-portfolio',
  styleUrl: './portfolio.scss',
  templateUrl: './portfolio.html',
})
export class Portfolio implements AfterViewInit {
  readonly tabs: FilterTab[] = [
    { id: 'all', label: 'All' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'baby-shower', label: 'Baby Shower' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'corporate', label: 'Corporate' },
  ];

  readonly activeFilter = signal<FilterId>('all');

  readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((item) => item.category === filter);
  });

  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const cards = this.grid().nativeElement.querySelectorAll('.portfolio-card');
    this.anim.revealGroupOnScroll(this.grid().nativeElement, cards, { stagger: 0.06 });
  }

  setFilter(id: FilterId): void {
    if (this.activeFilter() === id) return;
    this.activeFilter.set(id);
    requestAnimationFrame(() => {
      const cards = this.grid().nativeElement.querySelectorAll('.portfolio-card');
      if (this.anim.prefersReducedMotion) {
        this.anim.gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      this.anim.gsap.fromTo(
        cards,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
      );
    });
  }
}
