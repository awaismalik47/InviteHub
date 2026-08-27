import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeddingConfig, WeddingEventType } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

/** One small emoji badge per event kind, so a program with many events
 *  (Bridal Shower, Dholki, Mehndi, Baraat, Nikah, Walima…) stays easy to
 *  scan at a glance instead of every entry looking identical. */
const EVENT_ICONS: Record<WeddingEventType, string> = {
  'bridal-shower': '🎀',
  dholki: '🥁',
  mehndi: '🌿',
  baraat: '🚗',
  nikah: '💍',
  walima: '🍽️',
  other: '✨',
};

@Component({
  imports: [DatePipe],
  selector: 'app-event-timeline',
  styleUrl: './event-timeline.scss',
  templateUrl: './event-timeline.html',
})
export class EventTimeline implements AfterViewInit {
  config = input.required<WeddingConfig>();

  eventIcon(type: WeddingEventType | undefined): string {
    return EVENT_ICONS[type ?? 'other'];
  }

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
