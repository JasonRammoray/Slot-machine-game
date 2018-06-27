class Random {
    static generate(from = 0, to = Number.MAX_SAFE_INTEGER) {
        return from + Math.floor(Math.random() * (to - from + 1));
    }
}

module.exports = Random;
