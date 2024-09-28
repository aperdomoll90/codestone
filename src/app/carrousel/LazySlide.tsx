import React, { useState, useEffect } from 'react'
import { LazySlideProps } from './CarrouselTypes'

export const LazySlide: React.FC<LazySlideProps> = React.memo(({ background, size, radius, angle, scale, className, label, hidden }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const style = {
    width: size,
    height: size,
    backgroundImage: isLoaded ? `url(${background})` : 'none',
    backgroundColor: isLoaded ? 'transparent' : '#ccc',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: `rotate(${angle}deg) translateY(${radius}rem) rotate(-${angle}deg) scale(${scale})`,
  }

  return <div className={className} style={style} role='group' aria-roledescription='slide' aria-label={label} aria-hidden={hidden} />
})

LazySlide.displayName = 'LazySlide'
