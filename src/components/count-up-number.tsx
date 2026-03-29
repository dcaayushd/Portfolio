'use client';

import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function CountUpNumber({
  value,
  prefix = '',
  suffix = '',
  className
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1]
    });

    return () => {
      controls.stop();
    };
  }, [inView, motionValue, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
