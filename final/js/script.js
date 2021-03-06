// import three.js module and GLTFLoader from "three" folder
// to run three.js and use the GLTFLoader for cookie model
import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

const html = document.documentElement; // create a reference for the whole webpage

const renderer = new THREE.WebGLRenderer(); // create renderer
renderer.setSize(window.innerWidth, window.innerHeight); // set size to window/viewport width/height
document.body.appendChild(renderer.domElement); // add renderer to webpage
let canvas = renderer.domElement; // create a reference for the HTML canvas element generated by the renderer

const scene = new THREE.Scene(); // create scene
scene.background = new THREE.Color(0xC9B859); // set scene's background color

const light = new THREE.DirectionalLight(0xFFFFFF, 1.4); // create a white directional light on the cookie (at 140% intensity)
light.position.set(0.2, 1, 1); // offset light (x: 0.2, y: 1, z: 1)
scene.add(light); // add to scene

// create camera (fov: 40, aspect ratio: (window width)/(window height), near plane: 1, far plane: 1000)
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 8); // offset camera (x: 0, y: 0, z: 8)

let cookie; // variable to store loaded gtlf file
const frameCount = 8; // number of cookie models (or "frames" of cookie being eaten)
let cookieModel_index = 1; // index of cookie model for iteration purposes

// create and store a GLTFLoader with path set to ('./assets/3d/')
const loader = new GLTFLoader().setPath('./assets/3d/');

// animation function
function animate() {
	if (cookieModel_index <= 8) {
		// enclosing `` is used to allow ${} to be used
		// toString() converts cookieModel_index to a string
		// padStart() appends a string to another string
		// padStart() first value: length of string after padding value
		// padStart() second value: string to append/pad to
		const cookieModel = `${cookieModel_index.toString().padStart(7, "cookie")}.glb`;
		loader.load(cookieModel, function(gltf) {

			cookie = gltf.scene; // assign cookie to loaded gtlf file 
			cookie.rotateY(2.75); // rotate y-axis of cookie model
			scene.add(cookie); // add loaded gtlf file to scene

		}, undefined, function(error) { // callback/error function

			console.error(error); // console.error the specfic error

		} );
	} else {
		scene.remove.apply(scene, scene.children); // clear scene when the user reaches the very bottom
	}

	requestAnimationFrame(animate); // allows canvas to stop running if webpage tab is inactive
	renderer.render(scene, camera); // render everything
}

animate(); // script loops through this function call

window.addEventListener('scroll', () => {
	const scrollTop = html.scrollTop; // how many pixels scrolled from the top of the webpage

	// total distance user is able to scoll down; subtraction exludes the window/viewport height
	const maxScrollTop = html.scrollHeight - window.innerHeight;
	
	const scrollProgress = scrollTop / maxScrollTop; // current pixels scrolled out of the total pixel distance user can scroll down

	// frameIndex is the lowest number between frameCount and Math.floor(scrollProgress * frameCount)
	const frameIndex = Math.min(
		frameCount,
		Math.floor(scrollProgress * frameCount) // value of (scrollProgress * frameCount) rounded down to the largest integer
	);

	// while scrolling, make another requestAnimationFrame() call which calls updateCookie()
	requestAnimationFrame(() => updateCookie(frameIndex + 1)); 
});

const updateCookie = index => {
	cookieModel_index = index; // increment cookieModel_index
	scene.remove.apply(scene, scene.children); // clear scene
	scene.add(light); // add light to scene again (removed in previous line)
	
	switch (cookieModel_index) {
		// each case/divided scroll level/cookie eating stage plays a different sound
		case 2:
			document.getElementById("minecraft_1").play();
			break;
		case 3:
			document.getElementById("minecraft_2").play();
			break;
		case 4:
			document.getElementById("minecraft_3").play();
			break;
		case 5:
			document.getElementById("minecraft_4").play();
			break;
		case 6:
			document.getElementById("minecraft_5").play();
			break;
		case 7:
			document.getElementById("minecraft_6").play();
			break;
		case 8:
			document.getElementById("minecraft_7").play();
			break;
		case 9: // when the user scrolls to the very bottom
			document.getElementById("cookie_monster").play(); // play Cookie Monster audio clip
			break;
	}

	if (cookieModel_index != 9) {
		// in case the user scrolls back up, hide the cookie links and container while also reshowing the canvas (i.e. the cookie) 
		document.getElementById("cookie_link_container").style.display = "none";
		canvas.style.display = "block";
	} else {
		// when the user scrolls to the very bottom
		document.getElementById("cookie_link_container").style.display = "flex"; // changes display from none to flex
		canvas.style.display = "none"; // changes display from block to none
	}
}