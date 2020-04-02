
workbox.core.setCacheNameDetails({
  prefix: 'antd-pro',
  suffix: 'v1',
});

workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerNavigationRoute('/index.html');


workbox.routing.registerRoute(/\/api\//, workbox.strategies.networkFirst());


workbox.routing.registerRoute(
  /^https:\/\/gw\.alipayobjects\.com\//,
  workbox.strategies.networkFirst(),
);
workbox.routing.registerRoute(
  /^https:\/\/cdnjs\.cloudflare\.com\//,
  workbox.strategies.networkFirst(),
);
workbox.routing.registerRoute(/\/color.less/, workbox.strategies.networkFirst());


addEventListener('message', (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () =>
          replyPort.postMessage({
            error: null,
          }),
        (error) =>
          replyPort.postMessage({
            error,
          }),
      ),
    );
  }
});
