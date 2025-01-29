const staticMyGallery = "my-gallery-site-v1";
const assets = [
	"/",
	"/manifest.json",
	"/index.html",
	"/css/style.css",
	"/js/app.js",
	"/js/buttons.js",
	"/images/camera.png",
	"/images/bell.svg",
	"/images/icons/icon-512x512.png",
	"/favicon.ico",
];

// mock funkcija za sync
async function syncOfflineData() {
	console.log("Service worker: app back online, beginning background sync");

	// ovaj dio koda glumi asinkroni prijenos podataka na posluzitelj
	setTimeout(() => {
		console.log("Service worker: Background sync finished.");

		if (Notification.permission === "granted") {
			self.registration.showNotification("Background sync finished!💯", {
				body: "This is a mock background sync function. No data was actually sent.",
				icon: "/favicon.ico",
			});
		} else {
			console.log("Notifications are not allowed. Skipping notification.");
		}
	}, 3000);
}

self.addEventListener("install", (installEvent) => {
	installEvent.waitUntil(
		caches.open(staticMyGallery).then((cache) => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((key) => {
					if (key !== staticMyGallery) {
						console.log("Service Worker: Removing old cache", key);
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return (
				res ||
				fetch(fetchEvent.request).catch(() => {
					if (fetchEvent.request.destination === "document") {
						return caches.match("/index.html");
					}
					if (fetchEvent.request.destination === "image") {
						return caches.match("/images/icons/icon-512x512.png");
					}

					return new Response("Resource not available offline", {
						status: 503,
					});
				})
			);
		})
	);
});

self.addEventListener("sync", (event) => {
	if (event.tag === "syncData") {
		event.waitUntil(syncOfflineData());
	}
});
