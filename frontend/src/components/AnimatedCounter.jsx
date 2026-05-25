import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ value, suffix = '', duration = 2500, label, description }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * endValue);
      setCount(current);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [inView, value, duration]);

  const formatted = count.toLocaleString('id-ID');

  return (
    <div ref={ref} className="text-center md:text-left" data-testid={`stat-${label?.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="flex items-baseline gap-1 mb-2 justify-center md:justify-start">
        <span className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-gold-gradient leading-none tracking-tight">
          {formatted}
        </span>
        <span className="font-serif text-4xl md:text-5xl text-gold-gradient">{suffix}</span>
      </div>
      <div className="font-serif text-lg text-white mb-1">{label}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/40">{description}</div>
    </div>
  );
};

export default AnimatedCounter;
