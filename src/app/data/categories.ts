export interface Category {
  id: string;
  label: string;
  description: string;
  icon: 'rings' | 'heart' | 'balloon' | 'stork' | 'anniversary' | 'briefcase';
}

export const CATEGORIES: Category[] = [
  {
    id: 'wedding',
    label: 'Wedding Suite',
    description: 'Save-the-date, main invitation, mehndi, baraat and walima cards, plus a thank-you card.',
    icon: 'rings',
  },
  {
    id: 'engagement',
    label: 'Engagement Invitations',
    description: 'A beautiful first announcement, designed to match your wedding story from day one.',
    icon: 'heart',
  },
  {
    id: 'birthday',
    label: 'Birthday Invitations',
    description: 'Playful kids’ themes and elegant adult designs for every milestone birthday.',
    icon: 'balloon',
  },
  {
    id: 'baby-shower',
    label: 'Baby Shower / Aqeeqah',
    description: 'Soft, joyful designs to welcome your little one and share the celebration.',
    icon: 'stork',
  },
  {
    id: 'anniversary',
    label: 'Anniversary Invitations',
    description: 'Timeless designs that celebrate every year of your story, big milestones included.',
    icon: 'anniversary',
  },
  {
    id: 'corporate',
    label: 'Corporate / Event Invitations',
    description: 'Polished, on-brand invitations for launches, galas and company celebrations.',
    icon: 'briefcase',
  },
];
