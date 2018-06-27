const GameController = require('./controller');

describe('Game controller ->', () => {
    let ctrl;
    let combination;
    let mockGameRules = {
        getValues: () => [1, 1, 1],
        getBonus: () => false,
        getCombinationScore: () => 2,
        getOutcome: score => `Score ${score}`
    };
    beforeEach(() => ctrl = new GameController(mockGameRules));
    beforeEach(() => combination = ctrl.generateCombination());

    it('should generate values combination', () => {
        expect(combination.values).toEqual([1, 1, 1]);
    });
    it('should generate a bonus point', () => {
        expect(combination.bonus).toBe(false);
    });
    it('should generate a game outcome', () => {
        expect(combination.outcome).toBe('Score 2');
    });
});
