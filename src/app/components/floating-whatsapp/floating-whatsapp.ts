import { Component } from '@angular/core';
import { whatsappLink } from '../../data/studio-contact';

/**
 * A floating WhatsApp button, visible on the page at all times. A cute
 * couple illustration periodically peeks in above the button (CSS-driven
 * on/off loop) to draw the eye.
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
}
