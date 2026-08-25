import { TestBed } from '@angular/core/testing';
import { Countdown } from './countdown';

describe('Countdown', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Countdown],
    })
      .compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the days/hours/minutes/seconds breakdown for a future date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    const fixture = TestBed.createComponent(Countdown);
    fixture.componentRef.setInput('weddingDate', '2026-01-03T06:30:15.000Z');
    fixture.detectChanges();

    expect(fixture.componentInstance.breakdown()).toEqual({ days: 2, hours: 6, minutes: 30, seconds: 15 });
    expect(fixture.componentInstance.arrived()).toBe(false);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2');
    expect(compiled.querySelector('.countdown__arrived')).toBeFalsy();
  });

  it('shows the arrival message once the wedding date has passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-05T00:00:00.000Z'));

    const fixture = TestBed.createComponent(Countdown);
    fixture.componentRef.setInput('weddingDate', '2026-01-01T00:00:00.000Z');
    fixture.detectChanges();

    expect(fixture.componentInstance.arrived()).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.countdown__arrived')?.textContent).toContain('THE BIG DAY IS HERE');
  });

  it('ticks the breakdown down as time passes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    const fixture = TestBed.createComponent(Countdown);
    fixture.componentRef.setInput('weddingDate', '2026-01-01T00:00:05.000Z');
    fixture.detectChanges();

    expect(fixture.componentInstance.breakdown().seconds).toBe(5);
    vi.advanceTimersByTime(2000);
    expect(fixture.componentInstance.breakdown().seconds).toBe(3);
  });
});
