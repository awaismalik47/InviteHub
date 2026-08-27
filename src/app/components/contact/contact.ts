import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloralFlourish } from '../floral-flourish/floral-flourish';
import { GsapAnimation } from '../../services/gsap-animation';
import { whatsappLink } from '../../data/studio-contact';

@Component({
  imports: [ReactiveFormsModule, FloralFlourish],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact implements AfterViewInit {
  readonly eventTypes = [
    'Wedding',
    'Engagement',
    'Birthday',
    'Baby Shower / Aqeeqah',
    'Anniversary',
    'Corporate / Event',
    'Other',
  ];

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    eventType: ['', Validators.required],
    eventDate: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly submitted = signal(false);

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, eventType, eventDate, message } = this.form.getRawValue();
    const lines = [
      `Hi InviteVibe! I'd like to enquire about a design.`,
      `Name: ${name}`,
      `Event type: ${eventType}`,
      eventDate ? `Event date: ${eventDate}` : null,
      `Details: ${message}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join('\n')), '_blank');
    this.submitted.set(true);
    this.form.reset();
  }
}
