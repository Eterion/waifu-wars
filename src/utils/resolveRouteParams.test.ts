import { expect, test } from 'vitest';
import { resolveRouteParams } from './resolveRouteParams';

test('resolveRouteParams', () => {
  expect(
    resolveRouteParams(
      {
        season: 'winter',
        year: '2023',
      },
      {
        season: String,
        year: Number,
      },
    ),
  ).toStrictEqual({
    season: 'winter',
    year: 2023,
  });
});
