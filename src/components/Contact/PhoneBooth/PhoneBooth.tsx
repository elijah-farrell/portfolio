import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface PhoneBoothProps {
  isMobile?: boolean;
  isSmallMobile?: boolean;
  isMediumMobile?: boolean;
  currentColor?: string;
}

const PhoneBooth: React.FC<PhoneBoothProps> = ({ 
  isMobile = false, 
  isSmallMobile = false, 
  isMediumMobile = false,
  currentColor = '#3B82F6' // Default blue if no color provided
}) => {
  // Load the phone booth model
  const phoneBooth = useGLTF('/phone_booth/scene.gltf');
  
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Determine scale and position based on mobile and height
  // Phone booth model appears to be quite large, so we'll scale it down appropriately
  let scale = 0.4;
  let position = [0.5, -1.9, 0]; // Moved a bit to the right and lower to center with the descriptive text
  
  if (isSmallMobile) {
    scale = 0.25;
    position = [0.3, -1.2, 0];
  } else if (isMobile) {
    scale = 0.3;
    position = [0.4, -1.5, 0];
  } else if (isMediumMobile) {
    scale = 0.35;
    position = [0.45, -1.6, 0];
  }

  return (
    <mesh ref={meshRef}>
      {/* Subtle ambient lighting to preserve model's original lighting */}
      <hemisphereLight intensity={0.4} groundColor="black" />
      
      {/* Super intense theme-colored accent lighting from multiple angles */}
      <pointLight 
        intensity={12.5} 
        position={[2, 2, 2]} 
        color={currentColor}
        distance={8}
      />
      <pointLight 
        intensity={12.5} 
        position={[-2, 2, 2]} 
        color={currentColor}
        distance={8}
      />
      <pointLight 
        intensity={12.5} 
        position={[2, 2, -2]} 
        color={currentColor}
        distance={8}
      />
      <pointLight 
        intensity={12.5} 
        position={[-2, 2, -2]} 
        color={currentColor}
        distance={8}
      />
      
      <primitive
        object={phoneBooth.scene}
        scale={scale}
        position={position}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

export default PhoneBooth; 