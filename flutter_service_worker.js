'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "f83717cb751e724ed2fbd73f397a640e",
"assets/assets/fonts/AppIcons/AppIcons.ttf": "336760a14cea820ab7e830b606516390",
"assets/assets/fonts/Fira-Code/FiraCode-Bold.ttf": "ea734aec73e961c5814b1b403c9b90c6",
"assets/assets/fonts/Fira-Code/FiraCode-Light.ttf": "137778879005023b427be30df1f57d83",
"assets/assets/fonts/Fira-Code/FiraCode-Medium.ttf": "e613bf534959b8c52533e77ea0cee44e",
"assets/assets/fonts/Fira-Code/FiraCode-Regular.ttf": "1a77fe6d9f399212fcfcfde790ce66b2",
"assets/assets/fonts/Material/FlutterMaterialIcons.ttf": "0905618e98ffe957c86e6a2a0e9a5f35",
"assets/assets/fonts/Product-Sans/Product-Sans-Bold-Italic.ttf": "79750b1d82b2558801373d62dd7e5280",
"assets/assets/fonts/Product-Sans/Product-Sans-Bold.ttf": "dba0c688b8d5ee09a1e214aebd5d25e4",
"assets/assets/fonts/Product-Sans/Product-Sans-Italic.ttf": "e88ec18827526928e71407a24937825a",
"assets/assets/fonts/Product-Sans/Product-Sans-Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/FontManifest.json": "8091357196ed5d22d938811b715f1cd5",
"assets/fonts/AppIcons/AppIcons.ttf": "336760a14cea820ab7e830b606516390",
"assets/fonts/Fira-Code/FiraCode-Bold.ttf": "ea734aec73e961c5814b1b403c9b90c6",
"assets/fonts/Fira-Code/FiraCode-Light.ttf": "137778879005023b427be30df1f57d83",
"assets/fonts/Fira-Code/FiraCode-Medium.ttf": "e613bf534959b8c52533e77ea0cee44e",
"assets/fonts/Fira-Code/FiraCode-Regular.ttf": "1a77fe6d9f399212fcfcfde790ce66b2",
"assets/fonts/Material/FlutterMaterialIcons.ttf": "0905618e98ffe957c86e6a2a0e9a5f35",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/fonts/Product-Sans/Product-Sans-Bold-Italic.ttf": "79750b1d82b2558801373d62dd7e5280",
"assets/fonts/Product-Sans/Product-Sans-Bold.ttf": "dba0c688b8d5ee09a1e214aebd5d25e4",
"assets/fonts/Product-Sans/Product-Sans-Italic.ttf": "e88ec18827526928e71407a24937825a",
"assets/fonts/Product-Sans/Product-Sans-Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/images/logo.png": "f5fe1340b8c527bb6d3fca08db8b820e",
"assets/images/me.jpg": "03dd1d39d8dfc12e24a154890159a7af",
"assets/LICENSE": "2725a6109e8fe25b064a4ead507cafbf",
"assets/NOTICES": "aae40a3dc49a1b1d328e4ce91f10cf57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "9a62a954b81a1ad45a58b9bcea89b50b",
"index.html": "4428d5a39b9a6d4d0856d73a6e44eb85",
"/": "4428d5a39b9a6d4d0856d73a6e44eb85",
"main.dart.js": "40be0f36b61416a2c9a177c80332d89d",
"main.dart.js.deps": "2162c8138305e1208e481b78b76673f8",
"version.json": "ef34e3ffaedd9894534a747802c57071"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
