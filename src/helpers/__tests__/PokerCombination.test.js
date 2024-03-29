import { compareHands } from '../pokerCombination';

describe('Helper tests', () => {
  it('should compareHands work correct', () => {
    expect(compareHands('4H 4C 6S 7S KD', '2C 3S 9S 9D TD')).toBe(-1);
    expect(compareHands('5D 8C 9S JS AC', '2C 5C 7D 8S QH')).toBe(1);
    expect(compareHands('2D 9C AS AH AC', '3D 6D 7D TD QD')).toBe(-1);
    expect(compareHands('4D 6S 9H QH QC', '3D 6D 7H QD QS')).toBe(1);
    expect(compareHands('2H 2D 4C 4D 4S', '3C 3D 3S 9S 9D')).toBe(1);
  });
});
