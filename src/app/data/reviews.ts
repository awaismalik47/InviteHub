export interface Review {
  id: string;
  name: string;
  eventType: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Once a real client photo is available, set this and it renders instead of an initials avatar. */
  image?: string;
}

/** Placeholder testimonials — swap for real client reviews once available. */
export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    name: 'Amina K.',
    eventType: 'Wedding',
    rating: 5,
    quote: 'Every card felt like it was made just for us — the gold foil detailing was stunning in person.',
  },
  {
    id: 'rev-02',
    name: 'Bilal & Hina',
    eventType: 'Walima',
    rating: 5,
    quote: "Our guests kept asking where we got our invitations designed. Couldn't have asked for better.",
  },
  {
    id: 'rev-03',
    name: 'Sara M.',
    eventType: 'Engagement',
    rating: 4,
    quote: 'Quick turnaround, beautiful design, and they were so easy to work with on last-minute changes.',
  },
  {
    id: 'rev-04',
    name: 'Ayesha R.',
    eventType: 'Birthday',
    rating: 5,
    quote: 'My daughter’s birthday invites were the cutest thing — pastel colors done exactly right.',
  },
  {
    id: 'rev-05',
    name: 'Danish & Fatima',
    eventType: 'Baby Shower',
    rating: 5,
    quote: 'Such a soft, joyful design for our baby shower. Highly recommend InviteVibe to anyone celebrating.',
  },
];
