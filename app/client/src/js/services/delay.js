/**
 * Returns a delayed promise
 * @param {Number} duration in ms
 * @return {Promise<void>} promise to
 * delay execution
 */
function delay(duration) {
    return new Promise(res => setTimeout(res, duration));
}

export default delay;
