// src/components/ModelViewer.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { trpc } from '../utils/trpc';

const ModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const imageGroup = new THREE.Group();
 // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //const { data: images, isLoading } = trpc.image.list.useQuery();

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current?.appendChild(renderer.domElement);
    //const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 500;
    scene.add(imageGroup);

    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      imageGroup.rotation.y += 0.001;
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const onWindowResize = () => {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelViewer;
