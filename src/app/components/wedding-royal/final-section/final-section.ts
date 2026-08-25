import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-final-section',
  styleUrl: './final-section.scss',
  templateUrl: './final-section.html',
})
export class FinalSection implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }
}
