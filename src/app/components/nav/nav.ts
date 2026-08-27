import { Component, signal } from '@angular/core';
import { Logo } from '../logo/logo';
import { whatsappLink } from '../../data/studio-contact';

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
    { id: 'premium', label: 'Templates' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly bookNowLink = whatsappLink('Hi InviteVibe! I’d like to book a custom invitation design.');

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
