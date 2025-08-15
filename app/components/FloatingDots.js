"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingDots() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Floating Dots Setup
    const particles = new THREE.Group();
    const particleCount = 100;

    const geometry = new THREE.CircleGeometry(0.05, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < particleCount; i++) {
      const dot = new THREE.Mesh(geometry, material);
      dot.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      particles.add(dot);
    }

    scene.add(particles);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="floating-dots" aria-hidden="true" />;
}
