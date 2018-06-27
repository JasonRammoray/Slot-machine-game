const random = require('./random');

describe('Random ->', () => {
    describe('When generating a single value ->', () => {
        it('should generate a random value in a given range', () => {
            const value = random.generateOne(0, 5);
            expect(value >= 0 && value <= 5).toBe(true);
        });
        it('should generate a random value between 0 and max safe integer by default', () => {
            const value = random.generateOne();
            expect(value >= 0 && value <= Number.MAX_SAFE_INTEGER).toBe(true);
        });
    });
    describe('When generating a collection of items ->', () => {
        const length = 5;
        const values = random.generateSequence(0, 5, length);
        it('should generate a collection of items of a certain length', () => {
            expect(values.length).toBe(length);
        });
        it('should generate a collection of items each within a given range', () => {
            const isCorrectSeq = values.every(v => v >= 0 && v <= 5);
            expect(isCorrectSeq).toBe(true);
        });
        it('should generate a collection with default items, when range is missing', () => {
            const values = random.generateSequence();
            const isCorrectSeq = values.every(v => v >= 0 && v <= Number.MAX_SAFE_INTEGER);
            expect(isCorrectSeq).toBe(true);
        });
    });
});
