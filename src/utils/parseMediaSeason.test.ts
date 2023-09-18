import { MediaSeason } from '@/composables/useGraphQL';
import { expect, test } from 'vitest';
import { parseMediaSeason } from './parseMediaSeason';

test('parseMediaSeason', () => {
  expect(parseMediaSeason('unknown')).toBe(undefined);
  expect(parseMediaSeason('winter')).toBe(MediaSeason.Winter);
  expect(parseMediaSeason('spring')).toBe(MediaSeason.Spring);
  expect(parseMediaSeason('summer')).toBe(MediaSeason.Summer);
  expect(parseMediaSeason('fall')).toBe(MediaSeason.Fall);
});
