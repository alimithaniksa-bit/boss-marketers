import React, { useEffect, useRef } from 'react';

interface MotionGraphic3DObjectProps {
  type?: 'cube' | 'orb' | 'pyramid' | 'matrix';
  title?: string;
  badge?: string;
  className?: string;
}

export default function MotionGraphic3DObject({
  type = 'cube',
  title = '3D IMMERSIVE CORE',
  badge = 'BOSS AI REALTIME',
  className = ''
}: MotionGraphic3DObjectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Geometry definitions
    // 1. Cube Vertices
    const cubeVertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
    ];
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    // Inner nested cube for dual 3D rotation
    const innerCubeVertices = cubeVertices.map(v => [v[0] * 0.5, v[1] * 0.5, v[2] * 0.5]);

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotX += 0.008 + mouseY * 0.02;
      rotY += 0.012 + mouseX * 0.02;
      rotZ += 0.005;

      const scaleFactor = Math.min(width, height) * 0.28;
      const cx = width / 2;
      const cy = height / 2;

      // Project vertices helper
      const project = (v: number[], rX: number, rY: number, rZ: number, scale: number = scaleFactor) => {
        let [x, y, z] = v;

        // Rotate X
        let cos = Math.cos(rX), sin = Math.sin(rX);
        let y1 = y * cos - z * sin;
        let z1 = y * sin + z * cos;

        // Rotate Y
        cos = Math.cos(rY); sin = Math.sin(rY);
        let x2 = x * cos + z1 * sin;
        let z2 = -x * sin + z1 * cos;

        // Rotate Z
        cos = Math.cos(rZ); sin = Math.sin(rZ);
        let x3 = x2 * cos - y1 * sin;
        let y3 = x2 * sin + y1 * cos;

        const distance = 4;
        const perspective = distance / (distance - z2);

        return {
          px: cx + x3 * scale * perspective,
          py: cy + y3 * scale * perspective,
          z: z2,
          perspective
        };
      };

      // Outer Glowing Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(width, height) * 0.42, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsating Orbit Ring
      const orbitTime = Date.now() * 0.001;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(orbitTime * 0.4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.ellipse(0, 0, scaleFactor * 1.5, scaleFactor * 0.6, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw Outer 3D Wireframe Cube
      const projectedOuter = cubeVertices.map(v => project(v, rotX, rotY, rotZ));

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 12;

      cubeEdges.forEach(([i, j]) => {
        const p1 = projectedOuter[i];
        const p2 = projectedOuter[j];
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Draw Inner Counter-Rotating 3D Cube
      const projectedInner = innerCubeVertices.map(v => project(v, -rotX * 1.5, -rotY * 1.5, -rotZ * 1.5));
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 4;

      cubeEdges.forEach(([i, j]) => {
        const p1 = projectedInner[i];
        const p2 = projectedInner[j];
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      // Draw Corner Vertices Glow Points
      projectedOuter.forEach(p => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3.5 * p.perspective, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [type]);

  return (
    <div className={`relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-3xl bg-neutral-950/80 border border-white/10 shadow-2xl ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Dynamic 3D Overlay Badge */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          {badge}
        </span>
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] animate-ping" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center pointer-events-none">
        <div>
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">3D Dynamic Matrix</span>
          <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">{title}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block">Status</span>
          <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">60 FPS Rendered</span>
        </div>
      </div>
    </div>
  );
}
