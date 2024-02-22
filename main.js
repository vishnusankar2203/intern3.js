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
document.body.appendChild(renderer.domElement);

// Create particle system with spheres
const particleSystem = createParticleSystem();
scene.add(particleSystem);

// Function to create particle system
function createParticleSystem() {
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

// Function to get random light blue color
function getRandomBlue() {
  return new THREE.Color(0xadd8e6); // Light blue color
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

// Handle scrolling to reveal about section
window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  const distanceToTop = aboutSection.getBoundingClientRect().top;

  if (distanceToTop < window.innerHeight / 2) {
    aboutSection.style.opacity = 1;
  } else {
    aboutSection.style.opacity = 0;
  }
});

// Render loop
function animate() {
  requestAnimationFrame(animate);

  particleSystem.rotation.x += 0.001;
  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
