import { AfterViewInit, Component, ElementRef, computed, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

@Component({
  imports: [],
  selector: 'app-calendar-buttons',
  styleUrl: './calendar-buttons.scss',
  templateUrl: './calendar-buttons.html',
})
export class CalendarButtons implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  private readonly summary = computed(() => `${this.config().groom.name} & ${this.config().bride.name} Wedding`);

  readonly googleCalendarUrl = computed(() => {
    const start = new Date(this.config().weddingDate);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: this.summary(),
      dates: `${toIcsDate(start)}/${toIcsDate(end)}`,
      details: this.config().invitationMessage,
      location: this.config().venue.address,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  });

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }

  downloadIcs(): void {
    const start = new Date(this.config().weddingDate);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${this.summary()}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `LOCATION:${this.config().venue.address}`,
      `DESCRIPTION:${this.config().invitationMessage}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding.ics';
    link.click();
    URL.revokeObjectURL(url);
  }
}
