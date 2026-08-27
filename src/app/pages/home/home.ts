import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Hero } from '../../components/hero/hero';
import { Categories } from '../../components/categories/categories';
import { Portfolio } from '../../components/portfolio/portfolio';
import { TemplateCarousel } from '../../components/template-carousel/template-carousel';
import { TemplateCard } from '../../components/template-card/template-card';
import { ReviewCard } from '../../components/review-card/review-card';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { Pricing } from '../../components/pricing/pricing';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { TEMPLATE_CATEGORIES } from '../../data/template-categories';
import { REVIEWS } from '../../data/reviews';

@Component({
  imports: [
    Nav,
    Hero,
    Categories,
    Portfolio,
    TemplateCarousel,
    TemplateCard,
    ReviewCard,
    HowItWorks,
    Pricing,
    Contact,
    Footer,
  ],
  selector: 'app-home',
  templateUrl: './home.html',
  styles: [':host { display: block; }'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home {
  readonly templateCategories = TEMPLATE_CATEGORIES;
  readonly reviews = REVIEWS;
}
