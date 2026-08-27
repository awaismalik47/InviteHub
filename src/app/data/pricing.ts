export interface PricingTier {
  id: string;
  name: string;
  startingFrom: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    startingFrom: 'Starting from Rs. 2,000',
    description: 'One animated invitation video covering all your events — Mehndi, Baraat and Walima together.',
    features: [
      'One combined video for all events (Mehndi, Baraat & Walima)',
      'One design concept',
      'Two rounds of revisions',
      'High-resolution video file (ready for WhatsApp status, social, direct sharing)',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    startingFrom: 'Starting from Rs. 5,000',
    description: 'A separate, dedicated invitation video for each event — Mehndi, Baraat and Walima designed individually.',
    features: [
      'Everything in Basic',
      'Three separate videos — one each for Mehndi, Baraat and Walima',
      'Individually tailored details per event',
      'Matching design language across all three videos',
    ],
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    startingFrom: 'Starting from Rs. 7,000',
    description: 'The complete experience — a full invitation website for your entire event, with a private link only your guests can access.',
    features: [
      'Everything in Standard',
      'Full invitation website for your entire event (event details, gallery, RSVP)',
      'Private, unguessable link — not searchable or discoverable by anyone else',
      'Custom domain available on request — domain registration cost is not included and is quoted separately',
    ],
  },
];
