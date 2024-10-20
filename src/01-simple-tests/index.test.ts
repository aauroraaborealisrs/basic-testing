import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 5, action: Action.Multiply })).toBe(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 3, action: Action.Divide })).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'idk', b: 3, action: Action.Add })).toBeNull();
  });
});
