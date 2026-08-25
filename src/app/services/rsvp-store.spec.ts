import { RsvpStore } from './rsvp-store';

describe('RsvpStore', () => {
  let store: RsvpStore;

  beforeEach(() => {
    localStorage.clear();
    store = new RsvpStore();
  });

  it('returns an empty list for a slug with no submissions', () => {
    expect(store.list('some-slug')).toEqual([]);
  });

  it('round-trips a submission through localStorage, namespaced per slug', () => {
    store.submit('slug-a', {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      attendance: 'attending',
      submittedAt: '2026-01-01T00:00:00.000Z',
    });

    expect(store.list('slug-a')).toHaveLength(1);
    expect(store.list('slug-a')[0].name).toBe('Ahmed');
    expect(store.list('slug-b')).toEqual([]);
  });

  it('appends multiple submissions for the same slug', () => {
    store.submit('slug-a', { name: 'A', email: 'a@example.com', attendance: 'attending', submittedAt: 't1' });
    store.submit('slug-a', { name: 'B', email: 'b@example.com', attendance: 'maybe', submittedAt: 't2' });

    expect(store.list('slug-a')).toHaveLength(2);
  });
});
