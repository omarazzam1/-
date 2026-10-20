import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAlgebraicTotal,
  validateCriterionBrackets,
  getCriterionBracketName,
  getTierDetails,
  parsePoemLines,
  SAMPLE_POEMS,
} from './evaluationLogic.ts';

test('calculateAlgebraicTotal accurately sums the 6 criteria with no rounding error', () => {
  const criteria = {
    languageAndStyle: { score: 18.5 },
    prosodyAndRhyme: { score: 14 },
    originalityAndInnovation: { score: 17.5 },
    poeticImageryAndImagination: { score: 13 },
    artisticCohesionAndUnity: { score: 14 },
    emotionalImpactAndAesthetic: { score: 13 },
  };
  const total = calculateAlgebraicTotal(criteria);
  assert.equal(total, 90);
});

test('validateCriterionBrackets detects scores exceeding maximums', () => {
  const valid = validateCriterionBrackets({
    language: 20,
    prosody: 15,
    originality: 20,
    imagery: 15,
    cohesion: 15,
    impact: 15,
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.errors.length, 0);

  const invalid = validateCriterionBrackets({
    language: 25, // Max is 20
    prosody: 15,
    originality: 20,
    imagery: 15,
    cohesion: 15,
    impact: 16, // Max is 15
  });
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.errors.length, 2);
});

test('getCriterionBracketName maps scores to the strict rubric thresholds', () => {
  // Language (20 pts)
  assert.match(getCriterionBracketName('language', 19), /جزالة وفصاحة تراثية/);
  assert.match(getCriterionBracketName('language', 15), /لغة سليمة فصيحة/);
  assert.match(getCriterionBracketName('language', 11), /أخطاء خفيفة/);
  assert.match(getCriterionBracketName('language', 7), /ركاكة أسلوبية/);

  // Prosody (15 pts)
  assert.match(getCriterionBracketName('prosody', 15), /انضباط خليلي تام/);
  assert.match(getCriterionBracketName('prosody', 12), /وزن صحيح مع سناد/);
  assert.match(getCriterionBracketName('prosody', 8), /كسر عروضي صريح في بيت واحد/);
  assert.match(getCriterionBracketName('prosody', 3), /كسور عروضية متعددة/);
});

test('getTierDetails provides appropriate rank and sanction based on thresholds', () => {
  const master = getTierDetails(94);
  assert.equal(master.tierName, 'ديوان الفحول وقمة الشعر الخالد');
  assert.equal(master.isApproved, true);
  assert.equal(master.badgeStyle, 'gold');

  const elite = getTierDetails(82);
  assert.equal(elite.tierName, 'ديوان المجيدين المتقنين');
  assert.equal(elite.isApproved, true);

  const average = getTierDetails(68);
  assert.equal(average.tierName, 'ديوان المتمرسين');
  assert.equal(average.isApproved, true);

  const broken = getTierDetails(38);
  assert.equal(broken.tierName, 'ساقط عن رتبة الشعر (دون مستوى الإجازة)');
  assert.equal(broken.isApproved, false);
  assert.equal(broken.badgeStyle, 'rose');
});

test('parsePoemLines extracts first, second, and middle verse correctly', () => {
  const poem = `البيت الأول صدر ... البيت الأول عجز
البيت الثاني صدر ... البيت الثاني عجز
البيت الثالث صدر ... البيت الثالث عجز
البيت الرابع صدر ... البيت الرابع عجز
البيت الخامس صدر ... البيت الخامس عجز`;

  const parsed = parsePoemLines(poem);
  assert.equal(parsed.count, 5);
  assert.match(parsed.firstVerse, /البيت الأول/);
  assert.match(parsed.secondVerse, /البيت الثاني/);
  assert.match(parsed.middleVerse, /البيت الثالث/);
});

test('SAMPLE_POEMS contains 4 distinct benchmark categories', () => {
  assert.equal(SAMPLE_POEMS.length, 4);
  assert.ok(SAMPLE_POEMS.some((p) => p.id === 'imru-al-qais'));
  assert.ok(SAMPLE_POEMS.some((p) => p.id === 'al-mutanabbi'));
  assert.ok(SAMPLE_POEMS.some((p) => p.id === 'broken-prosody'));
});
