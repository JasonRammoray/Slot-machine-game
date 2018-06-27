/**
 * Encapsulates randomness required for the game mechanic
 */
class Random {
    /**
     * Generates a random value in a range between
     * from and to inclusively
     * @param {Number=} from lower boundary
     * @param {Number=} to upper boundary
     * @return {Number} random value
     */
    static getValue(from = 0, to = Number.MAX_SAFE_INTEGER) {
        return from + Math.floor(Math.random() * (to - from + 1));
    }
}

export default Random;
