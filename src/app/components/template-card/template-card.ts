import { Component, input } from '@angular/core';
import { TemplateItem } from '../../data/template-categories';

@Component({
  imports: [],
  selector: 'app-template-card',
  styleUrl: './template-card.scss',
  templateUrl: './template-card.html',
})
export class TemplateCard {
  item = input.required<TemplateItem>();
  /** Only the active (centered) card in its carousel plays with sound — every other card stays muted. */
  active = input(false);
}
