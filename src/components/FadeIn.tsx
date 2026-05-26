'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;        // ms — para stagger en grids
  duration?: number;     // ms
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  className = '',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = {
    up:    'opacity-0 translate-y-8',
    left:  'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    none:  'opacity-0',
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
      className={`transition-all ease-out ${visible ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
