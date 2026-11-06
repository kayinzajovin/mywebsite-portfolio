import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    // Check for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    if (isTouch || motionQuery.matches) {
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (isTouchDevice || reducedMotion || !position) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed z-30 transition-transform duration-75 ease-out"
      style={{
        top: position.y - 200,
        left: position.x - 200,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, rgba(30, 58, 138, 0.03) 40%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'transform',
      }}
    />
  );
};
