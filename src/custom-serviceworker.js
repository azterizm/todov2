if (workbox) {
  console.log(`Workbox is loaded 🎉`);
  console.log('workbox', workbox)
} else {
  console.log(`Workbox didn't load `);
}

const { setCatchHandler, registerRoute } = workbox.routing
const { NetworkOnly, NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { precacheAndRoute, matchPrecache } = workbox.precaching
const cacheableResponse = workbox.cacheableResponse
const expiration = workbox.expiration
const backgroundSync = workbox.backgroundSync

precacheAndRoute([
  { url: 'offline.html', revision: 000 },
])

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new cacheableResponse.Plugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new cacheableResponse.Plugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new cacheableResponse.Plugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  }),
);

setCatchHandler(async ({e}) => {
  if (e.request.url === 'https://graphql.fauna.com/graphql' || e.request.destination === 'script')
    return matchPrecache('offline.html')
  else return Response.error()
})


