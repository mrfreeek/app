import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(12, 12);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    // Walls
    const wallGeometry = new THREE.BoxGeometry(12, 4, 0.1);
    const wallTexture = new THREE.TextureLoader().load('path/to/wall_texture.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 1);
    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

    const leftWallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWallMesh.position.set(-6, 2, 0);
    scene.add(leftWallMesh);

    const rightWallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWallMesh.position.set(6, 2, 0);
    scene.add(rightWallMesh);

    const backWallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    backWallMesh.position.set(0, 2, -6);
    scene.add(backWallMesh);

    // Table
    const loader = new GLTFLoader();
    loader.load('Planet/table/scene.gltf', function (gltf) {
      const tableModel = gltf.scene;
      tableModel.position.set(0, 1, 0);
      scene.add(tableModel);
    });

    // Square Geometry
    const squareGeometry = new THREE.BoxGeometry(4, 4, 0.1);
    const squareMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
    squareMesh.position.set(0, 2, 0);
    scene.add(squareMesh);

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Camera setup
    camera.position.set(0, 15, 0);
    camera.rotation.x = -Math.PI / 4;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div ref={sceneRef}></div>
  );
};

export default ThreeScene;
