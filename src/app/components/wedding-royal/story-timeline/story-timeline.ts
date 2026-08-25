import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-story-timeline',
  styleUrl: './story-timeline.scss',
  templateUrl: './story-timeline.html',
})
export class StoryTimeline implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);
    this.anim.revealGroupOnScroll(this.list().nativeElement, this.list().nativeElement.querySelectorAll('.story-timeline__item'), {
      stagger: 0.18,
    });
  }
}
