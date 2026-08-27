import { Component, signal } from '@angular/core';
import { whatsappLink } from '../../data/studio-contact';

const DISMISS_KEY = 'floating-whatsapp-dismissed';

/**
 * A floating WhatsApp button, visible on the page at all times. A cute
 * couple illustration periodically peeks in above the button (CSS-driven
 * on/off loop) to draw the eye — dismissible, and stays dismissed for the
 * rest of the session.
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

  readonly visible = signal(true);
  readonly dismissed = signal(window.sessionStorage.getItem(DISMISS_KEY) === 'true');

  dismiss(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.dismissed.set(true);
    window.sessionStorage.setItem(DISMISS_KEY, 'true');
  }
}
