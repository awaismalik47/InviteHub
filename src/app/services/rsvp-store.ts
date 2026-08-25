import { Service } from '@angular/core';

export interface RsvpSubmission {
  name: string;
  email: string;
  attendance: 'attending' | 'maybe' | 'not-attending';
  message?: string;
  submittedAt: string;
}

/**
 * Client-side-only RSVP storage, namespaced per invitation slug. Submissions
 * are only visible in the submitting guest's own browser today — swap the
 * body of `submit`/`list` for an HTTP call once a real backend exists, the
 * public shape stays the same.
 */
@Service()
export class RsvpStore {
  submit(slug: string, entry: RsvpSubmission): void {
    const all = this.list(slug);
    all.push(entry);
    window.localStorage.setItem(this.key(slug), JSON.stringify(all));
  }

  list(slug: string): RsvpSubmission[] {
    const raw = window.localStorage.getItem(this.key(slug));
    return raw ? (JSON.parse(raw) as RsvpSubmission[]) : [];
  }

  private key(slug: string): string {
    return `wedding-rsvp:${slug}`;
  }
}
