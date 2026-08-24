import { Component } from '@angular/core';
import { Nav } from './components/nav/nav';
import { Hero } from './components/hero/hero';
import { Categories } from './components/categories/categories';
import { Portfolio } from './components/portfolio/portfolio';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { Pricing } from './components/pricing/pricing';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  imports: [Nav, Hero, Categories, Portfolio, HowItWorks, Pricing, Contact, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
