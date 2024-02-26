import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.insertBefore(renderer.domElement, document.body.firstChild); // Render behind other content

// Create particle system with spheres
const particleSystem1 = createSphereParticleSystem();
scene.add(particleSystem1);

// Create particle system with cubes (representing computer parts)
const particleSystem2 = createBoxParticleSystem();
scene.add(particleSystem2);

// Function to create particle system with spheres
function createSphereParticleSystem() {
  const particleSystem = new THREE.Group();
  const numParticles = 350;

  for (let i = 0; i < numParticles; i++) {
    const radius = Math.random() * 2 + 1;
    const geometry = new THREE.SphereGeometry(radius, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: getRandomBlue() });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
    particleSystem.add(particle);
  }

  return particleSystem;
}

// Function to create particle system with cubes
function createBoxParticleSystem() {
  const particleSystem = new THREE.Group();
  const numParticles = 1000;

  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); // Each particle will be a small cube
  
  for (let i = 0; i < numParticles; i++) {
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    particleSystem.add(particle);
  }

  return particleSystem;
}

// Function to get random light blue color
function getRandomBlue() {
  return new THREE.Color(0xadd8e6); // Light blue color
}

// Function to get random color
function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}

// Track mouse movement
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  camera.position.x = mouse.x * 50;
  camera.position.y = mouse.y * 50;

  camera.lookAt(scene.position);
}

window.addEventListener('mousemove', onMouseMove, false);

// Render loop
function animate() {
  requestAnimationFrame(animate);

  particleSystem1.rotation.x += 0.001;
  particleSystem1.rotation.y += 0.001;

  particleSystem2.rotation.x += 0.01;
  particleSystem2.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();


