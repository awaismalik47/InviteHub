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
    startingFrom: 'Starting from ___',
    description: 'A beautifully designed invitation video, ready to share.',
    features: [
      'One animated invitation video',
      'One design concept',
      'Two rounds of revisions',
      'High-resolution video file (ready for WhatsApp status, social, direct sharing)',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    startingFrom: 'Starting from ___',
    description: 'Your own invitation website, with a private link only your guests can access.',
    features: [
      'Everything in Basic',
      'Full invitation website (event details, gallery, RSVP)',
      'Private, unguessable link — not searchable or discoverable by anyone else',
      'Matching design language across video and website',
    ],
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    startingFrom: 'Starting from ___',
    description: 'The complete experience — your invitation website on your own domain.',
    features: [
      'Everything in Standard',
      'Custom domain of your names (e.g. ahmedandsara.com) instead of our subdomain',
      'Priority design turnaround',
    ],
  },
];
