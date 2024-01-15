import { expect, test } from 'vitest';
import { formatBalance, formatChainAsNum, ethToWei } from './metamask';

test('pass 998500000000000000 and return 0.998', () => {
  expect(formatBalance('998500000000000000')).toBe('0.998');
});

test('pass 998500000000000 and return 0', () => {
  expect(formatBalance('998500000000000')).toBe('0');
});

test('pass 1908500000000000000 and return 1.908', () => {
  expect(formatBalance('1908500000000000000')).toBe('1.908');
});

test('pass 0x1 and return 1', () => {
  expect(formatChainAsNum('0x1')).toBe(1);
});

test('pass 0xa and return 10', () => {
  expect(formatChainAsNum('0xa')).toBe(10);
});

test('pass 0xa86a and return 43114', () => {
  expect(formatChainAsNum('0xa86a')).toBe(43114);
});

test('pass 0.0064 and return 0.0x16bcc41e900000', () => {
  expect(ethToWei('0.0064')).toBe('0x16bcc41e900000');
});

test('pass 0.00008 and return 0x48c273950000', () => {
  expect(ethToWei('0.00008')).toBe('0x48c273950000');
});

test('pass 1.0045 and return 0xdf0b36d8ce14000', () => {
  expect(ethToWei('1.0045')).toBe('0xdf0b36d8ce14000');
});
