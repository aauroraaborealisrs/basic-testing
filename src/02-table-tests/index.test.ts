import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 0, b: 3, action: Action.Multiply, expected: 0 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 4, b: 3, action: Action.Exponentiate, expected: 64 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'one', b: 2, action: Action.Add });
    expect(result).toBeNull();
  });
});
