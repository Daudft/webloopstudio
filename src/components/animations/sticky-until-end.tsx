'use client';

import { useEffect, useRef, useState } from 'react';

interface StickyUntilEndProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Scrolls normally until its bottom edge reaches the bottom of the viewport,
 * then stays put so the next block can slide up and cover it.
 *
 * Works for content taller than the screen: the sticky `top` is set to
 * `viewport height - element height` (never above 0), so it pins by its bottom.
 * Requires no ancestor with overflow hidden/auto/scroll (use overflow: clip).
 */
export function StickyUntilEnd({ children, className }: StickyUntilEndProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => setTop(Math.min(0, window.innerHeight - element.offsetHeight));
    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    window.addEventListener('resize', update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ position: 'sticky', top }}>
      {children}
    </div>
  );
}
