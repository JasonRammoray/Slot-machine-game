class GameController {
    constructor(gameRules) {
        this._gameRules = gameRules;
    }
    /**
     * Generates a game combination with values, bonus and
     * type of outcome
     * @returns {Object} a generated combination
     */
    generateCombination() {
        const values = this._gameRules.getValues();
        const bonus = this._gameRules.getBonus();
        const score = this._gameRules.getCombinationScore(values);
        const outcome = this._gameRules.getOutcome(score);
        return {
            values,
            bonus,
            outcome
        };
    }
}

module.exports = GameController;
