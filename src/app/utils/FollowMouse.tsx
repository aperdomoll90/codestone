import React from 'react'

interface FollowMouseProps {
  areaRef: React.RefObject<HTMLDivElement | null>
  affectedElements: string
}

interface SingleItemFollowMouse {
  areaRef: React.RefObject<HTMLDivElement | null>
  affectedSelector: string
}

export const FollowMouse = ({ areaRef, affectedElements }: FollowMouseProps) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = areaRef.current
    if (!area) return

    const width = area.clientWidth
    const height = area.clientHeight

    const titles = document.querySelectorAll<HTMLElement>(affectedElements)

    titles.forEach(title => {
      const speed = title.getAttribute('data-speed')
      if (speed !== null) {
        const x = (e.nativeEvent.offsetX / width) * Number(speed)
        const y = (e.nativeEvent.offsetY / height) * Number(speed)
        title.style.transform = `translateX(${x}%) translateY(${y}%)`
      }
    })
  }

  const handleMouseLeave = () => {
    const titles = document.querySelectorAll<HTMLElement>(affectedElements)
    titles.forEach(title => {
      title.style.transform = 'translateX(0) translateY(0)'
    })
  }

  return { handleMouseMove, handleMouseLeave }
}

// export const SingleItemFollowMouse = ({ areaRef, affectedSelector }: SingleItemFollowMouse) => {
//   const rafRef = React.useRef<number | null>(null)
//   const txRef = React.useRef(0) // current x% translation
//   const tyRef = React.useRef(0) // current y% translation
//   const vxRef = React.useRef(0) // velocity x
//   const vyRef = React.useRef(0) // velocity y
//   const lastTsRef = React.useRef<number | null>(null)
//   const settlingRef = React.useRef(false)

//   const setTransform = (el: HTMLElement, tx: number, ty: number) => {
//     el.style.transform = `translate(${tx}%, ${ty}%)`
//   }

//   const stopRAF = () => {
//     if (rafRef.current) cancelAnimationFrame(rafRef.current)
//     rafRef.current = null
//     lastTsRef.current = null
//   }

//   const settleToCenter = (target: HTMLElement) => {
//     settlingRef.current = true
//     stopRAF()

//     // spring params (tweak to taste)
//     const stiffness = 18;    // spring constant (higher = snappier)
//     const damping   = 10;    // damping (lower = more bounce)
//     const precision = 0.02;  // stop threshold in %
//     const maxMs     = 800;   // safety cap

//     let elapsed = 0

//     const tick = (ts: number) => {
//       if (lastTsRef.current == null) lastTsRef.current = ts
//       const dt = Math.min((ts - lastTsRef.current) / 1000, 0.032) // s, clamp
//       lastTsRef.current = ts
//       elapsed += dt * 1000

//       // Hooke's law + damping: a = -k*x - c*v
//       const ax = -stiffness * txRef.current - damping * vxRef.current
//       const ay = -stiffness * tyRef.current - damping * vyRef.current

//       vxRef.current += ax * dt
//       vyRef.current += ay * dt

//       txRef.current += vxRef.current * dt * 60 // scale a bit for feel
//       tyRef.current += vyRef.current * dt * 60

//       setTransform(target, txRef.current, tyRef.current)

//       const done =
//         Math.abs(txRef.current) < precision &&
//         Math.abs(tyRef.current) < precision &&
//         Math.abs(vxRef.current) < precision &&
//         Math.abs(vyRef.current) < precision

//       if (!done && elapsed < maxMs) {
//         rafRef.current = requestAnimationFrame(tick)
//       } else {
//         // snap to exact center at the end
//         txRef.current = 0
//         tyRef.current = 0
//         vxRef.current = 0
//         vyRef.current = 0
//         setTransform(target, 0, 0)
//         settlingRef.current = false
//         stopRAF()
//       }
//     }

//     rafRef.current = requestAnimationFrame(tick)
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
//     const area = areaRef.current
//     if (!area) return
//     const target = area.querySelector<HTMLElement>(affectedSelector)
//     if (!target) return

//     // if returning, interrupt the spring
//     if (settlingRef.current) {
//       settlingRef.current = false
//       stopRAF()
//     }

//     const rect = area.getBoundingClientRect()
//     const relX = (e.clientX - rect.left) / rect.width
//     const relY = (e.clientY - rect.top)  / rect.height

//     const speed = Number(target.getAttribute('data-speed') ?? area.getAttribute('data-speed') ?? 10)

//     // center origin (-1..1) * speed => %
//     const tx = (relX - 0.5) * 2 * speed
//     const ty = (relY - 0.5) * 2 * speed

//     txRef.current = tx
//     tyRef.current = ty
//     // optional: zero velocity while cursor is moving
//     vxRef.current = 0
//     vyRef.current = 0

//     setTransform(target, tx, ty)
//   }

//   const handleMouseLeave = () => {
//     const area = areaRef.current
//     if (!area) return
//     const target = area.querySelector<HTMLElement>(affectedSelector)
//     if (!target) return
//     settleToCenter(target)
//   }

//   return { handleMouseMove, handleMouseLeave }
// }


export interface SingleItemFollowMouseProps {
  areaRef: React.RefObject<HTMLElement | null>;
  targetSelector: string; // child inside the area to move (your Link)
  options?: {
    followLerpFactor?: number;                 // 0..1, higher = snappier
    cursorOffsetPercent?: { x: number; y: number }; // extra % offset from cursor
    clampWithinArea?: boolean;                 // keep target inside area
    intensity?: number;                        // scale travel amount, 0..1+ (default 1)
    maxTravelPercent?: number;                 // clamp to +/- this %, default 200
    returnSpring?: { stiffness?: number; damping?: number; precision?: number };
  };
}

export const SingleItemFollowMouse = ({
  areaRef,
  targetSelector,
  options
}: SingleItemFollowMouseProps) => {
  // ---- Tunables / options ----
  const followLerpFactor = options?.followLerpFactor ?? 0.18;
  const cursorOffsetPercent = options?.cursorOffsetPercent ?? { x: 0, y: 0 };
  const clampWithinArea = options?.clampWithinArea ?? true;
  const intensity = options?.intensity ?? 1;
  const maxTravelPercent = options?.maxTravelPercent ?? 200;
  const returnSpringStiffness = options?.returnSpring?.stiffness ?? 18;
  const returnSpringDamping   = options?.returnSpring?.damping   ?? 10;
  const returnSpringPrecision = options?.returnSpring?.precision ?? 0.02;

  // ---- Animation state ----
  const animationFrameIdRef = React.useRef<number | null>(null);
  const lastTimestampRef = React.useRef<number | null>(null);
  const animationModeRef = React.useRef<'follow' | 'settle'>('follow');

  // current translation (in % of target size)
  const currentTranslateXPercentRef = React.useRef(0);
  const currentTranslateYPercentRef = React.useRef(0);

  // goal translation while following (in %)
  const targetTranslateXPercentRef = React.useRef(0);
  const targetTranslateYPercentRef = React.useRef(0);

  // velocities for the spring settle
  const velocityXRef = React.useRef(0);
  const velocityYRef = React.useRef(0);

  // ---- Helpers ----
  const applyTransform = (el: HTMLElement, txPct: number, tyPct: number) => {
    el.style.transform = `translate(${txPct}%, ${tyPct}%)`;
  };

  const stopAnimationLoop = () => {
    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = null;
    lastTimestampRef.current = null;
  };

  const ensureAnimationLoop = (target: HTMLElement) => {
    if (animationFrameIdRef.current) return;
    animationFrameIdRef.current = requestAnimationFrame(function tick(ts) {
      animationFrameIdRef.current = requestAnimationFrame(tick);
      if (lastTimestampRef.current == null) lastTimestampRef.current = ts;
      const dt = Math.min((ts - lastTimestampRef.current) / 1000, 0.032); // seconds, clamped
      lastTimestampRef.current = ts;

      if (animationModeRef.current === 'follow') {
        // framerate-independent lerp
        const alpha = 1 - Math.pow(1 - followLerpFactor, dt * 60);
        currentTranslateXPercentRef.current +=
          (targetTranslateXPercentRef.current - currentTranslateXPercentRef.current) * alpha;
        currentTranslateYPercentRef.current +=
          (targetTranslateYPercentRef.current - currentTranslateYPercentRef.current) * alpha;

        applyTransform(
          target,
          currentTranslateXPercentRef.current,
          currentTranslateYPercentRef.current
        );
      } else {
        // Spring back to center
        const ax =
          -returnSpringStiffness * currentTranslateXPercentRef.current -
          returnSpringDamping * velocityXRef.current;
        const ay =
          -returnSpringStiffness * currentTranslateYPercentRef.current -
          returnSpringDamping * velocityYRef.current;

        velocityXRef.current += ax * dt;
        velocityYRef.current += ay * dt;

        // *60 to keep feel similar to your original
        currentTranslateXPercentRef.current += velocityXRef.current * dt * 60;
        currentTranslateYPercentRef.current += velocityYRef.current * dt * 60;

        applyTransform(
          target,
          currentTranslateXPercentRef.current,
          currentTranslateYPercentRef.current
        );

        const done =
          Math.abs(currentTranslateXPercentRef.current) < returnSpringPrecision &&
          Math.abs(currentTranslateYPercentRef.current) < returnSpringPrecision &&
          Math.abs(velocityXRef.current) < returnSpringPrecision &&
          Math.abs(velocityYRef.current) < returnSpringPrecision;

        if (done) {
          currentTranslateXPercentRef.current =
            currentTranslateYPercentRef.current =
            velocityXRef.current =
            velocityYRef.current =
              0;
          applyTransform(target, 0, 0);
          stopAnimationLoop();
        }
      }
    });
  };

  // ---- Event handlers ----
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const area = areaRef.current;
    if (!area) return;

    const target = area.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    animationModeRef.current = 'follow';

    const areaRect = area.getBoundingClientRect();
    const localX = e.clientX - areaRect.left;
    const localY = e.clientY - areaRect.top;

    // target's original (layout) center relative to the area
    const centerX0 = target.offsetLeft + target.offsetWidth / 2;
    const centerY0 = target.offsetTop + target.offsetHeight / 2;

    // delta from original center to cursor (px)
    let dxPx = localX - centerX0;
    let dyPx = localY - centerY0;

    if (clampWithinArea) {
      const minDx = -target.offsetLeft;
      const maxDx = area.clientWidth - (target.offsetLeft + target.offsetWidth);
      const minDy = -target.offsetTop;
      const maxDy = area.clientHeight - (target.offsetTop + target.offsetHeight);
      dxPx = Math.max(minDx, Math.min(maxDx, dxPx));
      dyPx = Math.max(minDy, Math.min(maxDy, dyPx));
    }

    // px → % of target size, scaled by intensity, plus cursor offset
    let txPct = ((dxPx / target.offsetWidth) * 100) * intensity + cursorOffsetPercent.x;
    let tyPct = ((dyPx / target.offsetHeight) * 100) * intensity + cursorOffsetPercent.y;

    // final clamp
    txPct = Math.max(-maxTravelPercent, Math.min(maxTravelPercent, txPct));
    tyPct = Math.max(-maxTravelPercent, Math.min(maxTravelPercent, tyPct));

    targetTranslateXPercentRef.current = txPct;
    targetTranslateYPercentRef.current = tyPct;

    ensureAnimationLoop(target);
  };

  const handleMouseLeave = () => {
    const area = areaRef.current;
    if (!area) return;
    const target = area.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    animationModeRef.current = 'settle';
    ensureAnimationLoop(target);
  };

  return { handleMouseMove, handleMouseLeave };
};