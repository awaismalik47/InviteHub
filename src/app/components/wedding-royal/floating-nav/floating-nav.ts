import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  imports: [],
  selector: 'app-floating-nav',
  styleUrl: './floating-nav.scss',
  templateUrl: './floating-nav.html',
})
export class FloatingNav implements AfterViewInit, OnDestroy {
  readonly links: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'couple', label: 'Couple' },
    { id: 'events', label: 'Events' },
    { id: 'story', label: 'Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'rsvp', label: 'RSVP' },
  ];

  readonly activeId = signal('home');

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const sections = this.links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => !!el);

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) this.activeId.set(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
