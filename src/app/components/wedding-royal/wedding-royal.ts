import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../data/wedding-config';
import { GsapAnimation } from '../../services/gsap-animation';
import { InvitationCover } from './invitation-cover/invitation-cover';
import { MusicPlayer } from './music-player/music-player';
import { Countdown } from './countdown/countdown';
import { Gallery } from './gallery/gallery';
import { EventTimeline } from './event-timeline/event-timeline';
import { VenueSection } from './venue-section/venue-section';
import { DressCode } from './dress-code/dress-code';
import { ScratchCard } from './scratch-card/scratch-card';
import { RsvpForm } from './rsvp-form/rsvp-form';
import { CalendarButtons } from './calendar-buttons/calendar-buttons';
import { FinalSection } from './final-section/final-section';

@Component({
  imports: [
    InvitationCover,
    MusicPlayer,
    Gallery,
    Countdown,
    EventTimeline,
    VenueSection,
    DressCode,
    ScratchCard,
    RsvpForm,
    CalendarButtons,
    FinalSection,
  ],
  selector: 'app-wedding-royal',
  styleUrl: './wedding-royal.scss',
  templateUrl: './wedding-royal.html',
  host: { class: 'wedding-royal' },
})
export class WeddingRoyal implements AfterViewInit {
  config = input.required<WeddingConfig>();
  slug = input.required<string>();

  private readonly message = viewChild.required<ElementRef<HTMLElement>>('message');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.message().nativeElement);
  }
}
