// Short, in-context ecology notes keyed by the species or event that triggers
// them. Surfaced only at natural beats (first encounter shows at the next death
// or run-end), never mid-run.
//
// PLACEHOLDER CONTENT. All notes must be reviewed for factual accuracy with a
// dung-beetle specialist before release (see requirement R9). Keep each note to
// one or two plain sentences tied to what the player just did or met.

const ECOLOGY_NOTES = {
  cleanDung:
    'Dung beetles bury and recycle dung, returning nutrients to the soil and improving its health. [placeholder — verify with specialist]',
  pesticideDung:
    'Pesticides carried in dung can poison the beetles that recycle it, and the soil life they feed. [placeholder — verify with specialist]',
  frog:
    'Frogs are natural predators of dung beetles. [placeholder — verify with specialist]',
  bird:
    'Many birds hunt dung beetles, especially around fresh dung. [placeholder — verify with specialist]',
  toad:
    'Toads eat dung beetles and other insects drawn to dung. [placeholder — verify with specialist]',
};

const getNote = (key) => ECOLOGY_NOTES[key] || null;

export { ECOLOGY_NOTES, getNote };
