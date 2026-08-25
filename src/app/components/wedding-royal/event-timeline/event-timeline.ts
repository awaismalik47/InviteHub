import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [DatePipe],
  selector: 'app-event-timeline',
  styleUrl: './event-timeline.scss',
  templateUrl: './event-timeline.html',
})
export class EventTimeline implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);
    this.anim.revealGroupOnScroll(this.list().nativeElement, this.list().nativeElement.querySelectorAll('.event-timeline__item'));
  }

  viewLocation(): void {
    document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
