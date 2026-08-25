import { TestBed } from '@angular/core/testing';
import { SampleAminaZain } from './sample-amina-zain';

describe('SampleAminaZain', () => {
  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SampleAminaZain],
    })
      .compileComponents();
  });

  it('should create and show the PIN gate before revealing the invitation', () => {
    const fixture = TestBed.createComponent(SampleAminaZain);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.invite-gate')).toBeTruthy();
    expect(compiled.querySelector('app-invite-template-basic')).toBeFalsy();
  });

  it('sets the noindex meta tag', () => {
    const fixture = TestBed.createComponent(SampleAminaZain);
    fixture.detectChanges();

    const tag = document.querySelector('meta[name="robots"]');
    expect(tag?.getAttribute('content')).toBe('noindex, nofollow');
  });
});
