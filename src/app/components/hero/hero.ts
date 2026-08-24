import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { gsap } from 'gsap';
import { GsapAnimation } from '../../services/gsap-animation';

interface Petal {
  id: number;
  color: string;
  size: number;
  /** Once a real flower photo is available, set this and it renders instead of the line-art fallback. */
  image?: string;
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
  private readonly orbitContainer = viewChild.required<ElementRef<HTMLElement>>('orbit');

  readonly petalSet: Petal[] = [
    { id: 1, color: '#FFFFFF', size: 16 },
    { id: 2, color: '#D8B4E2', size: 20 },
    { id: 3, color: '#F3E7D3', size: 15 },
    { id: 4, color: '#FFFFFF', size: 18 },
    { id: 5, color: '#D8B4E2', size: 14 },
    { id: 6, color: '#F3E7D3', size: 19 },
  ];

  private timeline?: gsap.core.Timeline;
  private orbitCleanup?: () => void;

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
      this.setupFlowerOrbit();
    }
  }

  /** A ring of flowers that follows the cursor and slowly revolves around it —
   * hovering any single flower freezes the whole ring in place. Desktop only. */
  private setupFlowerOrbit(): void {
    const heroEl = this.heroSection().nativeElement;
    const orbitEl = this.orbitContainer().nativeElement;
    const flowerEls = Array.from(orbitEl.querySelectorAll<HTMLElement>('.hero__orbit-flower'));
    if (!flowerEls.length) return;

    const radius = 52;
    const orbitDuration = 22;

    // Each flower gets a fixed local offset around the ring's centre; the ring
    // itself spins continuously while each flower counter-spins by the same
    // amount, so the flowers travel in a circle without themselves rotating.
    const spins = flowerEls.map((el, i) => {
      const angle = (360 / flowerEls.length) * i;
      const rad = (angle * Math.PI) / 180;
      const size = el.offsetWidth || 18;
      gsap.set(el, {
        x: Math.cos(rad) * radius - size / 2,
        y: Math.sin(rad) * radius - size / 2,
      });
      return gsap.to(el, { rotation: -360, duration: orbitDuration, repeat: -1, ease: 'none' });
    });

    const ringSpin = gsap.to(orbitEl, { rotation: 360, duration: orbitDuration, repeat: -1, ease: 'none' });

    const follow = {
      x: gsap.quickTo(orbitEl, 'x', { duration: 0.45, ease: 'power3.out' }),
      y: gsap.quickTo(orbitEl, 'y', { duration: 0.45, ease: 'power3.out' }),
    };

    let hasPositioned = false;

    const onMove = (event: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (!hasPositioned) {
        gsap.set(orbitEl, { x, y });
        gsap.to(flowerEls, { opacity: 0.9, duration: 0.4, stagger: 0.04 });
        hasPositioned = true;
      }
      follow.x(x);
      follow.y(y);
    };

    const onLeave = () => {
      hasPositioned = false;
      gsap.to(flowerEls, { opacity: 0, duration: 0.4 });
    };

    const pauseOrbit = () => {
      ringSpin.pause();
      spins.forEach((s) => s.pause());
    };

    const resumeOrbit = () => {
      ringSpin.play();
      spins.forEach((s) => s.play());
    };

    heroEl.addEventListener('mousemove', onMove);
    heroEl.addEventListener('mouseleave', onLeave);
    flowerEls.forEach((el) => {
      el.addEventListener('mouseenter', pauseOrbit);
      el.addEventListener('mouseleave', resumeOrbit);
    });

    this.orbitCleanup = () => {
      heroEl.removeEventListener('mousemove', onMove);
      heroEl.removeEventListener('mouseleave', onLeave);
      flowerEls.forEach((el) => {
        el.removeEventListener('mouseenter', pauseOrbit);
        el.removeEventListener('mouseleave', resumeOrbit);
      });
      ringSpin.kill();
      spins.forEach((s) => s.kill());
    };
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.orbitCleanup?.();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
