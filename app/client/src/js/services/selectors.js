/**
 * A class describing a css selectors
 * for the game elements
 */
class Selectors {
    /**
     * @return {String}
     */
    static get startBtn() {
        return '.game__start-btn';
    };

    /**
     * @return {String}
     */
    static get gameBrick() {
        return '.game__brick';
    }

    /**
     * @return {String}
     */
    static get gameOutput() {
        return '.game__output';
    }

    /**
     * @return {String}
     */
    static get pristineBrick() {
        return '.game__brick--pristine';
    }
}

export default Selectors;
