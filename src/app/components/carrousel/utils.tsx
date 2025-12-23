// utils.tsx

import { SetStateAction, Dispatch } from 'react'

export const moveToSlide = (targetIndex: number, currentSlide: number, slidesCount: number, isAnimating: boolean, setCurrentSlide: Dispatch<SetStateAction<number>>, setIsAnimating: Dispatch<SetStateAction<boolean>>) => {
  if (isAnimating) return
  setIsAnimating(true)

  const diff = (targetIndex - currentSlide + slidesCount) % slidesCount
  if (diff === 0) {
    setIsAnimating(false)
    return
  }

  const step = diff > slidesCount / 2 ? -1 : 1
  let current = currentSlide

  const animate = () => {
    current = (current + step + slidesCount) % slidesCount
    setCurrentSlide(current)

    if (current !== targetIndex) {
      setTimeout(animate, 300)
    } else {
      setIsAnimating(false)
    }
  }

  setTimeout(animate, 300)
}

export const handleKeyDown = (event: React.KeyboardEvent, index: number, moveToSlideFunction: (index: number) => void) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    moveToSlideFunction(index)
  }
}
