const staticMyGallery = "my-gallery-site-v1";
const assets = [
	"/",
	"/index.html",
	"/css/style.css",
	"/js/app.js",
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

self.addEventListener("fetch", (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);
});

self.addEventListener("sync", (event) => {
	if (event.tag === "syncData") {
		event.waitUntil(syncOfflineData());
	}
});
