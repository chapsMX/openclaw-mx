'use client';

import { useEffect } from 'react';
import { trackScrollDepth } from '@/lib/analytics';

const MILESTONES = [25, 50, 75, 90];

export function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const check = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);
      for (const milestone of MILESTONES) {
        if (percent >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          check();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
