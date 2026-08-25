import { AfterViewInit, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { RsvpStore } from '../../../services/rsvp-store';
import { GsapAnimation } from '../../../services/gsap-animation';

const ATTENDANCE_LABELS = {
  attending: "Yes, I'll be there",
  maybe: 'Maybe',
  'not-attending': "Can't make it",
} as const;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-rsvp-form',
  styleUrl: './rsvp-form.scss',
  templateUrl: './rsvp-form.html',
})
export class RsvpForm implements AfterViewInit {
  slug = input.required<string>();
  /** Digits only, country code first. When absent, the RSVP is stored locally but not sent to WhatsApp. */
  whatsappNumber = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly rsvpStore = inject(RsvpStore);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    attendance: ['' as '' | 'attending' | 'maybe' | 'not-attending', Validators.required],
    message: [''],
  });

  readonly submitted = signal(false);

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private readonly success = viewChild<ElementRef<HTMLElement>>('success');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, attendance, message } = this.form.getRawValue();
    const typedAttendance = attendance as 'attending' | 'maybe' | 'not-attending';

    this.rsvpStore.submit(this.slug(), {
      name: name!,
      email: email!,
      attendance: typedAttendance,
      message: message || undefined,
      submittedAt: new Date().toISOString(),
    });

    const number = this.whatsappNumber();
    if (number) {
      const lines = [
        `RSVP for the wedding`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Attending: ${ATTENDANCE_LABELS[typedAttendance]}`,
        message ? `Message: ${message}` : null,
      ].filter(Boolean);
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    }

    this.submitted.set(true);
    this.form.reset({ attendance: '' });

    queueMicrotask(() => {
      const el = this.success()?.nativeElement;
      if (el && !this.anim.prefersReducedMotion) {
        gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' });
      }
    });
  }
}
