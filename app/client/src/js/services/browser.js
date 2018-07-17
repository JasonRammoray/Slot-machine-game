/**
 * Encapsulates page information
 */
class Browser {
    /**
     * Checks if application is running offline or not
     * @return {Boolean} flag indicating if internet connection
     * is available
     */
    static isOnline() {
        return navigator.onLine;
    }

    /**
     * Checks if browser supports service workers
     * @return {Boolean} flag indicating if service
     * workers are supported or not
     */
    static supportsServiceWorker() {
        return !!navigator.serviceWorker;
    }

    /**
     * Checks if page is loaded or not
     * @return {Boolean} flag indicating if page is
     * loaded with all sub resources
     */
    static isPageFullyLoaded() {
        return document.readyState === 'complete';
    }
}

export default Browser;
