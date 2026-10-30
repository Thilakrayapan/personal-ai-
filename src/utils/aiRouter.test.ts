import test from 'node:test';
import assert from 'node:assert/strict';
import { checkAiNotNeeded, detectCategory, analyzeTask, calculateBudgetMetrics } from './aiRouter';

test('checkAiNotNeeded identifies simple arithmetic', () => {
  const res1 = checkAiNotNeeded('25 x 40');
  assert.equal(res1.isNotNeeded, true);
  assert.equal(res1.directAnswer, '1000');
  assert.equal(res1.toolName, 'Calculator');

  const res2 = checkAiNotNeeded('150 + 45');
  assert.equal(res2.isNotNeeded, true);
  assert.equal(res2.directAnswer, '195');

  const res3 = checkAiNotNeeded('500 / 25');
  assert.equal(res3.isNotNeeded, true);
  assert.equal(res3.directAnswer, '20');
});

test('checkAiNotNeeded allows complex queries through to AI', () => {
  const res = checkAiNotNeeded('Help me debug this Python code');
  assert.equal(res.isNotNeeded, false);
});

test('detectCategory classifies correctly', () => {
  assert.equal(detectCategory('Help me debug this Python code'), 'Coding');
  assert.equal(detectCategory('Research on renewable energy solutions'), 'Research');
  assert.equal(detectCategory('Write a college essay on climate change'), 'Writing');
  assert.equal(detectCategory('Generate image for presentation slide'), 'Image Generation');
});

test('analyzeTask handles AI-not-needed workflow', () => {
  const result = analyzeTask('25 x 40', 'Student');
  assert.equal(result.aiRequired, false);
  assert.equal(result.directAnswer, '1000');
  assert.equal(result.recommendedTool?.name, 'Calculator');
});

test('analyzeTask handles Coding task workflow', () => {
  const result = analyzeTask('Help me debug this Python code', 'Student');
  assert.equal(result.aiRequired, true);
  assert.equal(result.category, 'Coding');
  assert.ok(result.recommendedModels.length > 0);
  assert.equal(result.recommendedModels[0].name, 'ChatGPT');
  assert.equal(result.recommendedModels[0].isBestChoice, true);
});

test('calculateBudgetMetrics computes percentages and boundaries', () => {
  const metrics = calculateBudgetMetrics(145, 500, 92);
  assert.equal(metrics.percentageUsed, 29);
  assert.equal(metrics.remainingBudget, 355);
  assert.equal(metrics.isNearLimit, false);
  assert.equal(metrics.potentialSavingsINR, 92);
});
