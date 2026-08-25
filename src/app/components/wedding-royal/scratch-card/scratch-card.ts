import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { gsap } from 'gsap';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

const PETAL_COLORS = ['#deaeb2', '#fff2d6', '#dd7d92', '#f2c9b0'];

const FLOWER_SVG = (color: string) => `
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(12,12)">
      <ellipse cx="0" cy="-6" rx="3.4" ry="5.4" fill="${color}" />
      <ellipse cx="0" cy="-6" rx="3.4" ry="5.4" fill="${color}" transform="rotate(72)" />
      <ellipse cx="0" cy="-6" rx="3.4" ry="5.4" fill="${color}" transform="rotate(144)" />
      <ellipse cx="0" cy="-6" rx="3.4" ry="5.4" fill="${color}" transform="rotate(216)" />
      <ellipse cx="0" cy="-6" rx="3.4" ry="5.4" fill="${color}" transform="rotate(288)" />
      <circle r="2.6" fill="#845b2b" />
    </g>
  </svg>`;

const PETAL_SVG = (color: string) => `
  <svg viewBox="0 0 16 20" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C12 4 16 8 8 20C0 8 4 4 8 0Z" fill="${color}" />
  </svg>`;

@Component({
  imports: [DatePipe],
  selector: 'app-scratch-card',
  styleUrl: './scratch-card.scss',
  templateUrl: './scratch-card.html',
})
export class ScratchCard implements AfterViewInit {
  config = input.required<WeddingConfig>();

  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly wrap = viewChild.required<ElementRef<HTMLElement>>('wrap');
  private readonly burst = viewChild.required<ElementRef<HTMLElement>>('burst');

  readonly revealed = signal(false);

  private ctx?: CanvasRenderingContext2D;
  private scratching = false;
  private readonly sampleStep = 12;

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.heading().nativeElement);
    this.anim.revealOnScroll(this.wrap().nativeElement, { delay: 0.15, y: 24 });

    if (this.anim.prefersReducedMotion) {
      this.revealed.set(true);
      return;
    }
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.canvas().nativeElement;
    const rect = this.wrap().nativeElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    const gradient = ctx.createRadialGradient(
      canvas.width * 0.4,
      canvas.height * 0.35,
      canvas.width * 0.05,
      canvas.width * 0.5,
      canvas.height * 0.5,
      canvas.width * 0.8,
    );
    gradient.addColorStop(0, '#ffe6b8');
    gradient.addColorStop(0.5, '#dd7d92');
    gradient.addColorStop(1, '#5d362f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // A scattering of light dots to read as glitter on the scratch surface.
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.5 + 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.25})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(93, 54, 47, 0.9)';
    ctx.font = '700 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
  }

  onPointerDown(event: PointerEvent): void {
    this.scratching = true;
    this.scratch(event);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.scratching) return;
    this.scratch(event);
  }

  onPointerUp(): void {
    this.scratching = false;
  }

  private scratch(event: PointerEvent): void {
    if (!this.ctx || this.revealed()) return;
    const canvas = this.canvas().nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 22, 0, Math.PI * 2);
    this.ctx.fill();

    this.checkCleared();
  }

  private checkCleared(): void {
    if (!this.ctx) return;
    const canvas = this.canvas().nativeElement;
    const data = this.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    let total = 0;

    for (let i = 3; i < data.length; i += 4 * this.sampleStep) {
      total++;
      if (data[i] === 0) transparent++;
    }

    if (total > 0 && transparent / total > 0.45) {
      this.revealed.set(true);
      this.throwFlowers();
    }
  }

  /** The full "romantic surprise" celebration: a glow + sparkles at the heart, then flowers bursting outward and drifting across the whole screen. */
  private throwFlowers(): void {
    if (this.anim.prefersReducedMotion) return;
    const container = this.burst().nativeElement;
    const heartRect = this.wrap().nativeElement.getBoundingClientRect();
    const cx = heartRect.left + heartRect.width / 2;
    const cy = heartRect.top + heartRect.height / 2;

    this.spawnGlow(container, cx, cy);
    this.spawnSparkles(container, cx, cy);
    this.spawnPetals(container, cx, cy);
  }

  /** A soft warm glow that blooms behind the heart and fades. */
  private spawnGlow(container: HTMLElement, cx: number, cy: number): void {
    const glow = document.createElement('span');
    glow.className = 'scratch-card__glow';
    glow.style.left = `${cx}px`;
    glow.style.top = `${cy}px`;
    container.appendChild(glow);

    gsap.set(glow, { xPercent: -50, yPercent: -50, scale: 0.3, opacity: 0 });
    gsap.to(glow, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' });
    gsap.to(glow, {
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: 'power1.in',
      onComplete: () => glow.remove(),
    });
  }

  /** Small glowing sparkles that pop out around the heart in the first instant. */
  private spawnSparkles(container: HTMLElement, cx: number, cy: number): void {
    const count = 22;
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'scratch-card__sparkle';
      sparkle.style.left = `${cx}px`;
      sparkle.style.top = `${cy}px`;
      container.appendChild(sparkle);

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const distance = 40 + Math.random() * 70;
      const duration = 0.7 + Math.random() * 0.5;

      gsap.set(sparkle, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0, opacity: 1 });
      gsap.to(sparkle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 0,
        duration,
        ease: 'power2.out',
        onComplete: () => sparkle.remove(),
      });
    }
  }

  /** Flowers/petals that burst outward from the heart, then drift and fall naturally across the whole viewport before fading. */
  private spawnPetals(container: HTMLElement, cx: number, cy: number): void {
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const count = Math.min(90, Math.round((viewportW * viewportH) / 9000));

    for (let i = 0; i < count; i++) {
      const color = PETAL_COLORS[i % PETAL_COLORS.length];
      const isFlower = i % 4 === 0;
      const size = isFlower ? 16 + Math.random() * 10 : 12 + Math.random() * 12;

      const petal = document.createElement('span');
      petal.className = 'scratch-card__petal';
      petal.style.left = `${cx}px`;
      petal.style.top = `${cy}px`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.innerHTML = isFlower ? FLOWER_SVG(color) : PETAL_SVG(color);
      container.appendChild(petal);

      // Phase 1: burst outward from the heart in a random direction.
      const angle = Math.random() * Math.PI * 2;
      const burstDist = 70 + Math.random() * 160;
      const burstX = Math.cos(angle) * burstDist;
      const burstY = Math.sin(angle) * burstDist;
      const burstDuration = 0.5 + Math.random() * 0.35;

      // Phase 2: continue drifting/falling naturally across the screen.
      const driftX = burstX + (Math.random() - 0.5) * viewportW * 0.6;
      const fallY = Math.max(burstY + viewportH * (0.5 + Math.random() * 0.6), viewportH - cy + 80);
      const floatDuration = 2.6 + Math.random() * 2.2;
      const totalSpin = (Math.random() < 0.5 ? -1 : 1) * (200 + Math.random() * 400);
      const startDelay = Math.random() * 0.35;

      const tl = gsap.timeline({ delay: startDelay });
      gsap.set(petal, { xPercent: -50, yPercent: -50, x: 0, y: 0, opacity: 0, rotate: Math.random() * 360, scale: 0.4 });
      tl.to(petal, { opacity: 1, scale: 1, duration: 0.25, ease: 'power1.out' }, 0)
        .to(petal, { x: burstX, y: burstY, rotate: `+=${totalSpin * 0.3}`, duration: burstDuration, ease: 'power3.out' }, 0)
        .to(
          petal,
          { x: driftX, y: fallY, rotate: `+=${totalSpin * 0.7}`, duration: floatDuration, ease: 'sine.inOut' },
          burstDuration,
        )
        .to(petal, { opacity: 0, duration: 0.8, ease: 'power1.in', onComplete: () => petal.remove() }, `-=0.8`);
    }
  }
}
