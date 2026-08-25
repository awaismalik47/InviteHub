import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { DressCode as DressCodeData } from '../../../data/wedding-config';
import { GsapAnimation } from '../../../services/gsap-animation';

@Component({
  imports: [],
  selector: 'app-dress-code',
  styleUrl: './dress-code.scss',
  templateUrl: './dress-code.html',
})
export class DressCode implements AfterViewInit {
  dressCode = input.required<DressCodeData>();

  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.panel().nativeElement);
  }
}
