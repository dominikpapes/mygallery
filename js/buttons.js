const videoElement = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture-btn");
const galleryContainer = document.getElementById("gallery-container");
const bell = document.getElementById("bell-container");

function getRandomPhotoCompliment() {
	const compliments = [
		"Wow! You were born to be in front of the camera! 📸",
		"Natural model alert! You’re absolutely glowing! ✨",
		"That confidence? Unmatched. Keep snapping! 🔥",
		"You make every shot look like a professional photoshoot! 📷",
		"Your smile just made my day! Keep shining! 😍",
		"Seriously, is there a bad angle of you? I doubt it! 😉",
		"You bring life to every picture! Such a natural! 🌟",
		"Every photo of you is pure magic! ✨",
		"Camera loves you, and honestly, same! ❤️",
		"You could be on the cover of a magazine! Keep posing! 🏆"
	];

	const randomIndex = Math.floor(Math.random() * compliments.length);
	return compliments[randomIndex];
}


// funkcija za pokretanje kamere
async function startCamera() {
	// graceful degradation
	// pretpostavlja se da preglednik ima sve mogucnosti
	// ako nema postoji rjesenje i aplikacija nastavlja funkcionirati
	if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
		alert("Camera access is not supported in this browser.");
		return;
	}

	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		videoElement.srcObject = stream; // set the video source

		captureButton.style.display = "flex"; // show capture button only if allowed
	} catch (error) {
		alert("Could not access the camera. Please check permissions.");
	}
}

// fotografiraj
captureButton.addEventListener("click", () => {
	const context = canvas.getContext("2d");
	canvas.width = videoElement.videoWidth;
	canvas.height = videoElement.videoHeight;
	context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

	const imageSrc = canvas.toDataURL("image/png");

	// stvori novi img element
	const newImg = document.createElement("img");
	newImg.src = imageSrc;
	newImg.width = "320";
	newImg.height = "240";
	newImg.alt = "Captured Photo";
	newImg.classList.add("card--avatar");

	// stvori novi div element - roditelj img elementa
	const newImgDiv = document.createElement("div");
	newImgDiv.classList.add("card");
	newImgDiv.appendChild(newImg);

	// dodaj novi div i njegovo dijete galeriji
	galleryContainer.appendChild(newImgDiv);

	// provjeri jesu li notifikacije podrzane -- progressive enhancement
	if ("Notification" in window) {
		// provjeri jesu li notifikacije dozvoljene
		if (Notification.permission === "granted") {
			new Notification("You captured an image!", {
				body: getRandomPhotoCompliment(),
				icon: "/images/icons/icon-512x512.png",
			});
		} else {
			console.log("Notifications are not allowed.");
		}
	} else {
		console.log("Notifications are not supported in this browser.");
	}
});

// dopusti notifikacije
bell.addEventListener("click", () => {
	// provjeri jesu li notifikacije podrzane -- progressive enhancement
	if ("Notification" in window) {
		if (Notification.permission !== "granted") {
			Notification.requestPermission().then(function (permission) {
				console.log(permission);
			});
		}
	} else {
		console.log("Notifications are not supported in this browser.");
	}
});

startCamera();
