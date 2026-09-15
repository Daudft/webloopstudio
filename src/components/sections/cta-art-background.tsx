'use client';

import { useEffect, useRef } from 'react';

/** Vertical space between ridge lines (CSS px). */
const LINE_SPACING = 13;
/** Horizontal resolution of each line (CSS px per point). */
const POINT_STEP = 6;
/** Background the ridges are filled with, so nearer lines hide the ones behind. */
const INK = '#131315';

/**
 * Generative "ridge lines" artwork for the closing CTA.
 *
 * Dozens of horizontal lines, drawn back to front. Each one rises into soft
 * peaks around the centre, shaped by layered sine waves that drift over time,
 * and is filled with the background colour underneath so nearer ridges hide
 * the ones behind them. Lines fade out towards the edges. Pauses while
 * off-screen; reduced-motion users get a single still frame.
 */
export function CtaArtBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let stroke: CanvasGradient | null = null;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Lines are brightest in the middle and vanish at the sides.
      stroke = context.createLinearGradient(0, 0, width, 0);
      stroke.addColorStop(0, 'rgba(234, 242, 255, 0)');
      stroke.addColorStop(0.25, 'rgba(169, 200, 234, 0.35)');
      stroke.addColorStop(0.5, 'rgba(234, 242, 255, 0.9)');
      stroke.addColorStop(0.75, 'rgba(169, 200, 234, 0.35)');
      stroke.addColorStop(1, 'rgba(234, 242, 255, 0)');
    };

    const draw = (time: number) => {
      const t = (time - start) / 1000;
      context.clearRect(0, 0, width, height);

      const lines = Math.ceil(height / LINE_SPACING) + 4;
      const centre = width / 2;
      const spread = Math.max(width * 0.2, 220);
      const amplitude = LINE_SPACING * 9;

      context.lineWidth = 1;
      context.lineJoin = 'round';

      for (let i = 0; i < lines; i++) {
        const baseY = (i - 2) * LINE_SPACING + LINE_SPACING * 6;
        context.beginPath();

        for (let x = -POINT_STEP; x <= width + POINT_STEP; x += POINT_STEP) {
          const distance = (x - centre) / spread;
          const envelope = Math.exp(-distance * distance);
          const wave =
            Math.sin(x * 0.011 + i * 0.9 + t * 0.35) * 0.45 +
            Math.sin(x * 0.027 - i * 0.55 + t * 0.6) * 0.3 +
            Math.sin(x * 0.053 + i * 1.7 - t * 0.25) * 0.25;
          const lift = envelope * amplitude * (0.55 + 0.45 * wave) * (0.6 + 0.4 * Math.sin(i * 0.31 + t * 0.2));
          const y = baseY - lift;

          if (x === -POINT_STEP) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        // Fill beneath the line so it hides the ridges behind it.
        context.lineTo(width + POINT_STEP, height + LINE_SPACING);
        context.lineTo(-POINT_STEP, height + LINE_SPACING);
        context.closePath();
        context.fillStyle = INK;
        context.fill();
        if (stroke) context.strokeStyle = stroke;
        context.stroke();
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (visible) frame = requestAnimationFrame(loop);
    };

    resize();

    if (reduceMotion) {
      draw(start + 8000);
      const onResize = () => {
        resize();
        draw(start + 8000);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(loop);
    });
    observer.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
