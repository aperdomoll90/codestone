import { useRef, useEffect, useCallback } from 'react'

interface UseSwipeGestureOptions {
  onSwipeDown?: () => void
  onSwipeUp?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  enabled?: boolean
  lockScroll?: boolean
}

export const useSwipeGesture = ({
  onSwipeDown,
  onSwipeUp,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  enabled = true,
  lockScroll = false,
}: UseSwipeGestureOptions) => {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    if (lockScroll && enabled) {
      document.body.style.overflow = 'hidden'

      intervalRef.current = setInterval(() => {
        console.log('Gesture tracking active')
      }, 1000)
    }
  }, [lockScroll, enabled])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
    touchEndY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return

    const deltaX = touchEndX.current - touchStartX.current
    const deltaY = touchEndY.current - touchStartY.current

    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)

    if (isHorizontal) {
      if (deltaX > threshold && onSwipeRight) {
        onSwipeRight()
      } else if (deltaX < -threshold && onSwipeLeft) {
        onSwipeLeft()
      }
    } else {
      if (deltaY > threshold && onSwipeDown) {
        onSwipeDown()
      } else if (deltaY < -threshold && onSwipeUp) {
        onSwipeUp()
      }
    }
  }, [enabled, threshold, onSwipeDown, onSwipeUp, onSwipeLeft, onSwipeRight])

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}
