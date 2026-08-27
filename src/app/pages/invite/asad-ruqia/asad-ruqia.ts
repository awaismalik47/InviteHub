import { Component } from '@angular/core';
import { InvitePinGate } from '../../../components/invite-pin-gate/invite-pin-gate';
import { WeddingRoyal } from '../../../components/wedding-royal/wedding-royal';
import { WeddingConfig } from '../../../data/wedding-config';

const SLUG = 'asad-ruqia-r4n8w2sq';

/**
 * Groom/bride names are the real client's. Everything else below (date,
 * venue, events, story, gallery) is placeholder content, clearly marked,
 * until the real details are provided — swap it in place, no other files
 * need to change. Real media goes in public/invites/asad-ruqia-r4n8w2sq/.
 */
const CONFIG: WeddingConfig = {
  groom: { name: 'Asad' },
  bride: { name: 'Ruqia' },
  weddingDate: '2026-12-20', // placeholder — update once the real date is confirmed
  quote: 'Two hearts, one beautiful journey.',
  coverVideo: 'invites/asad-ruqia-r4n8w2sq/intro.mp4',
  coverPoster: 'invites/asad-ruqia-r4n8w2sq/gallery/cover_image.png',
  invitationMessage:
    'With joyful hearts and the blessings of our families, we invite you to celebrate the beginning of our forever.',
  events: [
    { name: 'Bridal Shower', type: 'bridal-shower', date: '2026-12-16', time: '6:00 PM', venue: 'Venue name — to be confirmed' },
    { name: 'Dholki', type: 'dholki', date: '2026-12-17', time: '7:00 PM', venue: 'Venue name — to be confirmed' },
    { name: 'Mehndi', type: 'mehndi', date: '2026-12-18', time: '7:00 PM', venue: 'Venue name — to be confirmed' },
    { name: 'Baraat', type: 'baraat', date: '2026-12-19', time: '7:00 PM', venue: 'Venue name — to be confirmed' },
    { name: 'Walima', type: 'walima', date: '2026-12-20', time: '8:00 PM', venue: 'Venue name — to be confirmed' },
  ],
  story: [
    { year: '2019', title: 'The Beginning', text: 'Two strangers met…' },
    { year: '2022', title: 'The Journey', text: 'Our story grew…' },
    { year: '2026', title: 'Forever', text: 'And now, we’re beginning forever.' },
  ],
  venue: {
    name: 'Venue name — to be confirmed',
    address: 'Address to be confirmed',
    latitude: 31.5204,
    longitude: 74.3587,
  },
  gallery: [
    'invites/asad-ruqia-r4n8w2sq/gallery/wedding_inv_couple.png',
    'invites/asad-ruqia-r4n8w2sq/gallery/wedding_inv_couple_1.png',
    'invites/asad-ruqia-r4n8w2sq/gallery/wedding_inv_couple_2.png',
    'invites/asad-ruqia-r4n8w2sq/gallery/wedding-inv-couple-4.png',
    'invites/asad-ruqia-r4n8w2sq/gallery/wedding-inv-couple-5.png',
  ],
  dressCode: {
    women: 'Elegant formal attire in pastel or jewel tones',
    men: 'Suit or traditional formal wear',
  },
  hashtag: '#AsadWedsRuqia',
  whatsappNumber: '10000000000', // placeholder — replace with the couple's real WhatsApp number, digits only, country code first
  seedWishes: [
    { name: 'Ahmed', message: 'Congratulations to the beautiful couple! Wishing you a lifetime of happiness.', date: new Date().toISOString() },
  ],
};

@Component({
  imports: [InvitePinGate, WeddingRoyal],
  selector: 'app-asad-ruqia',
  template: `
    <app-invite-pin-gate>
      <app-wedding-royal [config]="CONFIG" [slug]="SLUG" />
    </app-invite-pin-gate>
  `,
  styles: [':host { display: block; }'],
})
export class AsadRuqia {
  protected readonly CONFIG = CONFIG;
  protected readonly SLUG = SLUG;
}
