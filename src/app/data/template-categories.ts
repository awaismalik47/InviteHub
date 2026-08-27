export interface TemplateItem {
  id: string;
  title: string;
  categoryLabel: string;
  /** Palette variant so placeholder cards read as a varied collection, matching the portfolio reel convention. */
  variant: 1 | 2 | 3 | 4;
  /** Once a real preview video is available, set this and it renders instead of the placeholder gradient card. */
  video?: string;
}

export interface TemplateCategoryGroup {
  id: string;
  eyebrow: string;
  heading: string;
  items: TemplateItem[];
}

/**
 * Placeholder catalog for the "browse our templates" showcase — clearly
 * stand-in titles/cards until real template previews exist, same convention
 * as PORTFOLIO_ITEMS. Each group renders through the same TemplateCarousel
 * (swiper-container) shell, just with its own heading and item list.
 */
export const TEMPLATE_CATEGORIES: TemplateCategoryGroup[] = [
  {
    id: 'wedding',
    eyebrow: 'For Your Big Day',
    heading: 'Wedding Invitation Templates',
    items: [
      { id: 'wed-01', title: 'Royal Gold Foil', categoryLabel: 'Baraat', variant: 1 },
      { id: 'wed-02', title: 'Floral Romance', categoryLabel: 'Mehndi', variant: 2 },
      { id: 'wed-03', title: 'Modern Minimal', categoryLabel: 'Nikah', variant: 3 },
      { id: 'wed-04', title: 'Rustic Garden', categoryLabel: 'Dholki', variant: 4 },
      { id: 'wed-05', title: 'Islamic Elegance', categoryLabel: 'Walima', variant: 1 },
      { id: 'wed-06', title: 'Vintage Lace', categoryLabel: 'Bridal Shower', variant: 2 },
    ],
  },
  {
    id: 'website',
    eyebrow: 'Full Invitation Websites',
    heading: 'Website Templates',
    items: [
      { id: 'site-01', title: 'Royal Landing', categoryLabel: 'Website', variant: 1 },
      { id: 'site-02', title: 'Story & Countdown', categoryLabel: 'Website', variant: 2 },
      { id: 'site-03', title: 'Gallery First', categoryLabel: 'Website', variant: 3 },
      { id: 'site-04', title: 'Single Page Elegant', categoryLabel: 'Website', variant: 4 },
      { id: 'site-05', title: 'RSVP & Guestbook', categoryLabel: 'Website', variant: 1 },
      { id: 'site-06', title: 'Multi-Event Suite', categoryLabel: 'Website', variant: 2 },
    ],
  },
  {
    id: 'premium',
    eyebrow: 'The Premium Collection',
    heading: 'Premium Templates',
    items: [
      { id: 'prem-01', title: 'Regal Gold Foil', categoryLabel: 'Wedding', variant: 1 },
      { id: 'prem-02', title: 'Velvet Rose Suite', categoryLabel: 'Engagement', variant: 3 },
      { id: 'prem-03', title: 'Platinum Script', categoryLabel: 'Anniversary', variant: 4 },
      { id: 'prem-04', title: 'Diamond Halo', categoryLabel: 'Wedding', variant: 2 },
      { id: 'prem-05', title: 'Opulent Bloom', categoryLabel: 'Corporate', variant: 1 },
      { id: 'prem-06', title: 'Ivory & Gold Crest', categoryLabel: 'Baby Shower', variant: 3 },
    ],
  },
  {
    id: 'trending',
    eyebrow: 'Trending Now',
    heading: 'Trending Templates',
    items: [
      { id: 'trend-01', title: 'Gilded Rose Suite', categoryLabel: 'Wedding', variant: 1 },
      { id: 'trend-02', title: 'Modern Minimal', categoryLabel: 'Engagement', variant: 2 },
      { id: 'trend-03', title: 'Pastel Bloom', categoryLabel: 'Birthday', variant: 3 },
      { id: 'trend-04', title: 'Ivory Script', categoryLabel: 'Wedding', variant: 4 },
      { id: 'trend-05', title: 'Soft Sage', categoryLabel: 'Baby Shower', variant: 2 },
      { id: 'trend-06', title: 'Royal Foil', categoryLabel: 'Anniversary', variant: 1 },
    ],
  },
  {
    id: 'hot-selling',
    eyebrow: "Client Favorites",
    heading: 'Hot Selling Templates',
    items: [
      { id: 'hot-01', title: 'Classic Gold Foil', categoryLabel: 'Wedding', variant: 3 },
      { id: 'hot-02', title: 'Blush & Ivory', categoryLabel: 'Engagement', variant: 1 },
      { id: 'hot-03', title: 'Confetti Pop', categoryLabel: 'Birthday', variant: 4 },
      { id: 'hot-04', title: 'Botanical Walima', categoryLabel: 'Wedding', variant: 2 },
      { id: 'hot-05', title: 'Little Star', categoryLabel: 'Baby Shower', variant: 3 },
      { id: 'hot-06', title: 'Corporate Launch', categoryLabel: 'Corporate', variant: 1 },
    ],
  },
];
