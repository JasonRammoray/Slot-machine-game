/**
 * Encapsulates online behaviour
 */
class OfflineBehaviour {
    constructor() {
        this._isInitialized = false;
    }
    /**
     * Checks if application is running offline or not
     * @return {Boolean} flag indicating if internet connection
     * is available
     */
    static isOnline() {
        return navigator.onLine;
    }
    start() {
        if (!navigator.serviceWorker) {
            return console.info('Service workers are not supported');
        }
        if (this._isInitialized) {
            return console.warn('Offline mode has already been initialized');
        }
        this._isInitialized = true;

        function networkChangeHandler() {
            const offlineCssClass = 'app-offline';
            if (OfflineBehaviour.isOnline()) {
                document.documentElement.classList.remove(offlineCssClass);
            } else {
                document.documentElement.classList.add(offlineCssClass);
            }
        }

        window.addEventListener('online', networkChangeHandler);
        window.addEventListener('offline', networkChangeHandler);
        // Call handler right away to set a correct css class
        networkChangeHandler();

        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/slot-machine-game-service-worker.js', {
                scope: '/'
            })
            .then(reg => console.log('Service worker is active in a scope of: ', reg.scope))
            .catch(err => console.error('Unable to register a service worker: ', err));
        });
    }
}

export default OfflineBehaviour;
