const VALUES_AMOUNT = 3;
const MIN_VALUE = 0;
const MAX_VALUE = 5;
const random = require('../random');

class GameRules {
    /**
     * Returns a randomly generated sequence of items
     * @returns {Array<Number>} generated sequence
     * @public
     */
    getValues() {
        const values = [];
        for (let i = 0; i < VALUES_AMOUNT; i++) {
            values.push(random.generate(MIN_VALUE, MAX_VALUE));
        }
        return values;
    }

    /**
     * Returns a combination score
     * @param {Array<Number>} values a sequence of values
     * @return {Number} score
     * @public
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
     * @public
     */
    getOutcome(score) {
        return ['No Win', 'Small Win', 'Big Win'][score - 1] || 'Unknown';
    }

    /**
     * Returns a boolean flag indicating if bonus
     * is applicable or not
     * @returns {Boolean} boolean flag
     * @public
     */
    getBonus() {
        return Boolean(random.generate(0, 1));
    }
}

module.exports = GameRules;
