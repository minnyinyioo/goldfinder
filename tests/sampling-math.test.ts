import assert from "node:assert/strict";
import test from "node:test";
import { calculatePlacerGrade, ppmToGramsPerTonne, screeningBand } from "../src/lib/sampling-math";

test("calculates corrected bank-volume placer grade", () => {
  const result = calculatePlacerGrade({ volumeLitres: 20, condition: "bank", swellPercent: 14, recoveredGoldMg: 50, recoveryPercent: 90 });
  assert.ok(result);
  assert.equal(result.bankVolumeM3, 0.02);
  assert.equal(result.rawGradeGm3, 2.5);
  assert.ok(Math.abs(result.correctedGradeGm3 - 2.7777777778) < 1e-9);
});

test("corrects loose volume for swell", () => {
  const result = calculatePlacerGrade({ volumeLitres: 114, condition: "loose", swellPercent: 14, recoveredGoldMg: 100, recoveryPercent: 100 });
  assert.ok(result);
  assert.ok(Math.abs(result.bankVolumeM3 - 0.1) < 1e-12);
  assert.ok(Math.abs(result.correctedGradeGm3 - 1) < 1e-12);
});

test("rejects invalid sampling inputs", () => {
  assert.equal(calculatePlacerGrade({ volumeLitres: 0, condition: "bank", swellPercent: 0, recoveredGoldMg: 1, recoveryPercent: 100 }), null);
  assert.equal(calculatePlacerGrade({ volumeLitres: 10, condition: "bank", swellPercent: 0, recoveredGoldMg: -1, recoveryPercent: 100 }), null);
  assert.equal(calculatePlacerGrade({ volumeLitres: 10, condition: "bank", swellPercent: 0, recoveredGoldMg: 1, recoveryPercent: 101 }), null);
});

test("uses stable screening boundaries and ppm equivalence", () => {
  assert.deepEqual([screeningBand(0.1), screeningBand(0.3), screeningBand(1), screeningBand(1.01)], [0, 1, 2, 3]);
  assert.equal(ppmToGramsPerTonne(2.4), 2.4);
  assert.equal(ppmToGramsPerTonne(-1), 0);
  assert.equal(ppmToGramsPerTonne(Number.NaN), null);
});
