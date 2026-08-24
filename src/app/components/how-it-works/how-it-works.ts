import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { FloralFlourish } from '../floral-flourish/floral-flourish';
import { GsapAnimation } from '../../services/gsap-animation';

interface Step {
  number: string;
  title: string;
  description: string;
}

@Component({
  imports: [FloralFlourish],
  selector: 'app-how-it-works',
  styleUrl: './how-it-works.scss',
  templateUrl: './how-it-works.html',
})
export class HowItWorks implements AfterViewInit {
  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Pick a category & package',
      description: 'Choose the celebration type and the tier that fits — Basic, Standard or Premium.',
    },
    {
      number: '02',
      title: 'Share your event details',
      description: 'Send us your names, date, venue and the vibe you’re going for.',
    },
    {
      number: '03',
      title: 'We design & send drafts',
      description: 'You’ll receive design drafts to review, with revisions until it feels right.',
    },
    {
      number: '04',
      title: 'Receive your final files',
      description: 'Get high-resolution, ready-to-send files for every card in your suite.',
    },
  ];

  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const steps = this.list().nativeElement.querySelectorAll('.step');
    this.anim.revealGroupOnScroll(this.list().nativeElement, steps, { stagger: 0.12, y: 24 });
  }
}
