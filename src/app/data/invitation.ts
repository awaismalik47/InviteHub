export interface InvitationData {
  eyebrow: string;
  title: string;
  subheading: string;
  dateLabel: string;
  venueName: string;
  venueAddress?: string;
  message?: string;
  /** Path to the main cover video under this client's `public/invites/<slug>/` folder. */
  video?: string;
  /** Paths under the same client asset folder; the gallery only renders when this is non-empty. */
  photos?: string[];
  /** Client-side-only light deterrent — absent means the page has no PIN gate. */
  pin?: string;
}
