import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, input, signal, viewChild } from '@angular/core';
import { GsapAnimation } from '../../../services/gsap-animation';

interface Breakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  imports: [],
  selector: 'app-countdown',
  styleUrl: './countdown.scss',
  templateUrl: './countdown.html',
})
export class Countdown implements OnInit, AfterViewInit, OnDestroy {
  weddingDate = input.required<string>();

  readonly breakdown = signal<Breakdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  readonly arrived = signal(false);

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  private timer?: ReturnType<typeof setInterval>;

  constructor(private readonly anim: GsapAnimation) {}

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);
    const gridEl = this.grid()?.nativeElement;
    if (gridEl) {
      this.anim.revealGroupOnScroll(gridEl, gridEl.querySelectorAll('.countdown__unit'), { stagger: 0.12 });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private tick(): void {
    const diff = new Date(this.weddingDate()).getTime() - Date.now();

    if (diff <= 0) {
      this.arrived.set(true);
      this.breakdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const seconds = Math.floor(diff / 1000);
    this.breakdown.set({
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    });
  }
}
