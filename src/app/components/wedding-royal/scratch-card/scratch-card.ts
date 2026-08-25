import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-scratch-card',
  styleUrl: './scratch-card.scss',
  templateUrl: './scratch-card.html',
})
export class ScratchCard implements AfterViewInit {
  message = input('YOU ARE SPECIAL TO US ❤️');

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
      canvas.width * 0.75,
    );
    gradient.addColorStop(0, '#f2ddc5');
    gradient.addColorStop(0.55, '#deaeb2');
    gradient.addColorStop(1, '#845b2b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // A scattering of light dots to read as glitter on the scratch surface.
    for (let i = 0; i < 140; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.4 + 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.15})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch here', canvas.width / 2, canvas.height / 2);
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
