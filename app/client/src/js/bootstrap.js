import AppController from './app.js';
import GameService from './services/game.js';
import Selectors from './services/selectors.js';
import GameModel from './models/game.js';
import Random from './services/random.js';

/**
 * Bootstraps the game
 * @return {Object} application controller instance
 */
function bootstrap() {
    return new AppController(
        new GameModel(Selectors, Random),
        new GameService('/api/game')
    );
}

export default bootstrap;
