import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  key?: React.Key;
}

export default function Card3DTilt({
  children,
  className = '',
  maxTilt = 15,
  glowColor = 'rgba(255, 255, 255, 0.15)'
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card center (-1 to 1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;
    
    const rY = ((mouseX / width) - 0.5) * maxTilt * 2;
    const rX = -((mouseY / height) - 0.5) * maxTilt * 2;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({ x: xPct, y: yPct });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group perspective-1000 ${className}`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        style={{
          transformStyle: 'preserve-3d'
        }}
        className="w-full h-full relative"
      >
        {/* Glowing sheen follow */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 250px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
