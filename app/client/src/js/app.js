import delay from './services/delay.js';
import Browser from './services/browser.js';

/**
 * Main application controller encapsulates
 * game widget logic
 */
class AppController {
    /**
     * @param {Object} model game model
     * @param {Object} service game service
     */
    constructor(model, service) {
        this._model = model;
        this._service = service;
        this._movePending = false;
        this._init();
    }

    /**
     * Locks a game move
     * @private
     */
    _lockMove() {
        this._movePending = true;
    }

    /**
     * Checks if game move is still in progress
     * @return {Boolean} boolean flag indicating
     * if move is pending or not
     * @private
     */
    _moveInProgress() {
        return this._movePending;
    }

    /**
     * Unlocks a game move
     * @private
     */
    _unlockMove() {
        this._movePending = false;
    }

    /**
     * Binds the event listeners
     * @private
     */
    _init() {
        this._model.getStartBtn().addEventListener('click', () => this._play(), true);
    }

    /**
     * Notifies user about game move outcome
     * @param {String} text game move outcome
     * @private
     */
    _notifyUser(text) {
        this._model.setOutput(text);
    }

    /**
     * Makes game move by shuffling game bricks
     * and fetching data from a server side
     * @return {Promise<Object>} game move data
     * @private
     */
    _makeMove() {
        const shuffling = this._model.shuffleBricks(5000);
        const gameMoveData = this._service.makeMove();
        return Promise.all([
            gameMoveData,
            shuffling
        ]);
    }

    /**
     * Plays a game.
     * In case if bonus is returned from a server side,
     * then game makes an additional move
     * @return {void}
     * @private
     */
    _play() {
        if (!Browser.isOnline()) {
            return console.warn('The game is in offline mode. Please, try again later');
        }
        if (this._moveInProgress()) {
            return console.warn('Game move is still in progress');
        }
        this._lockMove();
        let bonusMoveAvailable = false;
        this._notifyUser('Hold tight. Jackpot is coming...');
        this._makeMove()
        .then(([data]) => {
            this._notifyUser(data.outcome);
            this._model.updateBricks(data.values);
            if (data.bonus) {
                bonusMoveAvailable = true;
                this._notifyUser('Bonus move available!');
                return delay(2000);
            }
        })
        .catch(error => console.error('Game move failed: ', error))
        .finally(() => {
            this._unlockMove();
            if (bonusMoveAvailable) {
                this._play();
            }
        });
    }
}

export default AppController;
