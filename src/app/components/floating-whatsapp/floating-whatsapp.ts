import { Component, HostListener, signal } from '@angular/core';
import { whatsappLink } from '../../data/studio-contact';

const DISMISS_KEY = 'floating-whatsapp-dismissed';
const SCROLL_THRESHOLD = 480;

/**
 * A floating WhatsApp button that stays hidden until the visitor has
 * scrolled past the opening hero. Once visible, a cute couple illustration
 * periodically peeks in above the button (CSS-driven on/off loop) to draw
 * the eye — dismissible, and stays dismissed for the rest of the session.
 */
@Component({
  imports: [],
  selector: 'app-floating-whatsapp',
  styleUrl: './floating-whatsapp.scss',
  templateUrl: './floating-whatsapp.html',
  host: { style: 'display: block' },
})
export class FloatingWhatsapp {
  readonly link = whatsappLink('Hi InviteVibe! I have a question about your invitation designs.');

  readonly visible = signal(false);
  readonly dismissed = signal(window.sessionStorage.getItem(DISMISS_KEY) === 'true');

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.visible() || this.dismissed()) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      this.visible.set(true);
    }
  }

  dismiss(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.dismissed.set(true);
    window.sessionStorage.setItem(DISMISS_KEY, 'true');
  }
}
