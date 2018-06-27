const GameController = require('./controller');

describe('Game controller ->', () => {
    a = () => {};
    let ctrl;
    let combination;
    let mockGameRules = {
        getValues: () => [1, 1, 1],
        getBonus: () => false,
        getCombinationScore: () => 2,
        getOutcome: score => `Score ${score}`
    };
    beforeEach(ctrl = new GameController(mockGameRules));
    beforeEach(combination = ctrl.generateCombination());

    it('should generate values combination', () => {
        expect(combination.values).toEqual([1, 1, 1]);
    });
});
