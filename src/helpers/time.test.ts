import { expect, test } from 'vitest';
import { msToStringTime } from './time';

test('pass 60000 ms and return 01:00', () => {
  expect(msToStringTime(60000)).toBe('01:00');
});

test('pass 60001 ms and return 01:00', () => {
  expect(msToStringTime(60011)).toBe('01:00');
});

test('pass 121000 ms and return 02:01', () => {
  expect(msToStringTime(121000)).toBe('02:01');
});

test('pass 12984000 ms and return 216:24', () => {
  expect(msToStringTime(12984000)).toBe('216:24');
});
