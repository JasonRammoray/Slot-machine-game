const GameRules = require('./rules');

describe('Game rules ->', () => {
    let rules;
    beforeEach(() => rules = new GameRules());
    describe('When generating sequence ->', () => {
        let seq;
        beforeEach(() => seq = rules.getValues());

        it('should generate a sequence of 3 items', () => {
            expect(seq.length).toBe(3);
        });
        it('should generate a sequence of random numbers between 0 and 5', () => {
            const isCorrectSeq = seq.every(v => v >= 0 && v <= 5);
            expect(isCorrectSeq).toBe(true);
        });
    });
    describe('When calculating a combination score ->', () => {
        it('should calculate score for lose', () => {
            const seq = [1, 2, 3];
            expect(rules.getCombinationScore(seq)).toBe(1);
        });
        it('should calculate score for small win', () => {
            const seq = [2, 2, 1];
            expect(rules.getCombinationScore(seq)).toBe(2);
        });
        it('should calculate score for big win', () => {
            const seq = [2, 2, 2];
            expect(rules.getCombinationScore(seq)).toBe(3);
        });
    });
    describe('When checking combination output ->', () => {
        it('should recognize "no win"', () => {
            expect(rules.getOutcome(1)).toBe('No Win');
        });
        it('should recognize "small win"', () => {
            expect(rules.getOutcome(2)).toBe('Small Win');
        });
        it('should recognize "big win"', () => {
            expect(rules.getOutcome(3)).toBe('Big Win');
        });
        [-1, 4].forEach(input => {
            it(`should recognize unknown outcome for large score: ${input}`, () => {
                expect(rules.getOutcome(input)).toBe('Unknown');
            });
        });
    });
    it('should generate a random bonus point', () => {
        expect(typeof rules.getBonus()).toBe('boolean');
    });
});
