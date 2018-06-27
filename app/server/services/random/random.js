/**
 * Utility class responsible for generating random value
 * and sequences of random values
 */
class Random {
    /**
     * Generates a random number within a given range (inclusively)
     * @param {Number=} from lower boundary
     * @param {Number=} to upper boundary
     * @return {Number} generated number
     */
    static generateOne(from = 0, to = Number.MAX_SAFE_INTEGER) {
        return from + Math.floor(Math.random() * (to - from + 1));
    }

    /**
     * Generates a sequence of a given length
     * consisting of random numbers
     * @param {Number} from lower value
     * @param {Number} to upper value
     * @param {Number=} length sequence length
     * @return {Array<Number>} a sequence of randomly
     * generated numbers
     */
    static generateSequence(from, to, length = 1) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(Random.generateOne(from, to));
        }
        return values;
    }
}

module.exports = Random;
