import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Layers, ShieldCheck } from 'lucide-react';
import MotionGraphic3DObject from './MotionGraphic3DObject.tsx';

interface SitePreloaderProps {
  onComplete: () => void;
  key?: React.Key;
}

const LOGS = [
  "INITIALIZING 3D MATRIX CANVAS...",
  "CONNECTING BOSS AI SPECIALIST AGENTS...",
  "OPTIMIZING META PERFORMANCE PIPELINE...",
  "LOADING LUXURY VISUAL ASSETS...",
  "THE BOSS MARKETERS ENGINE READY."
];

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 4;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setLogIndex(0);
    else if (progress < 50) setLogIndex(1);
    else if (progress < 75) setLogIndex(2);
    else if (progress < 95) setLogIndex(3);
    else setLogIndex(4);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-between p-8 font-mono overflow-hidden select-none"
    >
      {/* Subtle Background Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/60 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Header info */}
      <div className="w-full max-w-5xl flex justify-between items-center relative z-10 text-xs text-white/50 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white animate-spin" />
          <span>THE BOSS MARKETERS SYSTEM</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono">
          <Cpu className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>KARACHI HQ // 3D V3.0</span>
        </div>
      </div>

      {/* Central 3D Visual & Counter */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-8 text-center max-w-xl w-full">
        {/* 3D Wireframe Graphic Object */}
        <div className="w-48 h-48 sm:w-64 sm:h-64 relative flex items-center justify-center">
          <MotionGraphic3DObject type="cube" title="" badge="" />
          {/* Circular Orbit Ring */}
          <div className="absolute inset-0 border border-white/20 rounded-full animate-spin [animation-duration:12s]" />
          <div className="absolute inset-4 border border-dashed border-white/10 rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse]" />
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white/40 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            THE BOSS MARKETERS
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-mono">
            3D DIGITAL DOMINANCE ENGINE
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-3 px-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-white/60 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
              {LOGS[logIndex]}
            </span>
            <span className="text-white font-bold font-mono text-sm">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
            <motion.div
              className="h-full bg-white rounded-full shadow-[0_0_15px_#fff]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status bar */}
      <div className="w-full max-w-5xl flex justify-between items-center relative z-10 text-[10px] text-white/40 uppercase tracking-widest border-t border-white/10 pt-4 font-mono">
        <span>STATUS: {progress < 100 ? 'LOADING MODULES...' : 'SYSTEM LAUNCHED'}</span>
        <span className="flex items-center gap-1.5 text-white">
          <ShieldCheck className="w-3.5 h-3.5 text-white" /> VERIFIED ENVIRONMENT
        </span>
      </div>
    </motion.div>
  );
}
