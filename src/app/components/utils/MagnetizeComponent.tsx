import React from 'react'

/**
 * MagnetizeComponent
 *
 * A reusable “magnetic follow” engine:
 * - Attach to a container via areaRef.
 * - Provide one or more target selectors with motion options.
 * - Exposes handleMouseMove / handleMouseLeave handlers.
 *
 * On mouse move:
 *   - computes target offsets for each element (in %).
 *   - starts a requestAnimationFrame loop to ease elements toward the cursor.
 *
 * On mouse leave:
 *   - switches elements to spring mode so they bounce back to center.
 */

/*
     Example usage:
     const areaRef = useRef<HTMLDivElement | null>(null);
     const { handleMouseMove, handleMouseLeave } = MagnetizeComponent({
       areaRef,
       targets: [
         { selector: '.c-bubble-button', options: { intensity: 0.4 } },
         { selector: '.c-bubble-button__label', options: { intensity: 0.15 } },
       ],
     });
     
     <div ref={areaRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>...</div>
     
*/

/*
PerTargetOptions (per-element tuning)

followLerpFactor?: number
  How quickly the element follows the cursor.
  Range: 0.02 → 0.3
  Lower = floaty / delayed. Higher = snappy / locked-on.
  Default: 0.18

cursorOffsetPercent?: { x: number; y: number }
  Extra offset in percent (%) so the element doesn't sit exactly under the cursor.
  Example: { x: 10, y: -5 } floats it slightly right/up.
  Default: { x: 0, y: 0 }

clampWithinArea?: boolean
  Prevents the element from moving outside the container.
  true = stays inside bounds. false = can drift outside.
  Default: true

intensity?: number
  How far the element travels relative to cursor distance.
  Range: 0.1 → 2
  1 = natural, <1 = subtle, >1 = exaggerated.
  Default: 1

maxTravelPercent?: number
  Maximum translate() movement allowed, in percent of its size.
  Range: 20 → 300
  100 = can move by its own width/height.
  Default: 200

returnSpring?: {
  stiffness?: number
    Strength of the pull back to center.
    Range: 5 → 40
    Higher = snaps back harder.
    Default: 18

  damping?: number
    How much bounce is absorbed.
    Range: 4 → 20
    Higher = less bounce, more easing.
    Default: 10

  precision?: number
    How close to center before we consider it “done”.
    Range: 0.001 → 0.1
    Smaller = more precise stop.
    Default: 0.02
}
*/

type PerTargetOptions = {
  followLerpFactor?: number 
  cursorOffsetPercent?: { x: number; y: number }
  clampWithinArea?: boolean 
  intensity?: number 
  maxTravelPercent?: number 
  returnSpring?: {
    stiffness?: number 
    damping?: number 
    precision?: number
  }
}

export interface MagnetizeComponentProps {
  areaRef: React.RefObject<HTMLElement | null> // the outer container element that tracks mouse movement. Its the area around that defines where the target follows
  targets: Array<{
    selector: string // child inside the area to move
    options?: PerTargetOptions
  }>
}

type ResolvedOptions = {
  followLerpFactor: number
  cursorOffsetPercent: { x: number; y: number }
  clampWithinArea: boolean
  intensity: number
  maxTravelPercent: number
  returnSpringStiffness: number
  returnSpringDamping: number
  returnSpringPrecision: number
}

type TargetState = {
  selector: string
  el: HTMLElement | null
  mode: 'follow' | 'settle'
  currentX: number
  currentY: number
  targetX: number
  targetY: number
  velX: number
  velY: number
  opts: ResolvedOptions
}

const resolveOptions = (options?: PerTargetOptions): ResolvedOptions => ({
  followLerpFactor: options?.followLerpFactor ?? 0.18,
  cursorOffsetPercent: options?.cursorOffsetPercent ?? { x: 0, y: 0 },
  clampWithinArea: options?.clampWithinArea ?? true,
  intensity: options?.intensity ?? 1,
  maxTravelPercent: options?.maxTravelPercent ?? 200,
  returnSpringStiffness: options?.returnSpring?.stiffness ?? 18,
  returnSpringDamping: options?.returnSpring?.damping ?? 10,
  returnSpringPrecision: options?.returnSpring?.precision ?? 0.02,
})

export const MagnetizeComponent = ({ areaRef, targets }: MagnetizeComponentProps) => {
  const animationFrameIdRef = React.useRef<number | null>(null)
  const lastTimestampRef = React.useRef<number | null>(null)

  // one state object per selector
  const targetsRef = React.useRef<TargetState[]>([])

  // sync TargetState list with `targets` config
  React.useEffect(() => {
    const prev = targetsRef.current
    targetsRef.current = targets.map(cfg => {
      const existing = prev.find(t => t.selector === cfg.selector)
      const opts = resolveOptions(cfg.options)
      if (existing) {
        return { ...existing, opts }
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
      }
    })
  }, [targets])

  const applyTransform = (targetElement: HTMLElement, xPercent: number, yPercent: number) => {
    targetElement.style.transform = `translate(${xPercent}%, ${yPercent}%)`
  }

  const stopAnimationLoop = () => {
    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current)
    animationFrameIdRef.current = null
    lastTimestampRef.current = null
  }

  /*
ensureAnimationLoop()

BIG PICTURE:
This function makes sure our little “animation brain” is running.
It starts a requestAnimationFrame loop (about 60fps), and on every frame it
updates all magnetized elements until everything is finished moving.

WHAT THIS LOOP DOES EACH FRAME:

 1. Compute how much real time passed since the last frame (dt).
    This keeps motion smooth even if the framerate drops.

 2. For EACH targetMotionController:
      - If mode === "follow":
          → Ease currentX/currentY toward targetX/targetY
            using a framerate-independent lerp.
            This is what makes the element smoothly chase the cursor.

      - If mode === "settle":
          → Apply a spring + damping formula:
                acceleration = -stiffness * position - damping * velocity
            This pulls the element back to the center like a rubber band,
            with a natural bounce that slowly calms down.

      - After computing the new position (and velocity in spring mode),
        write it to the DOM using transform: translate(...).

 3. If ALL elements are fully settled
      (very close to center AND barely moving),
      → stop the animation loop to save performance.

IMPORTANT:
- The loop only runs when something is moving (on mouse move or settle).
- When everything reaches rest, the loop shuts itself down.
- This keeps the animation smooth, efficient, and intuitive.
*/
  const ensureAnimationLoop = () => {
    // If there is already a requestAnimationFrame loop running, don't start another.
    if (animationFrameIdRef.current) return

    // Start the RAF loop
    animationFrameIdRef.current = requestAnimationFrame(function tick(timestamp) {
      // Schedule the *next* frame right away
      animationFrameIdRef.current = requestAnimationFrame(tick)

      // --- Compute delta time (dt) in seconds, frame-to-frame ---
      if (lastTimestampRef.current == null) lastTimestampRef.current = timestamp
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.032) // seconds
      lastTimestampRef.current = timestamp

      const allControllers = targetsRef.current
      let allSettled = true // assume everything is settled until we find one that isn't

      for (const controller of allControllers) {
        const { el, mode, opts } = controller
        if (!el) continue // might not exist in DOM yet

        if (mode === 'follow') {
          // ---- FOLLOW MODE: ease toward targetX/targetY ----
          allSettled = false // at least one is still doing work

          // frame-rate independent lerp factor
          const alpha = 1 - Math.pow(1 - opts.followLerpFactor, dt * 60)

          // Smoothly move current position toward the target position
          controller.currentX += (controller.targetX - controller.currentX) * alpha
          controller.currentY += (controller.targetY - controller.currentY) * alpha

          applyTransform(el, controller.currentX, controller.currentY)
        } else {
          // ---- SETTLE MODE: spring back to (0,0) ----
          // Hooke's law + damping for each axis: acceleration = -k*x - c*v
          const ax = -opts.returnSpringStiffness * controller.currentX - opts.returnSpringDamping * controller.velX
          const ay = -opts.returnSpringStiffness * controller.currentY - opts.returnSpringDamping * controller.velY

          // integrate acceleration → velocity
          controller.velX += ax * dt
          controller.velY += ay * dt

          // integrate velocity → position (scaled to feel nice)
          controller.currentX += controller.velX * dt * 60
          controller.currentY += controller.velY * dt * 60

          applyTransform(el, controller.currentX, controller.currentY)

          // Are we close enough to center AND barely moving?
          const done =
            Math.abs(controller.currentX) < opts.returnSpringPrecision &&
            Math.abs(controller.currentY) < opts.returnSpringPrecision &&
            Math.abs(controller.velX) < opts.returnSpringPrecision &&
            Math.abs(controller.velY) < opts.returnSpringPrecision

          if (!done) {
            allSettled = false
          } else {
            // Snap to exact center and zero out velocity so we don't jitter
            controller.currentX = 0
            controller.currentY = 0
            controller.velX = 0
            controller.velY = 0
            applyTransform(el, 0, 0)
          }
        }
      }

      // If nobody is following or settling anymore, kill the loop.
      if (allSettled) {
        stopAnimationLoop()
      }
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // NOTE: (e) is the mouse event from React: it has clientX, clientY, etc.
    /*
    This is the handler you attach to onMouseMove on the outer area div.
    This handler only does 3 main jobs:

     - Figure out where the mouse is inside the container.
     - For each target element, compute “how far should I move this element relative to its center”, in %.
     - Save those numbers as targetMotionController.targetX/targetY and make sure the animation loop is running.
    
     The visual movement happens later in the animation loop by adjusting
     targetMotionController.currentX/currentY toward targetMotionController.targetX/targetY
     and writing transform: translate(...) to the DOM.
  */

    const area = areaRef.current
    if (!area) return

    const areaRect = area.getBoundingClientRect() // Where is this container on the page, and how big is it
    const localX = e.clientX - areaRect.left
    const localY = e.clientY - areaRect.top
    // We subtract the container’s left/top so we get coordinates inside the container.

    for (const targetMotionController of targetsRef.current) {
      /*
      targetsRef.current is an array of targetMotionControllers, one per target selector.

      Each targetMotionController knows:
      - The selector (.c-bubble-button, .c-bubble-button__label, etc.)
      - Its current animation mode and position
      - Options (intensity, spring, etc.)
    */

      // Find the actual DOM element inside the area that matches the selector.
      const targetElement = area.querySelector<HTMLElement>(targetMotionController.selector)
      targetMotionController.el = targetElement ?? null // saves it so the animation loop can use it.
      if (!targetElement) continue

      /*
      Grab the relevant options for this target:
       - clampWithinArea: to keep it from moving outside the container.
       - intensity: how strongly it follows the cursor.
       - cursorOffsetPercent: shift away from the cursor (like “float near” instead of “stick exactly under”).
       - maxTravelPercent: max distance it’s allowed to travel (in % translate).
      */
      const { clampWithinArea, intensity, cursorOffsetPercent, maxTravelPercent } = targetMotionController.opts

      // Tells the animation loop: “from now on, this element is following the cursor”.
      targetMotionController.mode = 'follow'
      /*
       Where is the element and the cursor, relative to each other?
        - targetElement.offsetLeft and  targetElement.offsetTop → where each target element is inside the container
        - targetElement.offsetWidth, targetElement.offsetHeight → its size

      calculates the coordinates of the element’s center inside the container
        */
      const centerX0 = targetElement.offsetLeft + targetElement.offsetWidth / 2
      const centerY0 = targetElement.offsetTop + targetElement.offsetHeight / 2

      /*
      localX, localY = where the cursor is inside the container.
      Subtract the element’s center:

      cursorToElementDiffX = “how many pixels to the right (or left) is the cursor from this element’s center?”
      cursorToElementDiffY = “how many pixels up/down from the center?”

      Example:
        cursorToElementDiffX > 0 → mouse is to the right of the element’s center
        cursorToElementDiffX < 0 → mouse is to the left.
    */

      let cursorToElementDiffX = localX - centerX0
      let cursorToElementDiffY = localY - centerY0

      // if the mouse goes crazy far, don’t let the element’s center move outside the area. (optional)
      if (clampWithinArea) {
        const minDx = -targetElement.offsetLeft
        const maxDx = area.clientWidth - (targetElement.offsetLeft + targetElement.offsetWidth)
        const minDy = -targetElement.offsetTop
        const maxDy = area.clientHeight - (targetElement.offsetTop + targetElement.offsetHeight)
        cursorToElementDiffX = Math.max(minDx, Math.min(maxDx, cursorToElementDiffX))
        cursorToElementDiffY = Math.max(minDy, Math.min(maxDy, cursorToElementDiffY))
      }

      // Convert pixels → % translation
      /*
      This answers: “how much should I translate the element in CSS?”

        cursorToElementDiffX / targetElement.offsetWidth = “how many element-widths” the mouse is away from the center.       
        * 100 = convert that to a percentage of its size. 
            - So 1 * 100 = 100% means “move it by its full width”.        
        * intensity = scale the effect up or down.        
            - intensity = 1 → realistic move.        
            - intensity = 0.5 → half as strong.       
            - intensity = 2 → twice as strong.
        
        * + cursorOffsetPercent.x = bias so it doesn’t sit exactly on the cursor center if you don’t want that.
      */
      let xPercent = (cursorToElementDiffX / targetElement.offsetWidth) * 100 * intensity + cursorOffsetPercent.x
      let yPercent = (cursorToElementDiffY / targetElement.offsetHeight) * 100 * intensity + cursorOffsetPercent.y

      // Clamp overall travel range, Even if the math says “move 500%”, we don’t want the element to travel that far.
      xPercent = Math.max(-maxTravelPercent, Math.min(maxTravelPercent, xPercent))
      yPercent = Math.max(-maxTravelPercent, Math.min(maxTravelPercent, yPercent))

      //Store target position for the animation loop
      /*
      Important: We do not move the element here. We only record where it should be heading (targetX/targetY).
      
      The animation loop (in ensureAnimationLoop) will read:
        - targetMotionController.currentX/currentY → where it is right now
        - targetMotionController.targetX/targetY → where we want it to go
      
        …and then smoothly ease currentX/currentY toward those target values, frame by frame.
      */
      targetMotionController.targetX = xPercent
      targetMotionController.targetY = yPercent
    }
    // That starts or continues the requestAnimationFrame loop that actually updates their positions over time
    ensureAnimationLoop()
  }

  const handleMouseLeave = () => {
    /*
    This runs when the mouse leaves the main area (onMouseLeave on the container).

    Goal:
    - Stop following the cursor.
    - Tell each target: “switch to spring mode and go back to center smoothly”.
    - Let the animation loop handle the actual motion.
  */
    const area = areaRef.current
    if (!area) return

    for (const targetMotionController of targetsRef.current) {
      // Find the DOM element for this target selector inside the area
      const targetElement = area.querySelector<HTMLElement>(targetMotionController.selector)
      targetMotionController.el = targetElement ?? null
      if (!targetElement) continue

      // Switch this target into "settle" mode:
      // The animation loop will see mode === 'settle' and
      // start applying the spring physics to bring it back to (0, 0).
      //
      // NOTE: we do NOT reset currentX/currentY/velX/velY here.
      // Whatever position/velocity it has right now becomes the
      // starting point for the spring, so it feels natural.

      targetMotionController.mode = 'settle'
    }

    // Make sure the animation loop is running so the spring can actually play out.
    ensureAnimationLoop()
  }

  return { handleMouseMove, handleMouseLeave }
}
