// A per-run queue of ecology notes. A note is enqueued the first time a species
// or event is encountered in a run, but never shown mid-run — the run flushes the
// queue at a natural beat (death / run-end). Ignoring notes never blocks play.
//
// Pure logic only, no Phaser — so it is unit-testable. A fresh queue is created
// per run, so first-encounter tracking resets each run.

const createNoteQueue = () => ({ seen: new Set(), queued: [] });

// Enqueue the note for `key` only on its first encounter this run.
// Returns true if it was enqueued, false if already seen.
const enqueueOnFirstEncounter = (queue, key, note) => {
  if (queue.seen.has(key)) {
    return false;
  }
  queue.seen.add(key);
  queue.queued.push(note);
  return true;
};

// Return the queued notes and clear the queue (called at a natural beat).
const flushNotes = (queue) => {
  const notes = queue.queued;
  queue.queued = [];
  return notes;
};

export { createNoteQueue, enqueueOnFirstEncounter, flushNotes };
