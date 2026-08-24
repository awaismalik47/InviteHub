export type PortfolioCategory = 'wedding' | 'engagement' | 'birthday' | 'baby-shower' | 'anniversary' | 'corporate';
export type ReelPlatform = 'instagram' | 'tiktok' | 'facebook';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  categoryLabel: string;
  title: string;
  /** Sample content shown on the mock reel face — stands in for the finished video. */
  heading: string;
  subheading: string;
  detailLines: string[];
  /** Palette variant so the placeholder reels read as a real, varied collection. */
  variant: 1 | 2 | 3 | 4;
  /** Where this reel is intended to be published once the real video is ready. */
  platform: ReelPlatform;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'wed-01',
    category: 'wedding',
    categoryLabel: 'Wedding',
    title: 'Classic Gold Foil Suite',
    heading: 'Amina & Zain',
    subheading: 'Request the pleasure of your company',
    detailLines: ['Saturday, 14th February 2026', 'The Grand Willow Estate, Lahore'],
    variant: 1,
    platform: 'instagram',
  },
  {
    id: 'wed-02',
    category: 'wedding',
    categoryLabel: 'Wedding',
    title: 'Botanical Walima Card',
    heading: 'Hina & Bilal',
    subheading: 'Walima Reception',
    detailLines: ['Sunday, 22nd March 2026', 'Rosewood Banquet Hall'],
    variant: 2,
    platform: 'tiktok',
  },
  {
    id: 'wed-03',
    category: 'wedding',
    categoryLabel: 'Wedding',
    title: 'Minimal Save-the-Date',
    heading: 'Sara + Omar',
    subheading: 'Save the Date',
    detailLines: ['We’re getting married', '18.10.2026'],
    variant: 3,
    platform: 'facebook',
  },
  {
    id: 'eng-01',
    category: 'engagement',
    categoryLabel: 'Engagement',
    title: 'Blush Ring Announcement',
    heading: 'Mahnoor & Ahad',
    subheading: 'Engagement Ceremony',
    detailLines: ['Friday, 5th December 2026', 'The Orchid Room, Karachi'],
    variant: 2,
    platform: 'instagram',
  },
  {
    id: 'eng-02',
    category: 'engagement',
    categoryLabel: 'Engagement',
    title: 'Gold Monogram Invite',
    heading: 'Fatima & Danish',
    subheading: 'Together with their families',
    detailLines: ['Thursday, 9th April 2026', 'Lakeview Terrace'],
    variant: 1,
    platform: 'tiktok',
  },
  {
    id: 'bday-01',
    category: 'birthday',
    categoryLabel: 'Birthday',
    title: 'Pastel Balloon Pop — Kids',
    heading: 'It’s Zoya’s 5th Birthday!',
    subheading: 'Come celebrate with us',
    detailLines: ['Saturday, 7th June 2026, 4 PM', 'Sunshine Party Hall'],
    variant: 3,
    platform: 'instagram',
  },
  {
    id: 'bday-02',
    category: 'birthday',
    categoryLabel: 'Birthday',
    title: 'Modern Gold 30th',
    heading: 'Dirty Thirty — Ayesha',
    subheading: 'Join the celebration',
    detailLines: ['Saturday, 11th July 2026, 8 PM', 'The Rooftop, Islamabad'],
    variant: 4,
    platform: 'facebook',
  },
  {
    id: 'baby-01',
    category: 'baby-shower',
    categoryLabel: 'Baby Shower',
    title: 'Soft Cloud Baby Shower',
    heading: 'A Little Star is Coming',
    subheading: 'Baby Shower for Mariam',
    detailLines: ['Sunday, 16th August 2026, 3 PM', 'The Garden Pavilion'],
    variant: 2,
    platform: 'tiktok',
  },
  {
    id: 'baby-02',
    category: 'baby-shower',
    categoryLabel: 'Aqeeqah',
    title: 'Gentle Sage Aqeeqah Card',
    heading: 'Aqeeqah of Baby Ibrahim',
    subheading: 'You’re invited to celebrate',
    detailLines: ['Friday, 2nd October 2026', 'Family Residence, Lahore'],
    variant: 3,
    platform: 'instagram',
  },
  {
    id: 'ann-01',
    category: 'anniversary',
    categoryLabel: 'Anniversary',
    title: 'Silver Jubilee Elegance',
    heading: '25 Years Together',
    subheading: 'Nasreen & Tariq',
    detailLines: ['Saturday, 23rd May 2026', 'The Palm Court'],
    variant: 1,
    platform: 'facebook',
  },
  {
    id: 'ann-02',
    category: 'anniversary',
    categoryLabel: 'Anniversary',
    title: 'Modern Floral 1st',
    heading: 'One Year of Us',
    subheading: 'Anum & Kashif',
    detailLines: ['Wednesday, 3rd September 2026', 'Home Celebration'],
    variant: 4,
    platform: 'instagram',
  },
  {
    id: 'corp-01',
    category: 'corporate',
    categoryLabel: 'Corporate',
    title: 'Brand Launch Invite',
    heading: 'You’re Invited: The Launch',
    subheading: 'Lumen Studio presents',
    detailLines: ['Tuesday, 17th November 2026, 6 PM', 'Skyline Conference Centre'],
    variant: 4,
    platform: 'tiktok',
  },
];
