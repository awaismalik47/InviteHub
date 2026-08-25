import { Component, ElementRef, OnInit, computed, inject, input, signal, viewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';

/**
 * Mandatory shell for every invitation page: sets the noindex meta tag
 * unconditionally, then either projects the invitation content directly
 * (no PIN set) or gates it behind a simple client-side code check. The PIN
 * is a light deterrent for premium clients, not real security — it ships
 * in the page bundle like the rest of the invitation's content.
 */
@Component({
  imports: [],
  selector: 'app-invite-pin-gate',
  styleUrl: './invite-pin-gate.scss',
  templateUrl: './invite-pin-gate.html',
})
export class InvitePinGate implements OnInit {
  pin = input<string>();

  private readonly meta = inject(Meta);
  private readonly storageKey = computed(() => `invite-unlocked:${window.location.pathname}`);
  private readonly codeInput = viewChild<ElementRef<HTMLInputElement>>('codeInput');

  readonly unlocked = signal(false);
  readonly error = signal(false);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

    if (!this.pin() || window.sessionStorage.getItem(this.storageKey()) === 'true') {
      this.unlocked.set(true);
    }
  }

  submit(event: Event): void {
    event.preventDefault();
    const value = this.codeInput()?.nativeElement.value ?? '';

    if (value === this.pin()) {
      window.sessionStorage.setItem(this.storageKey(), 'true');
      this.unlocked.set(true);
      this.error.set(false);
    } else {
      this.error.set(true);
    }
  }
}
