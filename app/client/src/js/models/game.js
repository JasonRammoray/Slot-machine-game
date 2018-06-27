/**
 * Encapsulates game model
 */
class GameModel {
    /**
     * @return {Number}
     */
    static get maxAllowedStates() {
        return 5;
    }
    /**
     * Binds to game elements
     * @param {Object} selectors css selectors dictionary
     * @param {String} selectors.gameBrick css selector for a game brick
     * @param {String} selectors.startBtn css selector for a start button
     * @param {String} selectors.gameOutput css selector for a game output
     * @param {Object} random random class
     */
    constructor(selectors, random) {
        this._bricks = [...document.querySelectorAll(selectors.gameBrick)];
        this._startBtn = document.querySelector(selectors.startBtn);
        this._output = document.querySelector(selectors.gameOutput);
        this._shuffleOn = false;
        this._random = random;
    }

    /**
     * Updates game bricks according to
     * the values corresponding to a game move
     * @param {Array<Number>} values a sequence of integers
     */
    updateBricks(values) {
        values.forEach((val, index) => this._mutateBrick(this._bricks[index], val));
    }

    /**
     * Sets game move output
     * @param {String} text a move outcome
     */
    setOutput(text) {
        this._output.textContent = text;
    }

    /**
     * Returns a reference to a start button
     * @return {Object} a start button
     */
    getStartBtn() {
        return this._startBtn;
    }

    /**
     * Mutates a game brick element,
     * which results in changing background picture
     * @param {Object} brickNode reference to a DOM element
     * @param {Number=} stateIndex state numerical index
     * @return {undefined}
     * @private
     */
    _mutateBrick(brickNode, stateIndex = this._random.getValue(0, GameModel.maxAllowedStates)) {
        for (let i = 0; i <= GameModel.maxAllowedStates; i++) {
            brickNode.classList.remove(this._getBrickStateClass(i));
        }
        const newCssClass = this._getBrickStateClass(stateIndex);
        brickNode.classList.add(newCssClass);
    }

    /**
     * Transforms a numerical index into
     * a game brick css class
     * @param {Number} index
     * @return {String} css class
     * @private
     */
    _getBrickStateClass(index) {
        return `game__brick--state-${index}`;
    }

    /**
     * Mutates a set of game bricks
     * picture
     * @private
     */
    _mutateBricks() {
        if (!this._shuffleOn) {
            return;
        }
        requestAnimationFrame(() => {
            this._bricks.forEach(brick => this._mutateBrick(brick));
            setTimeout(() => this._mutateBricks(), 200);
        });
    }

    /**
     * Plays progress indicator
     * @private
     */
    _playIndicator() {
        this._startBtn.setAttribute('data-active', 'true');
    }

    /**
     * Stops progress indicator
     * @private
     */
    _stopIndicator() {
        this._startBtn.removeAttribute('data-active');
    }

    /**
     * Shuffles a game bricks by switching
     * background pictures for each of them
     * @param {Number} duration time range in milliseconds
     * @return {Promise<void>} promise to finish shuffle process
     */
    shuffleBricks(duration) {
        if (!duration || duration < 0) {
            return Promise.reject();
        }
        if (this._shuffleOn) {
            return console.warn('Shuffle is already enabled');
        }
        const promise = new Promise(resolve => {
            setTimeout(() => {
                this._shuffleOn = false;
                this._stopIndicator();
                resolve();
            }, duration);
        });
        this._touch();
        this._playIndicator();
        this._shuffleOn = true;
        this._mutateBricks();
        return promise;
    }

    /**
     * Touches a game model by moving game bricks
     * to a "dirty" state
     * @private
     */
    _touch() {
        this._markBricksDirty();
    }

    /**
     * Marks game bricks as dirty
     * by removing a data attribute form them
     * @private
     */
    _markBricksDirty() {
        this._bricks.forEach(brick => brick.removeAttribute('data-pristine'));
    }
}

export default GameModel;
