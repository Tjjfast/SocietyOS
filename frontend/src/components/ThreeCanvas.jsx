import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lights - Neutral White
    const ambientLight = new THREE.AmbientLight(0x222222, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(5, 5, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x404040, 0.5);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Smartphone Mockup (Group)
    const phoneGroup = new THREE.Group();

    // Phone Body - Grayscale Glass
    const phoneGeom = new THREE.BoxGeometry(2, 4, 0.15);
    const phoneMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.15,
      transmission: 0.9,
      thickness: 0.5,
    });
    const phoneBody = new THREE.Mesh(phoneGeom, phoneMat);
    phoneGroup.add(phoneBody);

    // Inner Screen Canvas - Monotone UI
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    function drawScreen() {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 512, 1024);

      // Dashboard UI
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(40, 60, 432, 160, 20);
      ctx.fill();

      // Status Pills - Grayscale
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(60, 100, 100, 30, 15);
      ctx.fill();
      ctx.fillStyle = '#404040';
      ctx.beginPath();
      ctx.roundRect(180, 100, 140, 30, 15);
      ctx.fill();

      // QR Square
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.roundRect(131, 350, 250, 250, 12);
      ctx.fill();
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(160, 380, 190, 190);
      // Simple QR lines - White
      ctx.fillStyle = 'white';
      for (let i = 0; i < 6; i++) {
        ctx.fillRect(180 + i * 25, 400, 15, 150);
        ctx.fillRect(180, 400 + i * 25, 150, 15);
      }

      // Text placeholders
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(60, 650, 392, 20);
      ctx.fillRect(60, 700, 280, 20);
    }
    drawScreen();

    const screenTexture = new THREE.CanvasTexture(canvas);
    const screenGeom = new THREE.PlaneGeometry(1.85, 3.85);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
    });
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.z = 0.08;
    phoneGroup.add(screen);

    scene.add(phoneGroup);

    // Particles - Pure White
    const particlesGeom = new THREE.BufferGeometry();
    const particlesCount = 120;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    });
    const particlesMesh = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particlesMesh);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Auto-rotate phone
      phoneGroup.rotation.y += 0.003;

      // Camera Parallax
      const targetX = mouseX * 0.3;
      const targetY = -mouseY * 0.3;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Particles motion
      const positions = particlesGeom.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.002;
      }
      particlesGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    // Responsive Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return null; // Renders into #three-canvas-container via DOM
}
