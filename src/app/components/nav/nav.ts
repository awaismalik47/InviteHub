import { Component, signal } from '@angular/core';
import { Logo } from '../logo/logo';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  imports: [Logo],
  selector: 'app-nav',
  styleUrl: './nav.scss',
  templateUrl: './nav.html',
})
export class Nav {
  readonly links: NavLink[] = [
    { id: 'categories', label: 'Categories' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(id: string): void {
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    this.closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
