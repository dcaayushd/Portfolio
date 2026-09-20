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
    const root = document.documentElement;
    const maxTranslate = 26;
    const update = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.style.left = `${event.clientX}px`;
        glowRef.current.style.top = `${event.clientY}px`;
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        root.style.setProperty('--robot-follow-x', `${x * maxTranslate}px`);
        root.style.setProperty('--robot-follow-y', `${y * maxTranslate}px`);
      });
    };

    window.addEventListener('mousemove', update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', update);
      root.style.setProperty('--robot-follow-x', '0px');
      root.style.setProperty('--robot-follow-y', '0px');
    };
  }, []);

  return <div ref={glowRef} aria-hidden="true" className="cursor-glow" />;
}
