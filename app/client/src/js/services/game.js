/**
 * A service encapsulating communication process
 * with server side
 */
class GameService {
    /**
     * @param {String} baseUrl api base url
     */
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._isFetching = false;
    }

    /**
     * Fetches move data from a server side
     * @return {Promise<Object>} promise with game move data
     */
    makeMove() {
        if (this._isFetching) {
            return console.warn('Can not make a move. Data is still fetching');
        }
        this._isFetching = true;
        return fetch(this._baseUrl, {
            method: 'POST'
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Unable to fetch game move data: ', error);
            return Promise.reject(error);
        })
        .finally(() => this._isFetching = false);
    }
}

export default GameService;
