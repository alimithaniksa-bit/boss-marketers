import React, { useEffect, useRef } from 'react';

interface Motion3DCanvasProps {
  interactive?: boolean;
  className?: string;
  variant?: 'grid' | 'wireframe-orb' | 'particles-3d' | 'full-bg';
}

export default function Motion3DCanvas({
  className = '',
  variant = 'full-bg'
}: Motion3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D perspective orientation
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Particles setup
    const numParticles = variant === 'wireframe-orb' ? 80 : 120;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      alpha: number;
    }> = [];

    // Create 3D points in space or sphere
    for (let i = 0; i < numParticles; i++) {
      if (variant === 'wireframe-orb') {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 180 + Math.random() * 20;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        particles.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          vz: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.6 + 0.4
        });
      } else {
        const x = (Math.random() - 0.5) * 1200;
        const y = (Math.random() - 0.5) * 1200;
        const z = (Math.random() - 0.5) * 1000;
        particles.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2.5 + 1,
          alpha: Math.random() * 0.5 + 0.2
        });
      }
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      // Ease mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      angleX += 0.003 + mouseY * 0.005;
      angleY += 0.005 + mouseX * 0.005;

      ctx.clearRect(0, 0, width, height);

      const focalLength = 500;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw 3D Grid floor if variant is full-bg or grid
      if (variant === 'full-bg' || variant === 'grid') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;

        const gridRows = 16;
        const gridCols = 16;
        const spacing = 70;
        const scrollY = window.scrollY * 0.3;

        for (let i = -gridRows; i <= gridRows; i++) {
          ctx.beginPath();
          for (let j = -gridCols; j <= gridCols; j++) {
            const worldX = j * spacing;
            const worldY = 300; // grid height offset
            const worldZ = (i * spacing + (scrollY % spacing)) + 200;

            // 3D Rotation transform
            const cosX = Math.cos(0.4 + mouseY * 0.1);
            const sinX = Math.sin(0.4 + mouseY * 0.1);
            const cosY = Math.cos(mouseX * 0.1);
            const sinY = Math.sin(mouseX * 0.1);

            let rx = worldX * cosY - worldZ * sinY;
            let rz = worldX * sinY + worldZ * cosY;
            let ry = worldY * cosX - rz * sinX;
            rz = worldY * sinX + rz * cosX;

            if (rz + focalLength > 10) {
              const scale = focalLength / (focalLength + rz);
              const px = centerX + rx * scale;
              const py = centerY + ry * scale;

              if (j === -gridCols) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }
      }

      // Project 3D Particles & Nodes
      const projected: Array<{ px: number; py: number; scale: number; p: typeof particles[0] }> = [];

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Animate particles slowly
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > 600) p.vx *= -1;
        if (Math.abs(p.y) > 600) p.vy *= -1;
        if (Math.abs(p.z) > 500) p.vz *= -1;

        // 3D Matrix Rotation
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;
        let ry = p.y * cosX - rz * sinX;
        rz = p.y * sinX + rz * cosX;

        const zDepth = rz + 600;
        if (zDepth > 10) {
          const scale = focalLength / zDepth;
          const px = centerX + rx * scale;
          const py = centerY + ry * scale;
          projected.push({ px, py, scale, p });
        }
      }

      // Render connecting lines between close 3D points
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = variant === 'wireframe-orb' ? 80 : 100;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.25 * Math.min(p1.p.alpha, p2.p.alpha);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      for (let i = 0; i < projected.length; i++) {
        const { px, py, scale, p } = projected[i];
        const pointSize = p.size * scale;
        const alpha = Math.min(1, Math.max(0.05, p.alpha * scale));

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, pointSize), 0, Math.PI * 2);
        ctx.fill();

        // Glowing core
        if (scale > 0.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(px, py, pointSize * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none block ${className}`}
    />
  );
}
