import { GuestbookStore } from './guestbook-store';

describe('GuestbookStore', () => {
  let store: GuestbookStore;

  beforeEach(() => {
    localStorage.clear();
    store = new GuestbookStore();
  });

  it('seeds from the provided wishes on first read and persists the seed', () => {
    const seed = [{ name: 'Ahmed', message: 'Congratulations!', date: '2026-01-01T00:00:00.000Z' }];

    expect(store.list('slug-a', seed)).toEqual(seed);
    // Second read (even with a different/no seed) returns the persisted value, not a fresh seed.
    expect(store.list('slug-a', [])).toEqual(seed);
  });

  it('returns an empty list when there is nothing stored and no seed given', () => {
    expect(store.list('slug-b')).toEqual([]);
  });

  it('prepends new wishes and namespaces them per slug', () => {
    store.list('slug-a', [{ name: 'Ahmed', message: 'First', date: 't0' }]);
    const updated = store.add('slug-a', { name: 'Sara', message: 'Second', date: 't1' });

    expect(updated[0].name).toBe('Sara');
    expect(updated).toHaveLength(2);
    expect(store.list('slug-other')).toEqual([]);
  });
});
