import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Hero } from '../../components/hero/hero';
import { TemplateCarousel } from '../../components/template-carousel/template-carousel';
import { SectionConnector } from '../../components/section-connector/section-connector';
import { Reviews } from '../../components/reviews/reviews';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { Pricing } from '../../components/pricing/pricing';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { FloatingWhatsapp } from '../../components/floating-whatsapp/floating-whatsapp';
import { TEMPLATE_CATEGORIES } from '../../data/template-categories';
import { REVIEWS } from '../../data/reviews';

@Component({
  imports: [Nav, Hero, TemplateCarousel, SectionConnector, Reviews, HowItWorks, Pricing, Contact, Footer, FloatingWhatsapp],
  selector: 'app-home',
  templateUrl: './home.html',
  styles: [':host { display: block; }'],
})
export class Home {
  readonly templateCategories = TEMPLATE_CATEGORIES;
  readonly reviews = REVIEWS;
}
