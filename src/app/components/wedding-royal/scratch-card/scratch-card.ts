import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

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
    gradient.addColorStop(1, '#3d251e');
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

    ctx.fillStyle = 'rgba(107, 61, 49, 0.9)';
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
    }
  }
}
