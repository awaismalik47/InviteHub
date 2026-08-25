import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { FloralFlourish } from '../floral-flourish/floral-flourish';
import { InvitationData } from '../../data/invitation';
import { GsapAnimation } from '../../services/gsap-animation';

@Component({
  imports: [FloralFlourish],
  selector: 'app-invite-template-basic',
  styleUrl: './invite-template-basic.scss',
  templateUrl: './invite-template-basic.html',
})
export class InviteTemplateBasic implements AfterViewInit {
  data = input.required<InvitationData>();

  private readonly cover = viewChild.required<ElementRef<HTMLElement>>('cover');
  private readonly details = viewChild.required<ElementRef<HTMLElement>>('details');
  private readonly gallery = viewChild<ElementRef<HTMLElement>>('gallery');

  constructor(private readonly anim: GsapAnimation) {}

  ngAfterViewInit(): void {
    this.anim.revealOnScroll(this.cover().nativeElement, { y: 20 });
    this.anim.revealOnScroll(this.details().nativeElement, { delay: 0.1 });

    const galleryEl = this.gallery()?.nativeElement;
    if (galleryEl) {
      this.anim.revealGroupOnScroll(galleryEl, galleryEl.querySelectorAll('.invite-template__photo'));
    }
  }
}
