import {
  SOIL_HEALTH_BASELINE,
  SOIL_HEALTH_FLOOR,
  recycleCleanDung,
  ingestPesticideDung,
  isEcosystemCollapsed,
} from '../config/soilHealth';

describe('soil health', () => {
  test('baseline is a positive starting vitality', () => {
    expect(SOIL_HEALTH_BASELINE).toBeGreaterThan(SOIL_HEALTH_FLOOR);
  });

  // Covers AE1: recycling clean dung increases soil health.
  test('recycling clean dung raises soil health', () => {
    expect(recycleCleanDung(SOIL_HEALTH_BASELINE)).toBeGreaterThan(SOIL_HEALTH_BASELINE);
  });

  test('soil health grows unbounded as more clean dung is recycled', () => {
    const once = recycleCleanDung(SOIL_HEALTH_BASELINE);
    const twice = recycleCleanDung(once);
    expect(twice).toBeGreaterThan(once);
  });

  // Covers AE2: ingesting pesticide-contaminated dung decreases soil health.
  test('ingesting pesticide dung lowers soil health', () => {
    expect(ingestPesticideDung(SOIL_HEALTH_BASELINE)).toBeLessThan(SOIL_HEALTH_BASELINE);
  });

  test('soil health never falls below the floor', () => {
    expect(ingestPesticideDung(SOIL_HEALTH_FLOOR)).toBe(SOIL_HEALTH_FLOOR);
  });

  test('ecosystem is collapsed at or below the floor, thriving above it', () => {
    expect(isEcosystemCollapsed(SOIL_HEALTH_FLOOR)).toBe(true);
    expect(isEcosystemCollapsed(SOIL_HEALTH_BASELINE)).toBe(false);
  });
});
