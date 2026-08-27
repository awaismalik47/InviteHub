export interface WeddingPerson {
  name: string;
  image?: string;
  description?: string;
  parents?: string;
}

/**
 * Known event kinds get a themed icon in the program timeline (see
 * EVENT_ICONS in event-timeline.ts). Omit or use 'other' for anything
 * that doesn't fit — it still renders fine, just with a neutral icon.
 */
export type WeddingEventType =
  | 'bridal-shower'
  | 'dholki'
  | 'mehndi'
  | 'baraat'
  | 'nikah'
  | 'walima'
  | 'other';

export interface WeddingEvent {
  name: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
  /** Drives which icon shows next to this event in the timeline. */
  type?: WeddingEventType;
}

export interface StoryMilestone {
  year: string;
  title: string;
  text: string;
}

export interface GuestWish {
  name: string;
  message: string;
  date: string;
}

export interface WeddingVenue {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface DressCode {
  women: string;
  men: string;
}

export interface WeddingConfig {
  groom: WeddingPerson;
  bride: WeddingPerson;
  /** ISO date (YYYY-MM-DD) the countdown counts down to. */
  weddingDate: string;
  quote: string;
  invitationMessage: string;
  /** Paths under this client's public/invites/<slug>/ folder. */
  coverVideo?: string;
  coverPoster?: string;
  musicSrc?: string;
  events: WeddingEvent[];
  story: StoryMilestone[];
  venue: WeddingVenue;
  dressCode?: DressCode;
  /** Paths under public/invites/<slug>/gallery/. */
  gallery: string[];
  hashtag: string;
  /** Shown in the guestbook before any real guest has left a wish. */
  seedWishes?: GuestWish[];
  /** Digits only, country code first. When set, the RSVP form also opens WhatsApp with the guest's response pre-filled. */
  whatsappNumber?: string;
}
