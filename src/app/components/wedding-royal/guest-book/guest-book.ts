import { AfterViewInit, Component, ElementRef, OnInit, inject, input, signal, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { GuestbookStore } from '../../../services/guestbook-store';
import { WeddingConfig } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [ReactiveFormsModule, DatePipe],
  selector: 'app-guest-book',
  styleUrl: './guest-book.scss',
  templateUrl: './guest-book.html',
})
export class GuestBook implements OnInit, AfterViewInit {
  config = input.required<WeddingConfig>();
  slug = input.required<string>();

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(GuestbookStore);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(3)]],
  });

  readonly wishes = signal<{ name: string; message: string; date: string }[]>([]);

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  constructor(private readonly anim: GsapAnimation) {}

  ngOnInit(): void {
    this.wishes.set(this.store.list(this.slug(), this.config().seedWishes ?? []));
  }

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, message } = this.form.getRawValue();
    const updated = this.store.add(this.slug(), {
      name: name!,
      message: message!,
      date: new Date().toISOString(),
    });
    this.wishes.set(updated);
    this.form.reset();

    queueMicrotask(() => {
      const first = this.list().nativeElement.querySelector('.guest-book__card');
      if (first && !this.anim.prefersReducedMotion) {
        gsap.fromTo(first, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
  }
}
