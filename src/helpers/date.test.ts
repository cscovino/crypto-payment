import { expect, test } from 'vitest';
import { formatDate } from './date';

test('pass 2024-01-15T11:51:56.213523+01:00 and return 15/01/2024, 11:51', () => {
  expect(formatDate('2024-01-15T11:51:56.213523+01:00')).toBe('15/01/2024, 11:51');
});

test('pass 2023-11-05T20:09:56.213523+01:00 and return 05/11/2023, 20:09', () => {
  expect(formatDate('2023-11-05T20:09:56.213523+01:00')).toBe('05/11/2023, 20:09');
});
