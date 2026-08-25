import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InvitePinGate } from './invite-pin-gate';

@Component({
  imports: [InvitePinGate],
  template: `
    <app-invite-pin-gate [pin]="pin">
      <p class="projected-content">Secret invitation content</p>
    </app-invite-pin-gate>
  `,
})
class HostFixture {
  pin?: string;
}

describe('InvitePinGate', () => {
  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [HostFixture],
    })
      .compileComponents();
  });

  it('renders the projected content immediately when no pin is set', async () => {
    const fixture = TestBed.createComponent(HostFixture);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.projected-content')).toBeTruthy();
    expect(compiled.querySelector('.invite-gate')).toBeFalsy();
  });

  it('sets the noindex meta tag regardless of pin state', () => {
    const fixture = TestBed.createComponent(HostFixture);
    fixture.componentInstance.pin = '1234';
    fixture.detectChanges();

    const tag = document.querySelector('meta[name="robots"]');
    expect(tag?.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('blocks with an error on the wrong pin and unlocks on the correct one', async () => {
    const fixture = TestBed.createComponent(HostFixture);
    fixture.componentInstance.pin = '1234';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.invite-gate')).toBeTruthy();

    const input = compiled.querySelector<HTMLInputElement>('#invite-pin')!;
    const form = compiled.querySelector('form')!;

    input.value = 'wrong';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();
    expect(compiled.querySelector('.invite-gate__error')).toBeTruthy();
    expect(compiled.querySelector('.projected-content')).toBeFalsy();

    input.value = '1234';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(compiled.querySelector('.projected-content')).toBeTruthy();
  });
});
