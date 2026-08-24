export type PortfolioCategory = 'wedding' | 'engagement' | 'birthday' | 'baby-shower' | 'anniversary' | 'corporate';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  categoryLabel: string;
  title: string;
  /** Sample content shown on the mock card face — stands in for finished artwork. */
  heading: string;
  subheading: string;
  detailLines: string[];
  /** Palette variant so the placeholder cards read as a real, varied collection. */
  variant: 1 | 2 | 3 | 4;
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
  },
];
