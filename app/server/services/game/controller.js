/**
 * Game controller responsible for high-level tasks
 * and provides a consumer a public api to interact with
 * the game
 */
class GameController {
    /**
     * @param {Object} gameRules an instance of GameRules class
     */
    constructor(gameRules) {
        this._gameRules = gameRules;
    }
    /**
     * Generates a game combination with values, bonus and
     * type of outcome
     * @return {Object} a generated combination
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
