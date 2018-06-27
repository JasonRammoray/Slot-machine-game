const VALUES_AMOUNT = 3;
const MIN_VALUE = 0;
const MAX_VALUE = 5;
const random = require('../random');

/**
 * Game rules class encapsulates internal
 * game mechanisms
 */
class GameRules {
    /**
     * Returns a randomly generated sequence of items
     * @return {Array<Number>} generated sequence
     */
    getValues() {
        return random.generateSequence(MIN_VALUE, MAX_VALUE, VALUES_AMOUNT);
    }

    /**
     * Returns a combination score
     * @param {Array<Number>} values a sequence of values
     * @return {Number} score
     */
    getCombinationScore(values) {
        let score = 0;
        const registry = {};
        values.forEach(v => {
            registry[v] = ++registry[v] || 1;
            score = Math.max(score, registry[v]);
        });
        return score;
    }

    /**
     * Returns a type of outcome for a given score
     * @param {Number} score combination score
     * @return {String} type of outcome
     */
    getOutcome(score) {
        return ['No Win', 'Small Win', 'Big Win'][score - 1] || 'Unknown';
    }

    /**
     * Returns a boolean flag indicating if bonus
     * is applicable or not
     * @return {Boolean} boolean flag
     */
    getBonus() {
        return Boolean(random.generate(0, 1));
    }
}

module.exports = GameRules;
