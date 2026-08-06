export type PlacerInputs = {
  volumeLitres: number;
  condition: "bank" | "loose";
  swellPercent: number;
  recoveredGoldMg: number;
  recoveryPercent: number;
  wetMassKg?: number;
  moisturePercent?: number;
  dryBulkDensity?: number;
  duplicateA?: number;
  duplicateB?: number;
};

export type PlacerResult = {
  bankVolumeM3: number;
  rawGradeGm3: number;
  correctedGradeGm3: number;
  dryMassKg: number;
  derivedDensityKgm3: number;
  derivedVolumeM3: number;
  massGradeMgkg: number;
  rpdPercent: number;
};

export function calculatePlacerGrade(input: PlacerInputs): PlacerResult | null {
  const { volumeLitres, recoveredGoldMg, recoveryPercent } = input;
  if (
    !Number.isFinite(volumeLitres) ||
    !Number.isFinite(recoveredGoldMg) ||
    !Number.isFinite(recoveryPercent) ||
    volumeLitres <= 0 ||
    recoveredGoldMg < 0 ||
    recoveryPercent <= 0 ||
    recoveryPercent > 100
  ) return null;

  const measured = volumeLitres / 1000;
  const swell = Number.isFinite(input.swellPercent) ? Math.max(0, input.swellPercent) : 0;
  const bankVolumeM3 = input.condition === "loose" ? measured / (1 + swell / 100) : measured;
  const rawGradeGm3 = recoveredGoldMg / 1000 / bankVolumeM3;
  const correctedGradeGm3 = rawGradeGm3 / (recoveryPercent / 100);
  const wet = input.wetMassKg ?? 0;
  const moisture = input.moisturePercent ?? 0;
  const density = input.dryBulkDensity ?? 0;
  const a = input.duplicateA ?? 0;
  const b = input.duplicateB ?? 0;
  const dryMassKg = Number.isFinite(wet) && wet > 0 ? wet / (1 + Math.max(0, Number.isFinite(moisture) ? moisture : 0) / 100) : 0;

  return {
    bankVolumeM3,
    rawGradeGm3,
    correctedGradeGm3,
    dryMassKg,
    derivedDensityKgm3: dryMassKg > 0 ? dryMassKg / bankVolumeM3 : 0,
    derivedVolumeM3: dryMassKg > 0 && Number.isFinite(density) && density > 0 ? dryMassKg / density : 0,
    massGradeMgkg: dryMassKg > 0 ? recoveredGoldMg / dryMassKg / (recoveryPercent / 100) : 0,
    rpdPercent: Number.isFinite(a) && Number.isFinite(b) && a > 0 && b > 0 ? Math.abs(a - b) / ((a + b) / 2) * 100 : 0,
  };
}

export function screeningBand(grade: number) {
  if (grade <= 0.1) return 0;
  if (grade <= 0.3) return 1;
  if (grade <= 1) return 2;
  return 3;
}

export function ppmToGramsPerTonne(ppm: number) {
  return Number.isFinite(ppm) ? Math.max(0, ppm) : null;
}
