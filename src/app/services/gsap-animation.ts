import { Service } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Central place for GSAP setup shared across the site: plugin registration,
 * reduced-motion detection, and small reusable animation helpers so every
 * component drives its animations through the same conventions.
 */
@Service()
export class GsapAnimation {
  readonly gsap = gsap;

  constructor() {
    if (!registered && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
  }

  get prefersReducedMotion(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** True on small viewports, used to trim animation complexity for mobile. */
  get isMobileViewport(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }

  /** Fade + rise reveal for one element as it enters the viewport. */
  revealOnScroll(
    el: Element,
    opts: { delay?: number; y?: number; start?: string } = {},
  ): void {
    if (this.prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: opts.y ?? 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: opts.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    );
  }

  /** Staggered reveal for a group of sibling elements (cards, grid items). */
  revealGroupOnScroll(
    container: Element,
    items: Element[] | NodeListOf<Element>,
    opts: { stagger?: number; y?: number; start?: string } = {},
  ): void {
    if (!items.length) return;
    if (this.prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      items,
      { opacity: 0, y: opts.y ?? 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: opts.stagger ?? 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: opts.start ?? 'top 82%',
          toggleActions: 'play none none none',
        },
      },
    );
  }

  /** Scrub-linked vertical drift for a background element as the page scrolls past its container. */
  parallaxOnScroll(
    container: Element,
    el: Element,
    opts: { yPercent?: number; start?: string; end?: string } = {},
  ): void {
    if (this.prefersReducedMotion) return;
    gsap.to(el, {
      yPercent: opts.yPercent ?? 18,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: opts.start ?? 'top bottom',
        end: opts.end ?? 'bottom top',
        scrub: true,
      },
    });
  }

  /** Gentle lift/scale on hover for pointer devices, and a press state on tap. */
  addCardInteraction(el: HTMLElement): void {
    if (this.prefersReducedMotion) return;
    const enter = () =>
      gsap.to(el, { y: -6, scale: 1.015, boxShadow: '0 20px 40px rgba(61,49,99,0.20)', duration: 0.3, ease: 'power2.out' });
    const leave = () =>
      gsap.to(el, { y: 0, scale: 1, boxShadow: '0 4px 14px rgba(61,49,99,0.08)', duration: 0.35, ease: 'power2.out' });
    const press = () => gsap.to(el, { scale: 0.975, duration: 0.15, ease: 'power2.out' });
    const release = () => gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('touchstart', press, { passive: true });
    el.addEventListener('touchend', release, { passive: true });
    el.addEventListener('touchcancel', release, { passive: true });
  }
}
