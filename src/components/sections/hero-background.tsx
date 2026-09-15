'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Animated hero background: a slow, blurred light field printed through a
 * halftone dot screen, with a touch of film grain.
 *
 * Rendered with raw WebGL in two passes:
 *   1. The light field (domain-warped noise plus a drifting horizon band) is
 *      drawn into a texture at 1/FIELD_DOWNSCALE resolution. Linear filtering
 *      on upscale is what makes it soft and blurry, and it keeps the expensive
 *      noise math tiny.
 *   2. A full-resolution pass samples that texture, colours it, overlays a 45°
 *      dot screen whose dot size follows the local brightness, and adds grain.
 *
 * Budget: capped at 30 fps, paused when the hero is off screen or the tab is
 * hidden, a single still frame for prefers-reduced-motion, and nothing at all
 * if WebGL is unavailable (the section's CSS background shows through).
 */

export type HeroTone = 'light' | 'dark';

type RGB = [number, number, number];

interface Palette {
  /** Mid-tone of the field. */
  base: RGB;
  /** Darkest areas. */
  shade: RGB;
  /** Brightest areas (the drifting band). */
  light: RGB;
  /** Halftone dot colour. */
  ink: RGB;
  /** 0..1, how strongly dots darken the image. */
  dotStrength: number;
  /** Grain amplitude in colour units. */
  grain: number;
}

const hex = (value: string): RGB => {
  const n = parseInt(value.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const PALETTES: Record<HeroTone, Palette> = {
  // Brand ice with sky shadows: navy hero text keeps strong contrast.
  light: {
    base: hex('#eaf2ff'),
    shade: hex('#c6d6ec'),
    light: hex('#ffffff'),
    ink: hex('#0a1f44'),
    dotStrength: 0.13,
    grain: 0.03,
  },
  // Deep navy with a muted steel-blue band: ice hero text stays readable.
  dark: {
    base: hex('#0d1d3a'),
    shade: hex('#040b19'),
    light: hex('#51647f'),
    ink: hex('#01050d'),
    dotStrength: 0.5,
    grain: 0.05,
  },
};

/** Halftone pitch in CSS pixels. */
const CELL_CSS_PX = 4;
/** Light-field texture is rendered this many times smaller than the canvas. */
const FIELD_DOWNSCALE = 6;
const MAX_DPR = 1.5;
const FRAME_MS = 1000 / 30;
/** Time offset so the first frame is already an interesting composition. */
const TIME_OFFSET = 18;

const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const PRECISION = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

const HASH = /* glsl */ `
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
`;

const FIELD_SHADER = /* glsl */ `
${PRECISION}
uniform vec2 uRes;
uniform float uTime;
${HASH}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p = m * p;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  float t = uTime;

  // Domain warping: noise that pushes noise around, for slow organic drift.
  vec2 q = vec2(
    fbm(uv * 1.1 + vec2(t * 0.018, 0.0)),
    fbm(uv * 1.1 + vec2(5.2, 1.3) - vec2(0.0, t * 0.013))
  );
  vec2 r = vec2(
    fbm(uv * 0.9 + 1.8 * q + vec2(1.7, 9.2) + t * 0.010),
    fbm(uv * 0.9 + 1.8 * q + vec2(8.3, 2.8) - t * 0.008)
  );
  float n = fbm(uv * 0.7 + 1.5 * r);

  // A soft horizon of light that breathes up and down and bends with the noise.
  float y = gl_FragCoord.y / uRes.y;
  float bandY = 0.55 + 0.05 * sin(t * 0.06) + (n - 0.5) * 0.4;
  float band = exp(-pow((y - bandY) / 0.14, 2.0));
  float clouds = smoothstep(0.3, 0.85, n);

  float field = clamp(band * 0.7 + clouds * 0.5, 0.0, 1.0);
  gl_FragColor = vec4(vec3(field), 1.0);
}
`;

const COMPOSE_SHADER = /* glsl */ `
${PRECISION}
uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform float uCell;
uniform vec3 uBase;
uniform vec3 uShade;
uniform vec3 uLight;
uniform vec3 uInk;
uniform float uDotStrength;
uniform float uGrain;
${HASH}
void main() {
  vec2 frag = gl_FragCoord.xy;
  float lum = texture2D(uField, frag / uRes).r;

  // 45° halftone grid. Each dot's size comes from the field at its cell centre,
  // so dots stay round instead of smearing across brightness changes.
  const float S = 0.70710678;
  vec2 grid = mat2(S, -S, S, S) * frag / uCell;
  vec2 cellCentre = mat2(S, S, -S, S) * ((floor(grid) + 0.5) * uCell);
  float cellLum = texture2D(uField, clamp(cellCentre / uRes, 0.0, 1.0)).r;

  vec3 colour = mix(uShade, uBase, smoothstep(0.0, 0.55, lum));
  colour = mix(colour, uLight, smoothstep(0.45, 1.0, lum));

  float dist = length(fract(grid) - 0.5);
  float radius = 0.2 + 0.28 * (1.0 - cellLum);
  float aa = 0.75 / uCell;
  float dotMask = 1.0 - smoothstep(radius - aa, radius + aa, dist);
  colour = mix(colour, uInk, dotMask * uDotStrength);

  float grain = hash(frag + fract(uTime * 7.13) * vec2(131.0, 71.0)) - 0.5;
  colour += grain * uGrain;

  gl_FragColor = vec4(colour, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader compile failed: ${log}`);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, fragmentSource: string): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error('createProgram failed');
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, 'aPos');
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`program link failed: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

interface HeroBackgroundProps {
  tone?: HeroTone;
  className?: string;
}

export function HeroBackground({ tone = 'light', className }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    let fieldProgram: WebGLProgram;
    let composeProgram: WebGLProgram;
    try {
      fieldProgram = createProgram(gl, FIELD_SHADER);
      composeProgram = createProgram(gl, COMPOSE_SHADER);
    } catch (error) {
      console.warn('[hero-background] falling back to static background:', error);
      return;
    }

    const palette = PALETTES[tone];

    // One oversized triangle covers the whole viewport.
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const fieldTexture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();

    const field = {
      res: gl.getUniformLocation(fieldProgram, 'uRes'),
      time: gl.getUniformLocation(fieldProgram, 'uTime'),
    };
    const compose = {
      field: gl.getUniformLocation(composeProgram, 'uField'),
      res: gl.getUniformLocation(composeProgram, 'uRes'),
      time: gl.getUniformLocation(composeProgram, 'uTime'),
      cell: gl.getUniformLocation(composeProgram, 'uCell'),
      base: gl.getUniformLocation(composeProgram, 'uBase'),
      shade: gl.getUniformLocation(composeProgram, 'uShade'),
      light: gl.getUniformLocation(composeProgram, 'uLight'),
      ink: gl.getUniformLocation(composeProgram, 'uInk'),
      dotStrength: gl.getUniformLocation(composeProgram, 'uDotStrength'),
      grain: gl.getUniformLocation(composeProgram, 'uGrain'),
    };

    gl.useProgram(composeProgram);
    gl.uniform1i(compose.field, 0);
    gl.uniform3fv(compose.base, palette.base);
    gl.uniform3fv(compose.shade, palette.shade);
    gl.uniform3fv(compose.light, palette.light);
    gl.uniform3fv(compose.ink, palette.ink);
    gl.uniform1f(compose.dotStrength, palette.dotStrength);
    gl.uniform1f(compose.grain, palette.grain);

    let width = 0;
    let height = 0;
    let fieldWidth = 0;
    let fieldHeight = 0;
    let seconds = TIME_OFFSET;
    let shown = false;

    const resize = (): boolean => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));
      if (nextWidth === width && nextHeight === height) return false;

      width = nextWidth;
      height = nextHeight;
      canvas.width = width;
      canvas.height = height;
      fieldWidth = Math.max(2, Math.ceil(rect.width / FIELD_DOWNSCALE));
      fieldHeight = Math.max(2, Math.ceil(rect.height / FIELD_DOWNSCALE));

      gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fieldWidth, fieldHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fieldTexture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      gl.useProgram(composeProgram);
      gl.uniform2f(compose.res, width, height);
      gl.uniform1f(compose.cell, CELL_CSS_PX * dpr);
      return true;
    };

    const draw = () => {
      // Pass 1: low-resolution light field into the texture.
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.viewport(0, 0, fieldWidth, fieldHeight);
      gl.useProgram(fieldProgram);
      gl.uniform2f(field.res, fieldWidth, fieldHeight);
      gl.uniform1f(field.time, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Pass 2: colour, halftone and grain at full resolution.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.useProgram(composeProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
      gl.uniform1f(compose.time, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!shown) {
        shown = true;
        canvas.style.opacity = '1';
      }
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const startedAt = performance.now();
    let frame = 0;
    let lastFrameAt = 0;
    let running = false;
    let onScreen = true;
    let lost = false;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - lastFrameAt < FRAME_MS) return;
      lastFrameAt = now;
      seconds = TIME_OFFSET + (now - startedAt) / 1000;
      draw();
    };

    const sync = () => {
      const shouldRun = !lost && onScreen && !document.hidden && !reducedMotion.matches;
      if (shouldRun && !running) {
        running = true;
        lastFrameAt = 0;
        frame = requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    const onResize = () => {
      if (lost) return;
      // While animating, the next tick redraws; otherwise repaint the still frame.
      if (resize() && !running) draw();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      canvas.style.opacity = '0';
      sync();
    };

    resize();
    draw();
    sync();

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      if (!lost) {
        gl.deleteTexture(fieldTexture);
        gl.deleteFramebuffer(framebuffer);
        gl.deleteBuffer(vertexBuffer);
        gl.deleteProgram(fieldProgram);
        gl.deleteProgram(composeProgram);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, [tone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700',
        className
      )}
    />
  );
}
