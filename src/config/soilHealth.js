// Per-run soil health: the beetle's real ecological work made legible.
// Recycling clean dung raises soil vitality; ingesting pesticide-contaminated
// dung lowers it. When it collapses to the floor, the local ecosystem fails and
// the run ends. Soil health resets each run (arcade, no cross-run persistence).
//
// Pure logic only, no Phaser — so it is unit-testable. Spawn rates and exact
// gain/loss tuning belong to the core-loop/difficulty work, not here.

const SOIL_HEALTH_BASELINE = 100;
const SOIL_HEALTH_FLOOR = 0;
const CLEAN_DUNG_GAIN = 5;
const PESTICIDE_DUNG_LOSS = 5;

const recycleCleanDung = (current) => current + CLEAN_DUNG_GAIN;

const ingestPesticideDung = (current) => Math.max(SOIL_HEALTH_FLOOR, current - PESTICIDE_DUNG_LOSS);

const isEcosystemCollapsed = (current) => current <= SOIL_HEALTH_FLOOR;

export {
  SOIL_HEALTH_BASELINE,
  SOIL_HEALTH_FLOOR,
  CLEAN_DUNG_GAIN,
  PESTICIDE_DUNG_LOSS,
  recycleCleanDung,
  ingestPesticideDung,
  isEcosystemCollapsed,
};
