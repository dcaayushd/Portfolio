'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!pointerQuery.matches || motionQuery.matches) {
      return;
    }

    let frame = 0;
    const update = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.style.left = `${event.clientX}px`;
        glowRef.current.style.top = `${event.clientY}px`;
      });
    };

    window.addEventListener('mousemove', update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', update);
    };
  }, []);

  return <div ref={glowRef} aria-hidden="true" className="cursor-glow" />;
}
