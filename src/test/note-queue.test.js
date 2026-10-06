import {
  createNoteQueue,
  enqueueOnFirstEncounter,
  flushNotes,
} from '../objects/noteQueue';
import { getNote, ECOLOGY_NOTES } from '../config/ecologyNotes';

describe('note queue', () => {
  // Covers AE3: a first encounter produces a note, but not during the run.
  test('enqueues a note on the first encounter of a key', () => {
    const q = createNoteQueue();
    const enqueued = enqueueOnFirstEncounter(q, 'bird', 'a bird note');
    expect(enqueued).toBe(true);
  });

  test('does not re-enqueue the same key within a run', () => {
    const q = createNoteQueue();
    enqueueOnFirstEncounter(q, 'bird', 'a bird note');
    const second = enqueueOnFirstEncounter(q, 'bird', 'a bird note');
    expect(second).toBe(false);
  });

  // Covers AE3: queued notes surface at a natural beat (flush), not mid-run.
  test('flush returns queued notes and clears the queue', () => {
    const q = createNoteQueue();
    enqueueOnFirstEncounter(q, 'bird', 'a bird note');
    enqueueOnFirstEncounter(q, 'toad', 'a toad note');
    expect(flushNotes(q)).toEqual(['a bird note', 'a toad note']);
    expect(flushNotes(q)).toEqual([]);
  });

  test('first-encounter dedupe survives a flush (notes never re-enqueue in a run)', () => {
    const q = createNoteQueue();
    enqueueOnFirstEncounter(q, 'bird', 'a bird note');
    flushNotes(q);
    expect(enqueueOnFirstEncounter(q, 'bird', 'a bird note')).toBe(false);
  });

  // Covers AE4: nothing about the queue blocks play — enqueue is a pure,
  // non-throwing bookkeeping call the run never has to wait on.
  test('enqueueing many notes never blocks or throws', () => {
    const q = createNoteQueue();
    expect(() => {
      ['frog', 'bird', 'toad', 'pesticideDung'].forEach((k) => enqueueOnFirstEncounter(q, k, `${k} note`));
    }).not.toThrow();
    expect(q.queued.length).toBe(4);
  });
});

describe('ecology notes', () => {
  test('resolves the exact note content for a known species key', () => {
    expect(getNote('frog')).toBe(ECOLOGY_NOTES.frog);
  });

  test('returns null for an unknown key rather than throwing', () => {
    expect(getNote('unicorn')).toBeNull();
  });
});
