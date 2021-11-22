const canvas = document.getElementById("theEnvironment");
const context = canvas.getContext("2d");
const viewport = window.visualViewport;

canvas.width = viewport.width;
canvas.height = viewport.height;

const img = new Image();
img.src = "assets/IMG_001.jpg";

img.onload = function() {
	context.drawImage(img, 0, 0, canvas.width/3.5, canvas.height*0.97);
}

document.getElementById("fragmented_comments").onclick = function overlay_on() {
	document.getElementById("atomic_overlay").style.display = "block";
	document.getElementById("explosion_sound").autoplay = true;
}