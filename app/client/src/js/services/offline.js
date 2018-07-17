import Browser from './browser.js';

/**
 * Encapsulates offline behaviour
 */
class OfflineBehaviour {
    /**
     * By default service worker
     * is not installed
     */
    constructor() {
        this._isSwInstalled = false;
    }


    /**
     * Toggles a css class an a document element
     * depending on the network connectivity state
     */
    static toggleOfflineCssClass() {
        const offlineCssClass = 'app-offline';
        if (Browser.isOnline()) {
            document.documentElement.classList.remove(offlineCssClass);
        } else {
            document.documentElement.classList.add(offlineCssClass);
        }
    }

    /**
     * Reacts on network changes, when browser
     * either gets connectivity or loses it
     * @private
     */
    _reactOnNetworkChange() {
        OfflineBehaviour.toggleOfflineCssClass();
        this._handleServiceWorkerInstallation();
    }

    /**
     * Installs a service worker
     * @return {void}
     * @private
     */
    _installServiceWorker() {
        if (!Browser.isOnline()) {
            return console.info('Skipping service worker, because page is offline');
        }
        navigator.serviceWorker.register('/slot-machine-game-service-worker.js', {
            scope: '/'
        })
        .then(reg => {
            console.log('Service worker is active in a scope of: ', reg.scope);
            this._isSwInstalled = true;
        })
        .catch(err => {
            console.error('Unable to register a service worker: ', err);
            this._isSwInstalled = false;
        });
    }

    /**
     * Handles service worker installation
     * @return {void}
     * @private
     */
    _handleServiceWorkerInstallation() {
        if (!Browser.supportsServiceWorker()) {
            return console.warn('Service workers are not supported');
        }
        if (this._isSwInstalled) {
            return console.info('Service worker has been already installed');
        }
        // if window is not loaded, then do it in load event
        if (!Browser.isPageFullyLoaded()) {
            window.addEventListener('load', () => this._installServiceWorker());
        } else {
            this._installServiceWorker();
        }
    }

    /**
     * Applies the offline behaviour
     * to the application instance
     */
    apply() {
        const handler = () => this._reactOnNetworkChange();
        window.addEventListener('online', handler);
        window.addEventListener('offline', handler);
        /*
         * Call network change handler right away
         * to set up a correct css class and handle
         * service worker installation
         */
        this._reactOnNetworkChange();
    }
}

export default OfflineBehaviour;
