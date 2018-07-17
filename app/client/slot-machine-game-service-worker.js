const CACHE_NAME = 'game-assets-cache';

const styles = [
    'reset.css',
    'style.css',
    'animations.css',
    'media.css',
    'offline.css'
].map(style => `/src/css/${style}`);

const logic = [
    'main.js',
    'bootstrap.js',
    'app.js',
    ...[
        'game.js',
        'random.js',
        'offline.js',
        'delay.js',
        'selectors.js',
        'browser.js'
    ].map(service => `services/${service}`),
    'models/game.js'
].map(logic => `/src/js/${logic}`);

const pictures = [
    'Symbol_0.png',
    'Symbol_1.png',
    'Symbol_2.png',
    'Symbol_3.png',
    'Symbol_4.png',
    'Symbol_5.png',
    'button.png',
].map(picture => `src/img/${picture}`);

const urlsToCache = [
    ...styles,
    ...logic,
    ...pictures
];

self.addEventListener('install', event => {
    const cachePromise = caches.open(CACHE_NAME)
    .then(cache => {
        console.log('Cache is opened');
        return cache.addAll(urlsToCache);
    });
    event.waitUntil(cachePromise);
});

self.addEventListener('fetch', event => {
    const fetchPromise = caches.match(event.request)
    .then(res => {
        if (res) {
            console.log('Request url: ', res.url);
            return res;
        }
        return fetch(event.request);
    });
    event.respondWith(fetchPromise);
});
