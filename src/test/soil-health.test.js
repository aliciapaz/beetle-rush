import {
  SOIL_HEALTH_BASELINE,
  SOIL_HEALTH_FLOOR,
  CLEAN_DUNG_GAIN,
  PESTICIDE_DUNG_LOSS,
  recycleCleanDung,
  ingestPesticideDung,
  isEcosystemCollapsed,
} from '../config/soilHealth';

describe('soil health', () => {
  test('baseline is a positive starting vitality', () => {
    expect(SOIL_HEALTH_BASELINE).toBeGreaterThan(SOIL_HEALTH_FLOOR);
  });

  // Covers AE1: recycling clean dung increases soil health by the gain.
  test('recycling clean dung raises soil health by the gain', () => {
    expect(recycleCleanDung(SOIL_HEALTH_BASELINE)).toBe(SOIL_HEALTH_BASELINE + CLEAN_DUNG_GAIN);
  });

  test('soil health grows unbounded as more clean dung is recycled', () => {
    const once = recycleCleanDung(SOIL_HEALTH_BASELINE);
    const twice = recycleCleanDung(once);
    expect(twice).toBeGreaterThan(once);
  });

  // Covers AE2: ingesting pesticide-contaminated dung decreases soil health by the loss.
  test('ingesting pesticide dung lowers soil health by the loss', () => {
    const expected = SOIL_HEALTH_BASELINE - PESTICIDE_DUNG_LOSS;
    expect(ingestPesticideDung(SOIL_HEALTH_BASELINE)).toBe(expected);
  });

  test('a partial drain clamps to the floor rather than going negative', () => {
    expect(ingestPesticideDung(PESTICIDE_DUNG_LOSS - 2)).toBe(SOIL_HEALTH_FLOOR);
  });

  test('soil health never falls below the floor', () => {
    expect(ingestPesticideDung(SOIL_HEALTH_FLOOR)).toBe(SOIL_HEALTH_FLOOR);
  });

  test('ecosystem is collapsed at or below the floor, thriving above it', () => {
    expect(isEcosystemCollapsed(SOIL_HEALTH_FLOOR)).toBe(true);
    expect(isEcosystemCollapsed(SOIL_HEALTH_FLOOR + 1)).toBe(false);
    expect(isEcosystemCollapsed(SOIL_HEALTH_BASELINE)).toBe(false);
  });
});
