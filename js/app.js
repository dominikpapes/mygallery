const container = document.querySelector(".container");

function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", function () {
			navigator.serviceWorker
				.register("/serviceWorker.js")
				.then((res) => console.log("Service worker registered."))
				.catch((err) => console.log("Service worker not registered.", err));
		});
	} else {
		console.error("Service workers are not supported in this browser.");
	}
}

// funkcija za pokretanje pozadinske sinkronizacije
function triggerSync() {
	// provjeri je li service worker podrzan -- progressive enhancement
	if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
		navigator.serviceWorker.ready.then((registration) => {
			// registriraj sync event s tagom syncData
			registration.sync
				.register("syncData")
				.then(() => {
					console.log("Going offline registered!");
				})
				.catch((err) => {
					console.error("Background sync failed:", err);
				});
		});
	}
}

registerServiceWorker();

window.addEventListener("offline", triggerSync);

