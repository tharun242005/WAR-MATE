
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Logo3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B0C10); // Darker background to match theme

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 1;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create soldier body (improved representation)
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.4, 1.5, 16);
    const uniformMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e4034, // Army green
      metalness: 0.3,
      roughness: 0.7
    });
    
    const soldierBody = new THREE.Mesh(bodyGeometry, uniformMaterial);
    soldierBody.position.y = 0;
    scene.add(soldierBody);

    // Create soldier head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a675, // Skin tone
      metalness: 0.1,
      roughness: 0.8
    });
    
    const soldierHead = new THREE.Mesh(headGeometry, headMaterial);
    soldierHead.position.y = 1.1;
    scene.add(soldierHead);

    // Create military helmet
    const helmetGeometry = new THREE.SphereGeometry(0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const helmetMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a472a, // Dark green
      metalness: 0.4,
      roughness: 0.6
    });
    
    const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
    helmet.position.y = 1.3;
    helmet.rotation.x = -0.2;
    scene.add(helmet);

    // Create badge on helmet
    const badgeGeometry = new THREE.CircleGeometry(0.1, 32);
    const badgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700, // Gold
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x996515,
      emissiveIntensity: 0.5
    });
    
    const badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
    badge.position.set(0, 1.4, 0.45);
    scene.add(badge);

    // Create shoulders
    const shoulderGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeometry, uniformMaterial);
    leftShoulder.position.set(0.6, 0.6, 0);
    scene.add(leftShoulder);
    
    const rightShoulder = new THREE.Mesh(shoulderGeometry, uniformMaterial);
    rightShoulder.position.set(-0.6, 0.6, 0);
    scene.add(rightShoulder);

    // Create arms
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
    const leftArm = new THREE.Mesh(armGeometry, uniformMaterial);
    leftArm.position.set(0.6, 0.1, 0);
    leftArm.rotation.z = 0.3;
    scene.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, uniformMaterial);
    rightArm.position.set(-0.6, 0.1, 0);
    rightArm.rotation.z = -0.3;
    scene.add(rightArm);

    // Create rifle (improved)
    const rifleBodyGeometry = new THREE.BoxGeometry(0.1, 1.2, 0.1);
    const rifleMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2d15, // Wood color
      metalness: 0.2,
      roughness: 0.8
    });
    
    const rifleBody = new THREE.Mesh(rifleBodyGeometry, rifleMaterial);
    rifleBody.position.set(-0.8, 0.3, 0.3);
    rifleBody.rotation.z = -0.2;
    scene.add(rifleBody);
    
    // Create rifle barrel
    const rifleBarrelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 16);
    const rifleBarrelMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a, // Dark metal color
      metalness: 0.8,
      roughness: 0.3
    });
    
    const rifleBarrel = new THREE.Mesh(rifleBarrelGeometry, rifleBarrelMaterial);
    rifleBarrel.rotation.x = Math.PI / 2;
    rifleBarrel.position.set(-0.8, 0.7, 0.4);
    scene.add(rifleBarrel);

    // Create Indian flag on chest
    const flagGeometry = new THREE.PlaneGeometry(0.4, 0.25);
    const flagMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    
    const flag = new THREE.Mesh(flagGeometry, flagMaterial);
    flag.position.set(0, 0.5, 0.53);
    scene.add(flag);

    // Create orange stripe for flag (Indian flag top)
    const orangeStripeGeometry = new THREE.PlaneGeometry(0.4, 0.083);
    const orangeStripeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff9933, // Saffron
      side: THREE.DoubleSide
    });
    
    const orangeStripe = new THREE.Mesh(orangeStripeGeometry, orangeStripeMaterial);
    orangeStripe.position.set(0, 0.584, 0.531);
    scene.add(orangeStripe);

    // Create green stripe for flag (Indian flag bottom)
    const greenStripeGeometry = new THREE.PlaneGeometry(0.4, 0.083);
    const greenStripeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x138808, // India green
      side: THREE.DoubleSide
    });
    
    const greenStripe = new THREE.Mesh(greenStripeGeometry, greenStripeMaterial);
    greenStripe.position.set(0, 0.417, 0.531);
    scene.add(greenStripe);

    // Create Ashoka Chakra (with spokes to make it more detailed)
    const chakraGeometry = new THREE.CircleGeometry(0.04, 32);
    const chakraMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000080, // Navy Blue
      side: THREE.DoubleSide
    });
    
    const chakra = new THREE.Mesh(chakraGeometry, chakraMaterial);
    chakra.position.set(0, 0.5, 0.532);
    scene.add(chakra);

    // Create spokes for chakra
    const createSpoke = () => {
      const spokeGeometry = new THREE.BoxGeometry(0.005, 0.06, 0.001);
      const spoke = new THREE.Mesh(spokeGeometry, chakraMaterial);
      spoke.position.set(0, 0.5, 0.533);
      return spoke;
    };

    for (let i = 0; i < 24; i++) {
      const spoke = createSpoke();
      spoke.rotation.z = (i / 24) * Math.PI * 2;
      scene.add(spoke);
    }

    // Name plate with "Field Marshal KM Cariappa"
    const textGeometry = new THREE.PlaneGeometry(1.4, 0.3);
    const textMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    
    const nameplate = new THREE.Mesh(textGeometry, textMaterial);
    nameplate.position.set(0, -1.2, 0.52);
    scene.add(nameplate);

    // Add lights with dramatic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x66FCF1, 100); // Cyan color for dramatic effect
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff9933, 60); // Saffron color for Indian flag highlight
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x138808, 60); // Green color for Indian flag highlight
    pointLight3.position.set(5, -5, 3);
    scene.add(pointLight3);

    // Animation loop with improved animation
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;

      // Gentle floating animation
      soldierBody.position.y = Math.sin(time * 0.5) * 0.05;
      soldierHead.position.y = 1.1 + Math.sin(time * 0.5) * 0.05;
      helmet.position.y = 1.3 + Math.sin(time * 0.5) * 0.05;
      badge.position.y = 1.4 + Math.sin(time * 0.5) * 0.05;
      
      // Gentle rotation
      const rotationSpeed = 0.003;
      const group = [soldierBody, soldierHead, helmet, badge, flag, orangeStripe, greenStripe, 
                     chakra, nameplate, leftShoulder, rightShoulder, leftArm, rightArm, rifleBody, rifleBarrel];
      
      group.forEach(item => {
        item.rotation.y += rotationSpeed;
      });

      // Chakra spokes rotation (faster)
      for (let i = 24; i < scene.children.length - 3; i++) {
        if (scene.children[i].type === "Mesh") {
          scene.children[i].rotation.y += rotationSpeed;
          scene.children[i].rotation.z += 0.02; // Make chakra rotate faster
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Logo3D;
