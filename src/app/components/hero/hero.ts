import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimation } from '../../services/gsap-animation';

interface Petal {
  id: number;
  color: string;
  size: number;
}

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero implements AfterViewInit, OnDestroy {
  private readonly heroSection = viewChild.required<ElementRef<HTMLElement>>('heroSection');
  private readonly cover = viewChild.required<ElementRef<HTMLElement>>('cover');
  private readonly sparkle = viewChild.required<ElementRef<HTMLElement>>('sparkle');
  private readonly burst = viewChild.required<ElementRef<HTMLElement>>('burst');
  private readonly heroContent = viewChild.required<ElementRef<HTMLElement>>('heroContent');
  private readonly floralBl = viewChild.required<ElementRef<HTMLElement>>('floralBl');
  private readonly floralTr = viewChild.required<ElementRef<HTMLElement>>('floralTr');
  private readonly petalsContainer = viewChild.required<ElementRef<HTMLElement>>('petals');

  readonly petalSet: Petal[] = [
    { id: 1, color: '#FFFFFF', size: 16 },
    { id: 2, color: '#D8B4E2', size: 20 },
    { id: 3, color: '#F3E7D3', size: 15 },
    { id: 4, color: '#FFFFFF', size: 18 },
    { id: 5, color: '#D8B4E2', size: 14 },
    { id: 6, color: '#F3E7D3', size: 19 },
  ];

  private timeline?: gsap.core.Timeline;
  private petalCleanup?: () => void;

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    const cover = this.cover().nativeElement;
    const sparkle = this.sparkle().nativeElement;
    const burst = this.burst().nativeElement;
    const content = this.heroContent().nativeElement.children;
    const floralBl = this.floralBl().nativeElement;
    const floralTr = this.floralTr().nativeElement;
    const revealTargets = [...Array.from(content), floralBl, floralTr];

    if (this.anim.prefersReducedMotion) {
      gsap.set(cover, { rotateX: -110, pointerEvents: 'none' });
      gsap.set(revealTargets, { opacity: 1, y: 0 });
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
        revealTargets,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: isMobile ? 0.09 : 0.13, ease: 'power3.out' },
        0.8,
      )
      .set(cover, { pointerEvents: 'none' });

    this.timeline = tl;

    const supportsHover = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    if (supportsHover && !isMobile) {
      this.setupPetalTrail();
    }
  }

  /** A small swarm of flower petals that trails the cursor with per-petal
   * lag and a gentle continuous spin — a desktop-only delight moment. */
  private setupPetalTrail(): void {
    const heroEl = this.heroSection().nativeElement;
    const petalEls = Array.from(this.petalsContainer().nativeElement.querySelectorAll<HTMLElement>('.hero__petal'));
    if (!petalEls.length) return;

    const setters = petalEls.map((el, i) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.35 + i * 0.09, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.35 + i * 0.09, ease: 'power3.out' }),
    }));

    const spins = petalEls.map((el) =>
      gsap.to(el, { rotation: 360, duration: gsap.utils.random(4, 8), repeat: -1, ease: 'none' }),
    );

    let hasPositioned = false;

    const onMove = (event: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (!hasPositioned) {
        gsap.set(petalEls, { x, y });
        gsap.to(petalEls, { opacity: 0.8, duration: 0.4, stagger: 0.04 });
        hasPositioned = true;
      }
      setters.forEach((s) => {
        s.x(x);
        s.y(y);
      });
    };

    const onLeave = () => {
      hasPositioned = false;
      gsap.to(petalEls, { opacity: 0, duration: 0.4 });
    };

    heroEl.addEventListener('mousemove', onMove);
    heroEl.addEventListener('mouseleave', onLeave);

    this.petalCleanup = () => {
      heroEl.removeEventListener('mousemove', onMove);
      heroEl.removeEventListener('mouseleave', onLeave);
      spins.forEach((s) => s.kill());
    };
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.petalCleanup?.();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
