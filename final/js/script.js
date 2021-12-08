import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

const html = document.documentElement;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xC9B859);

const light = new THREE.DirectionalLight(0xFFFFFF, 1.4);
light.position.set(0.2, 1, 1);
scene.add(light);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cookie;
const frameCount = 8;
let cookieModel_index = 1;

const loader = new GLTFLoader().setPath('./assets/3d/');

function animate() {
	if (cookieModel_index <= 8) {
		const cookieModel = `${cookieModel_index.toString().padStart(7, "cookie")}.glb`;
		loader.load(cookieModel, function(gltf) {

			cookie = gltf.scene;
			cookie.rotateY(2.75);
			scene.add(cookie);

		}, undefined, function(error) {

			console.error(error);

		} );
	} else {
		scene.remove.apply(scene, scene.children);
	}

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();

window.addEventListener('scroll', () => {
	const scrollTop = html.scrollTop;
	const maxScrollTop = html.scrollHeight - window.innerHeight;
	const scrollProgress = scrollTop/maxScrollTop;

	const frameIndex = Math.min(
		frameCount,
		Math.floor(scrollProgress * frameCount)
	);

	requestAnimationFrame(() => updateCookie(frameIndex + 1));
});

const updateCookie = index => {
	cookieModel_index = index;
	scene.remove.apply(scene, scene.children);
	scene.add(light);
	
	switch (cookieModel_index) {
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
		case 9:
			// Image from https://www.pinterest.com/pin/806988826965537431/
			scene.background = new THREE.TextureLoader().load("assets/cookie_monster_fur.jpg");
			document.getElementById("cookie_monster").play();
	}
}