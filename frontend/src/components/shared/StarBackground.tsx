import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useTheme } from '../../lib/hooks/use-theme';
import * as THREE from 'three';

// StarField component that will be used in the 3D scene
const StarField = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const starRef = useRef<THREE.Points>(null);
  
  // Custom parameters for stars flow animation
  const starParams = useMemo(() => ({
    count: isDarkMode ? 5000 : 3500, // Fewer stars in light mode for cleaner look
    size: isDarkMode ? 0.02 : 0.016, // Slightly smaller stars in light mode
    radius: 10,
    factor: 8, 
    speed: isDarkMode ? 0.15 : 0.12, // Improved speed in light mode
    saturation: isDarkMode ? 0.8 : 0.6, // Better saturation in light mode
    fade: isDarkMode ? 1.0 : 0.8, // Better visibility in light mode
  }), [isDarkMode]);

  // Animate star positions
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * starParams.speed;
    if (starRef.current) {
      const positions = starRef.current.geometry.attributes.position;
      
      // Update each star position to create flow effect
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
          // Apply flowing movement pattern - adjusted for theme
        const zSpeed = isDarkMode ? 0.05 : 0.06; // Slightly faster z-movement in light mode
        positions.setZ(i, (z + time * zSpeed) % starParams.radius - starParams.radius / 2);
        
        // Add enhanced wave pattern - more pronounced in light mode
        const waveAmplitude = isDarkMode ? 0.05 : 0.07;
        const waveFrequency = isDarkMode ? 0.5 : 0.4;
        const waveX = Math.sin(y * waveFrequency + time) * waveAmplitude;
        const waveY = Math.cos(x * waveFrequency + time) * waveAmplitude;
        positions.setX(i, x + waveX);
        positions.setY(i, y + waveY);
      }
      
      positions.needsUpdate = true;
    }
  });
  // Star points for the particles
  const points = useMemo(() => {
    const vertices = [];
    // Generate random star positions with distribution based on theme
    for (let i = 0; i < starParams.count; i++) {
      const r = starParams.radius;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((2 * Math.random()) - 1);
      
      // In light mode, adjust the distribution to create visual clusters
      // This creates a more elegant, professional star field in light mode
      let x, y, z;
      if (!isDarkMode && Math.random() > 0.7) {
        // Create some star clusters for light mode
        const clusterCenterX = (Math.random() - 0.5) * r * 1.5;
        const clusterCenterY = (Math.random() - 0.5) * r * 1.5;
        const clusterCenterZ = (Math.random() - 0.5) * r * 1.5;
        const distFromCenter = Math.random() * r * 0.15; // Small distance for clustering
        
        x = clusterCenterX + (Math.random() - 0.5) * distFromCenter;
        y = clusterCenterY + (Math.random() - 0.5) * distFromCenter;
        z = clusterCenterZ + (Math.random() - 0.5) * distFromCenter;
      } else {
        // Regular distribution
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * Math.random();
      }
      
      vertices.push(x, y, z);
    }
    return new Float32Array(vertices);
  }, [starParams.count, starParams.radius, isDarkMode]);

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>      <pointsMaterial
        size={starParams.size}
        sizeAttenuation={true}
        transparent
        opacity={starParams.fade}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={isDarkMode ? '#ffffff' : '#6f7cff'} // More vibrant blue tone for light mode
      />
    </points>
  );
};

// Additional ambient stars using drei Stars component
const AmbientStars = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  return (
    <Stars
      radius={50}
      depth={50}
      count={isDarkMode ? 3000 : 2000} // More stars in light mode
      factor={isDarkMode ? 4 : 3.2} // Enhanced factor for light mode
      saturation={isDarkMode ? 0.6 : 0.4} // Better saturation in light mode
      fade={true}
      speed={0.5}
    />
  );
};

// Main 3D background component
const StarBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="absolute inset-0 z-0">      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(to bottom, #0a0a24, #181830)' 
            : 'linear-gradient(to bottom, #e8eeff, #f5f8ff, #ffffff)' // More sophisticated gradient for light mode
        }}
        dpr={[1, 2]}
      >
        {/* Custom stars with flow effect */}
        <StarField />
        
        {/* Additional ambient stars */}
        <AmbientStars />
          {/* Ambient light based on theme */}
        <ambientLight intensity={isDarkMode ? 0.1 : 0.4} />
        
        {/* Add subtle directional light for shimmer effect in light mode */}
        {!isDarkMode && (
          <>
            <directionalLight position={[5, 5, 5]} intensity={0.2} color="#a0b8ff" />
            <pointLight position={[-5, -5, -5]} intensity={0.15} color="#e1e9ff" />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default StarBackground;
