"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FloatingDots() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return; // Ensure the ref exists before proceeding

    const mount = mountRef.current; // Store ref value in a variable
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement); // Use stored ref variable

    // Create Floating Dots using Circle Geometry
    const particles = new THREE.Group();
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.CircleGeometry(0.05, 32); // Circular dots
      const material = new THREE.MeshBasicMaterial({
        color: 0xff00ff, // Magenta color
        transparent: true,
        opacity: 0.6,
      });

      const dot = new THREE.Mesh(geometry, material);
      dot.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      particles.add(dot);
    }

    scene.add(particles);

    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      mount.removeChild(renderer.domElement); // Use stored ref variable in cleanup
    };
  }, []);

  return <div ref={mountRef} className="floating-dots" />;
}
