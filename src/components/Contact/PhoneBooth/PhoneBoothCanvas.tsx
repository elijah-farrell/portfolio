import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Html, useProgress, useGLTF } from '@react-three/drei';
import { useState, useEffect, Suspense } from 'react';
import PhoneBooth from './PhoneBooth';

// Canvas Loader Component
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: '#f1f1f1',
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

// PhoneBooth Canvas Component
const PhoneBoothCanvas = ({ currentColor = '#3B82F6' }: { currentColor?: string }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSmallMobile, setIsSmallMobile] = useState<boolean>(false);
  const [isMediumMobile, setIsMediumMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const is640px = window.innerWidth <= 640;
      const is500px = window.innerWidth <= 500;
      const is450px = window.innerWidth <= 450;
      
      setIsMediumMobile(is640px);
      setIsMobile(is500px);
      setIsSmallMobile(is450px);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return (() => window.removeEventListener('resize', checkMobile));
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <PhoneBooth 
          isMobile={isMobile} 
          isSmallMobile={isSmallMobile} 
          isMediumMobile={isMediumMobile}
          currentColor={currentColor}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default PhoneBoothCanvas; 