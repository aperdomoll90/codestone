import React from 'react';

type PerTargetOptions = {
  followLerpFactor?: number;                 // 0..1, higher = snappier
  cursorOffsetPercent?: { x: number; y: number }; // extra % offset from cursor
  clampWithinArea?: boolean;                 // keep target inside area
  intensity?: number;                        // scale travel amount, 0..1+ (default 1)
  maxTravelPercent?: number;                 // clamp to +/- this %, default 200
  returnSpring?: { stiffness?: number; damping?: number; precision?: number };
};

export interface MultiItemFollowMouseProps {
  areaRef: React.RefObject<HTMLElement | null>;
  targets: Array<{
    selector: string;       // child inside the area to move
    options?: PerTargetOptions;
  }>;
}

type ResolvedOptions = {
  followLerpFactor: number;
  cursorOffsetPercent: { x: number; y: number };
  clampWithinArea: boolean;
  intensity: number;
  maxTravelPercent: number;
  returnSpringStiffness: number;
  returnSpringDamping: number;
  returnSpringPrecision: number;
};

type TargetState = {
  selector: string;
  el: HTMLElement | null;
  mode: 'follow' | 'settle';
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  velX: number;
  velY: number;
  opts: ResolvedOptions;
};

const resolveOptions = (options?: PerTargetOptions): ResolvedOptions => ({
  followLerpFactor: options?.followLerpFactor ?? 0.18,
  cursorOffsetPercent: options?.cursorOffsetPercent ?? { x: 0, y: 0 },
  clampWithinArea: options?.clampWithinArea ?? true,
  intensity: options?.intensity ?? 1,
  maxTravelPercent: options?.maxTravelPercent ?? 200,
  returnSpringStiffness: options?.returnSpring?.stiffness ?? 18,
  returnSpringDamping: options?.returnSpring?.damping ?? 10,
  returnSpringPrecision: options?.returnSpring?.precision ?? 0.02,
});

export const MultiItemFollowMouse = ({
  areaRef,
  targets,
}: MultiItemFollowMouseProps) => {
  const animationFrameIdRef = React.useRef<number | null>(null);
  const lastTimestampRef = React.useRef<number | null>(null);

  // one state object per selector
  const targetsRef = React.useRef<TargetState[]>([]);

  // sync TargetState list with `targets` config
  React.useEffect(() => {
    const prev = targetsRef.current;
    targetsRef.current = targets.map(cfg => {
      const existing = prev.find(t => t.selector === cfg.selector);
      const opts = resolveOptions(cfg.options);
      if (existing) {
        return { ...existing, opts };
      }
      return {
        selector: cfg.selector,
        el: null,
        mode: 'follow',
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        velX: 0,
        velY: 0,
        opts,
      };
    });
  }, [targets]);

  const applyTransform = (el: HTMLElement, txPct: number, tyPct: number) => {
    el.style.transform = `translate(${txPct}%, ${tyPct}%)`;
  };

  const stopAnimationLoop = () => {
    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = null;
    lastTimestampRef.current = null;
  };

  const ensureAnimationLoop = () => {
    if (animationFrameIdRef.current) return;

    animationFrameIdRef.current = requestAnimationFrame(function tick(ts) {
      animationFrameIdRef.current = requestAnimationFrame(tick);

      if (lastTimestampRef.current == null) lastTimestampRef.current = ts;
      const dt = Math.min((ts - lastTimestampRef.current) / 1000, 0.032); // seconds
      lastTimestampRef.current = ts;

      const allStates = targetsRef.current;
      let allSettled = true; // used to stop after settle

      for (const state of allStates) {
        const { el, mode, opts } = state;
        if (!el) continue;

        if (mode === 'follow') {
          allSettled = false; // still actively following -> keep loop alive
          const alpha = 1 - Math.pow(1 - opts.followLerpFactor, dt * 60);

          state.currentX += (state.targetX - state.currentX) * alpha;
          state.currentY += (state.targetY - state.currentY) * alpha;

          applyTransform(el, state.currentX, state.currentY);
        } else {
          // settle to center with spring
          const ax =
            -opts.returnSpringStiffness * state.currentX -
            opts.returnSpringDamping * state.velX;
          const ay =
            -opts.returnSpringStiffness * state.currentY -
            opts.returnSpringDamping * state.velY;

          state.velX += ax * dt;
          state.velY += ay * dt;

          state.currentX += state.velX * dt * 60;
          state.currentY += state.velY * dt * 60;

          applyTransform(el, state.currentX, state.currentY);

          const done =
            Math.abs(state.currentX) < opts.returnSpringPrecision &&
            Math.abs(state.currentY) < opts.returnSpringPrecision &&
            Math.abs(state.velX) < opts.returnSpringPrecision &&
            Math.abs(state.velY) < opts.returnSpringPrecision;

          if (!done) {
            allSettled = false;
          } else {
            // snap to exact center
            state.currentX = 0;
            state.currentY = 0;
            state.velX = 0;
            state.velY = 0;
            applyTransform(el, 0, 0);
          }
        }
      }

      // stop loop when everyone is settled
      if (allSettled) {
        stopAnimationLoop();
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const area = areaRef.current;
    if (!area) return;

    const areaRect = area.getBoundingClientRect();
    const localX = e.clientX - areaRect.left;
    const localY = e.clientY - areaRect.top;

    for (const state of targetsRef.current) {
      const el = area.querySelector<HTMLElement>(state.selector);
      state.el = el ?? null;
      if (!el) continue;

      const {
        clampWithinArea,
        intensity,
        cursorOffsetPercent,
        maxTravelPercent,
      } = state.opts;

      state.mode = 'follow';

      const centerX0 = el.offsetLeft + el.offsetWidth / 2;
      const centerY0 = el.offsetTop + el.offsetHeight / 2;

      let dxPx = localX - centerX0;
      let dyPx = localY - centerY0;

      if (clampWithinArea) {
        const minDx = -el.offsetLeft;
        const maxDx = area.clientWidth - (el.offsetLeft + el.offsetWidth);
        const minDy = -el.offsetTop;
        const maxDy = area.clientHeight - (el.offsetTop + el.offsetHeight);
        dxPx = Math.max(minDx, Math.min(maxDx, dxPx));
        dyPx = Math.max(minDy, Math.min(maxDy, dyPx));
      }

      let txPct = ((dxPx / el.offsetWidth) * 100) * intensity + cursorOffsetPercent.x;
      let tyPct = ((dyPx / el.offsetHeight) * 100) * intensity + cursorOffsetPercent.y;

      txPct = Math.max(-maxTravelPercent, Math.min(maxTravelPercent, txPct));
      tyPct = Math.max(-maxTravelPercent, Math.min(maxTravelPercent, tyPct));

      state.targetX = txPct;
      state.targetY = tyPct;
    }

    ensureAnimationLoop();
  };

  const handleMouseLeave = () => {
    const area = areaRef.current;
    if (!area) return;

    for (const state of targetsRef.current) {
      const el = area.querySelector<HTMLElement>(state.selector);
      state.el = el ?? null;
      if (!el) continue;

      state.mode = 'settle';
      // keep existing currentX/currentY/vel as starting point
    }

    ensureAnimationLoop();
  };

  return { handleMouseMove, handleMouseLeave };
};
