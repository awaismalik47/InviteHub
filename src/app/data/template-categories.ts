export interface TemplateItem {
  id: string;
  title: string;
  categoryLabel: string;
  /** Palette variant so placeholder cards read as a varied collection, matching the portfolio reel convention. */
  variant: 1 | 2 | 3 | 4;
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
