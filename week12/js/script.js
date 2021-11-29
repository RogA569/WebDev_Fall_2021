const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(25);
const lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
const meshMaterial = new THREE.MeshBasicMaterial({color: 0x51c3fc});

const sphere = new THREE.Mesh(geometry, meshMaterial);
sphere.add(new THREE.LineSegments(geometry, lineMaterial));

scene.add(sphere);

camera.position.z = 60;

window.addEventListener('keydown', (e) => {
	if (e.key == 1) {
		camera.position.z = 60;
	} else if (e.key == 2) {
		camera.position.z = 12.5;		
	}
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;
}

animate();