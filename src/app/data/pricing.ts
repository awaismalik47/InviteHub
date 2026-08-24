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
    description: 'A single, beautifully designed static invitation.',
    features: [
      'One static invitation design',
      'One design concept',
      'Two rounds of revisions',
      'High-resolution digital file',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    startingFrom: 'Starting from ___',
    description: 'Your full pre- and post-event card suite.',
    features: [
      'Everything in Basic',
      'Save-the-date design',
      'Thank-you card design',
      'Matching design language across all cards',
    ],
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    startingFrom: 'Starting from ___',
    description: 'The complete suite, brought to life in motion.',
    features: [
      'Everything in Standard',
      'Full card suite for your event',
      'Short animated video invitation',
      'Priority design turnaround',
    ],
  },
];
