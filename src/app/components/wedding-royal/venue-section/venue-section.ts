import { AfterViewInit, Component, ElementRef, computed, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-venue-section',
  styleUrl: './venue-section.scss',
  templateUrl: './venue-section.html',
})
export class VenueSection implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  readonly directionsUrl = computed(() => {
    const { latitude, longitude } = this.config().venue;
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  });

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }
}
