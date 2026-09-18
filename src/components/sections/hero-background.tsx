'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Animated hero background: a soft, long-exposure dusk landscape (clouded
 * taupe sky over blurred dark hills) that drifts
 * slowly, with a liquid ripple that trails the mouse, film grain and a
 * gentle scroll parallax.
 *
 * Rendered with raw WebGL in three passes:
 *   1. Scene: the landscape is drawn into a texture at 1/SCENE_DOWNSCALE
 *      resolution. Linear filtering on upscale keeps it soft and blurry, and
 *      it keeps the noise math cheap.
 *   2. Trail: a tiny ping-pong texture stores a decaying velocity field that
 *      the pointer "paints" into and that carries itself along (a fluid-lite).
 *   3. Compose: full resolution. The scene is sampled through the trail's
 *      displacement with a slight colour split, then vignette and grain.
 *
 * Budget: capped at 30 fps, paused when off screen or the tab is hidden, a
 * single still frame for prefers-reduced-motion, and nothing at all if WebGL
 * is unavailable (the section's CSS background shows through).
 */

export type HeroTone = 'light' | 'dark';

type RGB = [number, number, number];

interface Palette {
  /** Brightest part of the sky, upper centre. */
  skyTop: RGB;
  /** Sky towards the edges and the horizon. */
  skyEdge: RGB;
  /** Hill silhouettes. */
  hill: RGB;
  /** Foreground, fading into the section colour at the bottom. */
  ground: RGB;
  /** Grain amplitude in colour units. */
  grain: number;
}

const hex = (value: string): RGB => {
  const n = parseInt(value.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const PALETTES: Record<HeroTone, Palette> = {
  // Misty daylight version, for a light hero with dark type.
  light: {
    skyTop: hex('#f7f9fc'),
    skyEdge: hex('#dde6f1'),
    hill: hex('#a8b8cc'),
    ground: hex('#eaf2ff'),
    grain: 0.035,
  },
  // Muted dusk: warm taupe sky broken up by darker cloud, over near-black hills. White hero type stays readable.
  dark: {
    skyTop: hex('#6e6a64'),
    skyEdge: hex('#2c2a28'),
    hill: hex('#0e0e0f'),
    ground: hex('#0c0b0b'),
    grain: 0.06,
  },
};

/** The scene texture is rendered this many times smaller than the canvas. */
const SCENE_DOWNSCALE = 4;
/** The pointer trail texture is rendered this many times smaller than the canvas. */
const TRAIL_DOWNSCALE = 8;
const MAX_DPR = 1.5;
const FRAME_MS = 1000 / 30;
/** Time offset so the first frame is already an interesting composition. */
const TIME_OFFSET = 18;
/** How much of the pointer's speed goes into the ripple (per frame, in canvas units). */
const TRAIL_FORCE = 14;

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

const NOISE = /* glsl */ `
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
`;

const SCENE_SHADER = /* glsl */ `
${PRECISION}
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec3 uSkyTop;
uniform vec3 uSkyEdge;
uniform vec3 uHill;
uniform vec3 uGround;
${HASH}
${NOISE}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  // Parallax: the landscape lags behind the page while scrolling.
  uv.y += uScroll * 0.12;
  float aspect = uRes.x / uRes.y;
  float x = uv.x * aspect;
  float t = uTime;

  // Noise stretched sideways, like a long exposure taken from a moving car.
  float streak = fbm(vec2(x * 0.6 - t * 0.07, uv.y * 7.0));
  float mist = fbm(vec2(x * 0.9 + t * 0.045, uv.y * 2.2 + 3.0));
  // Large, slow cloud shapes that darken parts of the sky as they pass.
  float cloud = fbm(vec2(x * 1.4 - t * 0.04, uv.y * 3.2 + t * 0.012) + mist * 0.8);

  // Sky: lightest at the upper centre, darker toward the edges, and mottled
  // with drifting cloud so it reads as a mix of light and dark, not a flat glow.
  vec2 skyP = (uv - vec2(0.55, 0.88)) * vec2(0.9, 1.3);
  vec3 colour = mix(uSkyEdge, uSkyTop, 1.0 - smoothstep(0.0, 1.1, length(skyP)));
  colour *= 0.9 + 0.2 * mist;
  colour = mix(colour, uSkyEdge * 0.75, smoothstep(0.36, 0.58, cloud) * 0.85);

  // Hills: higher on the left, a lower shoulder on the right, a dip in the middle.
  float ridge = 0.46
    + 0.16 * (1.0 - smoothstep(0.0, 0.5, uv.x))
    + 0.07 * smoothstep(0.6, 1.0, uv.x)
    + 0.10 * (fbm(vec2(x * 0.8 - t * 0.055, 1.7)) - 0.5);
  float hill = 1.0 - smoothstep(ridge - 0.06, ridge + 0.12, uv.y + (streak - 0.5) * 0.05);
  colour = mix(colour, uHill, hill * 0.96);

  // Foreground sinks into near black toward the bottom (no light band here: it sat behind the wordmark).
  float horizonY = 0.36 + (streak - 0.5) * 0.03;
  colour = mix(colour, uGround, (1.0 - smoothstep(0.0, horizonY - 0.02, uv.y)) * 0.85);

  gl_FragColor = vec4(colour, 1.0);
}
`;

const TRAIL_SHADER = /* glsl */ `
${PRECISION}
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform vec2 uPointer;
uniform vec2 uPointerVel;
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  // Carry the field along its own velocity so the ripple flows instead of just fading.
  vec2 here = (texture2D(uPrev, uv).rg - 0.5) * 2.0;
  vec4 prev = texture2D(uPrev, uv - here * 0.012);
  vec2 vel = (prev.rg - 0.5) * 2.0;
  float amount = prev.b;

  // Decay, with a small constant term so 8-bit values reach exactly zero.
  vel = sign(vel) * max(abs(vel) * 0.94 - 0.003, 0.0);
  amount = max(amount * 0.94 - 0.003, 0.0);

  // Paint the pointer's motion in with a soft round brush.
  vec2 d = (uv - uPointer) * vec2(uRes.x / uRes.y, 1.0);
  float brush = exp(-dot(d, d) / 0.01);
  vel += uPointerVel * brush;
  amount += length(uPointerVel) * brush;

  gl_FragColor = vec4(clamp(vel, -1.0, 1.0) * 0.5 + 0.5, clamp(amount, 0.0, 1.0), 1.0);
}
`;

const COMPOSE_SHADER = /* glsl */ `
${PRECISION}
uniform sampler2D uScene;
uniform sampler2D uTrail;
uniform vec2 uRes;
uniform float uTime;
uniform float uGrain;
${HASH}
void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;

  // Push the scene around where the pointer moved, splitting the colours slightly.
  vec4 trail = texture2D(uTrail, uv);
  vec2 vel = (trail.rg - 0.5) * 2.0;
  vec2 offset = vel * 0.05;
  vec2 split = vel * 0.012;
  vec3 colour = vec3(
    texture2D(uScene, uv - offset - split).r,
    texture2D(uScene, uv - offset).g,
    texture2D(uScene, uv - offset + split).b
  );
  colour += trail.b * 0.035;

  // Soft vignette.
  float vignette = 1.0 - smoothstep(0.35, 1.25, length((uv - 0.5) * vec2(1.0, 1.25)));
  colour *= mix(0.72, 1.0, vignette);

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

/** A texture plus the framebuffer that renders into it. */
interface Target {
  texture: WebGLTexture | null;
  framebuffer: WebGLFramebuffer | null;
}

function createTarget(gl: WebGLRenderingContext): Target {
  return { texture: gl.createTexture(), framebuffer: gl.createFramebuffer() };
}

function sizeTarget(gl: WebGLRenderingContext, target: Target, width: number, height: number) {
  gl.bindTexture(gl.TEXTURE_2D, target.texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
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

    // Stay hidden until a real frame is drawn. The canvas node can be reused
    // (React dev StrictMode remounts, returning to the page), so never trust a
    // leftover opacity from an earlier run.
    canvas.style.opacity = '0';

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    // A dead context would draw nothing and leave a blank canvas over the section.
    if (!gl || gl.isContextLost()) return;

    let sceneProgram: WebGLProgram;
    let trailProgram: WebGLProgram;
    let composeProgram: WebGLProgram;
    try {
      sceneProgram = createProgram(gl, SCENE_SHADER);
      trailProgram = createProgram(gl, TRAIL_SHADER);
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

    const sceneTarget = createTarget(gl);
    // Ping-pong pair: read last frame's trail from one, write this frame's into the other.
    let trailRead = createTarget(gl);
    let trailWrite = createTarget(gl);

    const scene = {
      res: gl.getUniformLocation(sceneProgram, 'uRes'),
      time: gl.getUniformLocation(sceneProgram, 'uTime'),
      scroll: gl.getUniformLocation(sceneProgram, 'uScroll'),
    };
    const trail = {
      prev: gl.getUniformLocation(trailProgram, 'uPrev'),
      res: gl.getUniformLocation(trailProgram, 'uRes'),
      pointer: gl.getUniformLocation(trailProgram, 'uPointer'),
      pointerVel: gl.getUniformLocation(trailProgram, 'uPointerVel'),
    };
    const compose = {
      scene: gl.getUniformLocation(composeProgram, 'uScene'),
      trail: gl.getUniformLocation(composeProgram, 'uTrail'),
      res: gl.getUniformLocation(composeProgram, 'uRes'),
      time: gl.getUniformLocation(composeProgram, 'uTime'),
      grain: gl.getUniformLocation(composeProgram, 'uGrain'),
    };

    gl.useProgram(sceneProgram);
    gl.uniform3fv(gl.getUniformLocation(sceneProgram, 'uSkyTop'), palette.skyTop);
    gl.uniform3fv(gl.getUniformLocation(sceneProgram, 'uSkyEdge'), palette.skyEdge);
    gl.uniform3fv(gl.getUniformLocation(sceneProgram, 'uHill'), palette.hill);
    gl.uniform3fv(gl.getUniformLocation(sceneProgram, 'uGround'), palette.ground);

    gl.useProgram(trailProgram);
    gl.uniform1i(trail.prev, 0);

    gl.useProgram(composeProgram);
    gl.uniform1i(compose.scene, 0);
    gl.uniform1i(compose.trail, 1);
    gl.uniform1f(compose.grain, palette.grain);

    let width = 0;
    let height = 0;
    let sceneWidth = 0;
    let sceneHeight = 0;
    let trailWidth = 0;
    let trailHeight = 0;
    let seconds = TIME_OFFSET;
    let shown = false;

    // Pointer in canvas units (0..1, y up) and its smoothed per-frame velocity.
    const pointer = { x: 0.5, y: 0.5, lastX: 0.5, lastY: 0.5, moved: false, velX: 0, velY: 0 };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = 1 - (event.clientY - rect.top) / rect.height;
      pointer.moved = true;
    };

    const clearTrail = () => {
      gl.clearColor(0.5, 0.5, 0, 1);
      for (const target of [trailRead, trailWrite]) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

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
      sceneWidth = Math.max(2, Math.ceil(rect.width / SCENE_DOWNSCALE));
      sceneHeight = Math.max(2, Math.ceil(rect.height / SCENE_DOWNSCALE));
      trailWidth = Math.max(2, Math.ceil(rect.width / TRAIL_DOWNSCALE));
      trailHeight = Math.max(2, Math.ceil(rect.height / TRAIL_DOWNSCALE));

      sizeTarget(gl, sceneTarget, sceneWidth, sceneHeight);
      sizeTarget(gl, trailRead, trailWidth, trailHeight);
      sizeTarget(gl, trailWrite, trailWidth, trailHeight);
      clearTrail();

      gl.useProgram(composeProgram);
      gl.uniform2f(compose.res, width, height);
      return true;
    };

    /** Scroll progress through the section: 0 at rest, 1 once it has scrolled a full height away. */
    const scrollProgress = () => {
      const rect = canvas.getBoundingClientRect();
      return Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1.5);
    };

    const draw = (animate: boolean) => {
      // Pass 1: the landscape, at low resolution.
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, sceneTarget.framebuffer);
      gl.viewport(0, 0, sceneWidth, sceneHeight);
      gl.useProgram(sceneProgram);
      gl.uniform2f(scene.res, sceneWidth, sceneHeight);
      gl.uniform1f(scene.time, seconds);
      gl.uniform1f(scene.scroll, scrollProgress());
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Pass 2: advance the pointer trail (skipped for the reduced-motion still frame).
      if (animate) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, trailWrite.framebuffer);
        gl.viewport(0, 0, trailWidth, trailHeight);
        gl.useProgram(trailProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, trailRead.texture);
        gl.uniform2f(trail.res, trailWidth, trailHeight);
        gl.uniform2f(trail.pointer, pointer.x, pointer.y);
        gl.uniform2f(trail.pointerVel, pointer.velX, pointer.velY);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        [trailRead, trailWrite] = [trailWrite, trailRead];
      }

      // Pass 3: displacement, colour split, vignette and grain at full resolution.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.useProgram(composeProgram);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, sceneTarget.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, trailRead.texture);
      gl.uniform1f(compose.time, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!shown) {
        shown = true;
        canvas.style.opacity = '1';
      }
    };

    const updatePointer = () => {
      const clamp = (value: number) => Math.min(Math.max(value, -1), 1);
      const rawX = pointer.moved ? clamp((pointer.x - pointer.lastX) * TRAIL_FORCE) : 0;
      const rawY = pointer.moved ? clamp((pointer.y - pointer.lastY) * TRAIL_FORCE) : 0;
      pointer.velX += (rawX - pointer.velX) * 0.5;
      pointer.velY += (rawY - pointer.velY) * 0.5;
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;
      pointer.moved = false;
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
      updatePointer();
      draw(true);
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
      if (resize() && !running) draw(false);
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      canvas.style.opacity = '0';
      sync();
    };

    resize();
    draw(false);
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
    // The canvas ignores pointer events (content sits above it), so listen on the window.
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.style.opacity = '0';
      // Free GPU resources but keep the context alive: forcing it lost here meant a
      // remount on the same canvas got a dead context back and showed a blank hero.
      // The browser releases the context itself once the canvas is removed.
      if (!lost) {
        for (const target of [sceneTarget, trailRead, trailWrite]) {
          gl.deleteTexture(target.texture);
          gl.deleteFramebuffer(target.framebuffer);
        }
        gl.deleteBuffer(vertexBuffer);
        gl.deleteProgram(sceneProgram);
        gl.deleteProgram(trailProgram);
        gl.deleteProgram(composeProgram);
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
