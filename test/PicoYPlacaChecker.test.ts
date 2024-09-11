import { PicoYPlacaChecker } from '../src/services/PicoYPlacaChecker';
import { PicoYPlacaRules } from '../src/services/PicoYPlacaRules';

describe('PicoYPlacaChecker', () => {
  const rules = new PicoYPlacaRules();
  const checker = new PicoYPlacaChecker(rules);

  // Monday: Plates ending in 1 and 2
  test('Does not allow circulation on Monday with plate ending in 1 during restricted hours', () => {
    const result = checker.check('XYZ-1231', '2024-09-09', '08:00'); // Monday, ends in 1
    expect(result).toContain('cannot');
  });

  test('Allows circulation on Monday with plate ending in 1 outside restricted hours', () => {
    const result = checker.check('ABC-231', '2024-09-09', '10:00'); // Monday, ends in 1
    expect(result).toContain('can');
  });

  test('Does not allow circulation on Monday with plate ending in 2 during restricted hours', () => {
    const result = checker.check('DEF-342', '2024-09-09', '08:00'); // Monday, ends in 2
    expect(result).toContain('cannot');
  });

  test('Allows circulation on Monday with plate ending in 2 outside restricted hours', () => {
    const result = checker.check('GHI-642', '2024-09-09', '10:00'); // Monday, ends in 2
    expect(result).toContain('can');
  });

  // Tuesday: Plates ending in 3 and 4
  test('Does not allow circulation on Tuesday with plate ending in 3 during restricted hours', () => {
    const result = checker.check('JKL-953', '2024-09-10', '08:00'); // Tuesday, ends in 3
    expect(result).toContain('cannot');
  });

  test('Allows circulation on Tuesday with plate ending in 3 outside restricted hours', () => {
    const result = checker.check('MNO-453', '2024-09-10', '10:00'); // Tuesday, ends in 3
    expect(result).toContain('can');
  });

  test('Does not allow circulation on Tuesday with plate ending in 4 during restricted hours', () => {
    const result = checker.check('PQR-784', '2024-09-10', '08:00'); // Tuesday, ends in 4
    expect(result).toContain('cannot');
  });

  test('Allows circulation on Tuesday with plate ending in 4 outside restricted hours', () => {
    const result = checker.check('STU-784', '2024-09-10', '10:00'); // Tuesday, ends in 4
    expect(result).toContain('can');
  });

  // Wednesday: Plates ending in 5 and 6
  test('Does not allow circulation on Wednesday with plate ending in 5 during restricted hours', () => {
    const result = checker.check('VWX-1355', '2024-09-11', '08:00'); // Wednesday, ends in 5
    expect(result).toContain('cannot');
  });

  test('Allows circulation on Wednesday with plate ending in 5 outside restricted hours', () => {
    const result = checker.check('YZA-965', '2024-09-11', '10:00'); // Wednesday, ends in 5
    expect(result).toContain('can');
  });

  test('Does not allow circulation on Wednesday with plate ending in 6 during restricted hours', () => {
    const result = checker.check('BCD-786', '2024-09-11', '08:00'); // Wednesday, ends in 6
    expect(result).toContain('cannot');
  });

  test('Allows circulation on Wednesday with plate ending in 6 outside restricted hours', () => {
    const result = checker.check('EFG-936', '2024-09-11', '10:00'); // Wednesday, ends in 6
    expect(result).toContain('can');
  });

  // Saturday and Sunday (no restrictions)
  test('Allows circulation on Saturday with any plate during any hour', () => {
    const result = checker.check('HIJ-5479', '2024-09-14', '08:00'); // Saturday
    expect(result).toContain('can');
    const resultEvening = checker.check('HIJ-5479', '2024-09-14', '18:00');
    expect(resultEvening).toContain('can');
  });

  test('Allows circulation on Sunday with any plate during any hour', () => {
    const result = checker.check('KLM-8901', '2024-09-15', '08:00'); // Sunday
    expect(result).toContain('can');
    const resultEvening = checker.check('KLM-8901', '2024-09-15', '18:00');
    expect(resultEvening).toContain('can');
  });
});
