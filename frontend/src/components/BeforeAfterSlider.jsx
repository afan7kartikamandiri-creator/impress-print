import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = ({ before, after, beforeLabel = 'Sebelum', afterLabel = 'Sesudah' }) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden select-none cursor-ew-resize bg-black"
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      data-testid="before-after-slider"
    >
      {/* After Image (full width, background) */}
      <div className="absolute inset-0">
        <img src={after} alt="After" className="w-full h-full object-cover pointer-events-none" draggable="false" />
      </div>

      {/* Before Image (clipped by position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: `${containerRef.current?.offsetWidth || 1000}px` }}
        >
          <img src={before} alt="Before" className="w-full h-full object-cover pointer-events-none" draggable="false" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/70 backdrop-blur-md border border-white/20">
        <span className="text-white text-xs tracking-[0.25em] uppercase">{beforeLabel}</span>
      </div>
      <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-[#D4AF37] border border-[#D4AF37]">
        <span className="text-black text-xs tracking-[0.25em] uppercase font-semibold">{afterLabel}</span>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none z-20 shadow-[0_0_20px_rgba(212,175,55,0.6)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-2xl ring-4 ring-black/40">
          <div className="flex items-center gap-0.5">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1L7 7L1 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Hint text */}
      {position > 40 && position < 60 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-md text-white text-xs tracking-[0.25em] uppercase z-10"
        >
          ← Geser →
        </motion.div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
