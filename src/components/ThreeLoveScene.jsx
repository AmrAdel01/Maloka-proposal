import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createHeartShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.35);
  shape.bezierCurveTo(0, 0.6, -0.55, 0.72, -0.55, 0.22);
  shape.bezierCurveTo(-0.55, -0.1, -0.25, -0.28, 0, -0.55);
  shape.bezierCurveTo(0.25, -0.28, 0.55, -0.1, 0.55, 0.22);
  shape.bezierCurveTo(0.55, 0.72, 0, 0.6, 0, 0.35);
  return shape;
}

export function ThreeLoveScene() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 120);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.6);
    const key = new THREE.PointLight(0xffd6e0, 12, 24);
    const rim = new THREE.PointLight(0xf7d794, 8, 18);
    key.position.set(-3, 2.5, 4);
    rim.position.set(3, -1, 5);
    scene.add(ambient, key, rim);

    const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 12,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    heartGeometry.center();

    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffb6ca,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.42,
      thickness: 0.85,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      emissive: 0x4b102f,
      emissiveIntensity: 0.08,
    });

    const crystalHeart = new THREE.Mesh(heartGeometry, crystalMaterial);
    crystalHeart.scale.set(1.52, 1.52, 1.52);
    crystalHeart.rotation.x = -0.18;
    scene.add(crystalHeart);

    const haloGeometry = new THREE.TorusGeometry(1.7, 0.008, 12, 160);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xf7d794,
      transparent: true,
      opacity: 0.55,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2.5;
    scene.add(halo);

    const smallMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffd6e0,
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 0.65,
      emissive: 0x6f234c,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.84,
    });

    const floatingHearts = Array.from({ length: 34 }, (_, index) => {
      const heart = new THREE.Mesh(heartGeometry, smallMaterial.clone());
      const angle = (index / 34) * Math.PI * 2;
      const radius = 2.6 + Math.random() * 3.6;
      heart.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 5,
        -3 - Math.random() * 8,
      );
      const scale = 0.1 + Math.random() * 0.24;
      heart.scale.set(scale, scale, scale);
      heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      heart.userData = {
        speed: 0.15 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
        baseY: heart.position.y,
      };
      scene.add(heart);
      return heart;
    });

    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const i = index * 3;
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = -1 - Math.random() * 12;
      basePositions[i] = positions[i];
      basePositions[i + 1] = positions[i + 1];
      basePositions[i + 2] = positions[i + 2];
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf7d794,
      size: 0.028,
      transparent: true,
      opacity: 0.76,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -(((event.clientY - rect.top) / rect.height - 0.5) * 2),
      };
    };

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    mount.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let animationId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const mouse = mouseRef.current;

      crystalHeart.rotation.y = elapsed * 0.45 + mouse.x * 0.2;
      crystalHeart.rotation.x = -0.18 + mouse.y * 0.16;
      crystalHeart.position.y = Math.sin(elapsed * 1.1) * 0.08;
      halo.rotation.z = elapsed * 0.25;
      halo.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.025);

      floatingHearts.forEach((heart, index) => {
        heart.position.y = heart.userData.baseY + Math.sin(elapsed * heart.userData.speed + heart.userData.phase) * 0.35;
        heart.position.x += Math.sin(elapsed * 0.18 + index) * 0.0015;
        heart.rotation.x += 0.004 + index * 0.00003;
        heart.rotation.y += 0.006;
      });

      const attribute = particleGeometry.getAttribute('position');
      const array = attribute.array;
      for (let index = 0; index < particleCount; index += 1) {
        const i = index * 3;
        const depth = Math.max(0.25, Math.abs(basePositions[i + 2]) / 10);
        array[i] = basePositions[i] + mouse.x * 0.24 / depth + Math.sin(elapsed * 0.25 + index) * 0.018;
        array[i + 1] = basePositions[i + 1] + mouse.y * 0.2 / depth + Math.cos(elapsed * 0.22 + index) * 0.018;
      }
      attribute.needsUpdate = true;

      scene.rotation.y = mouse.x * 0.055;
      scene.rotation.x = mouse.y * 0.035;

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      mount.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      heartGeometry.dispose();
      crystalMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      smallMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      floatingHearts.forEach((heart) => heart.material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-auto absolute inset-0 z-10" aria-hidden="true" />;
}
