import { Service } from '@angular/core';
import { GuestWish } from '../data/wedding-config';

/**
 * Client-side-only guestbook storage, namespaced per invitation slug and
 * seeded from the client's configured example wishes on first read so the
 * section isn't empty before any real guest has posted. Swap the body of
 * `add`/`list` for an HTTP call once a real backend exists.
 */
@Service()
export class GuestbookStore {
  list(slug: string, seed: GuestWish[] = []): GuestWish[] {
    const raw = window.localStorage.getItem(this.key(slug));
    if (raw) return JSON.parse(raw) as GuestWish[];
    if (seed.length) window.localStorage.setItem(this.key(slug), JSON.stringify(seed));
    return seed;
  }

  add(slug: string, wish: GuestWish): GuestWish[] {
    const all = [wish, ...this.list(slug)];
    window.localStorage.setItem(this.key(slug), JSON.stringify(all));
    return all;
  }

  private key(slug: string): string {
    return `wedding-guestbook:${slug}`;
  }
}
