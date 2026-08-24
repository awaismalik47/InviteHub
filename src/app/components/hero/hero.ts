import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero implements AfterViewInit, OnDestroy {
  private readonly cover = viewChild.required<ElementRef<HTMLElement>>('cover');
  private readonly sparkle = viewChild.required<ElementRef<HTMLElement>>('sparkle');
  private readonly burst = viewChild.required<ElementRef<HTMLElement>>('burst');
  private readonly heroContent = viewChild.required<ElementRef<HTMLElement>>('heroContent');

  private timeline?: gsap.core.Timeline;

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const cover = this.cover().nativeElement;
    const sparkle = this.sparkle().nativeElement;
    const burst = this.burst().nativeElement;
    const content = this.heroContent().nativeElement.children;

    if (this.anim.prefersReducedMotion) {
      gsap.set(cover, { rotateX: -110, pointerEvents: 'none' });
      gsap.set(content, { opacity: 1, y: 0 });
      return;
    }

    const isMobile = this.anim.isMobileViewport;
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power2.out' } });

    // The entire hero starts dressed as a closed envelope; it then swings
    // open like a lid to reveal the real headline sitting behind it.
    tl.fromTo(sparkle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, 0)
      .to(cover, { rotateX: -110, duration: isMobile ? 0.9 : 1.1, ease: 'power2.inOut' }, 0.25)
      .fromTo(burst, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.9, duration: 0.5, ease: 'power2.out' }, 0.55)
      .to(burst, { opacity: 0, duration: 0.6, ease: 'power1.in' }, 0.95)
      .fromTo(
        content,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: isMobile ? 0.09 : 0.13, ease: 'power3.out' },
        0.8,
      )
      .set(cover, { pointerEvents: 'none' });

    this.timeline = tl;
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
