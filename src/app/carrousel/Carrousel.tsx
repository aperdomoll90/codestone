'use client'
import React, { useState, useCallback, useMemo, useRef, Suspense, useEffect } from 'react'
import './styles.css'

const demo = '../../carouselassets/demo.png'
const github = '../../carouselassets/github.png'

interface Slide {
  fullBackground: string
  slideBackground: string
  project: string
  content: string
  liveLink: string
  githubLink: string
}

interface LazySlideProps {
  background: string
  size: string
  radius: number
  angle: number
  scale: number
  className: string
  label: string
  hidden: boolean
}

const LazySlide: React.FC<LazySlideProps> = React.memo(({ background, size, radius, angle, scale, className, label, hidden }) => {
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

interface CarouselProps {
  slides: Slide[]
  size?: number
}

export const Carousel: React.FC<CarouselProps> = ({ slides, size = 70 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slidesCount = slides.length

  const moveToSlide = useCallback(
    (targetIndex: number) => {
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
    },
    [currentSlide, isAnimating, slidesCount]
  )

  const visibleSlides = useMemo(
    () =>
      [-2, -1, 0, 1, 2].map(offset => ({
        index: (currentSlide + offset + slidesCount) % slidesCount,
        position: offset,
      })),
    [currentSlide, slidesCount]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        moveToSlide(index)
      }
    },
    [moveToSlide]
  )

  const activeSlide = slides[currentSlide]

  return (
    <div
      className='slideshow'
      role='region'
      aria-roledescription='carousel'
      aria-label='Project Carousel'
      style={{
        backgroundImage: `url(${activeSlide.fullBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className='info-container'>
        <div className='project-info'>
          <h2>{activeSlide.project}</h2>
          <p>{activeSlide.content}</p>
          <div className='project-links'>
            <button
              onClick={() => window.open(activeSlide.liveLink, '_blank', 'noopener,noreferrer')}
              aria-label={`View live demo of ${activeSlide.project}`}
              className='project-button live-demo-button'
              style={{ backgroundImage: `url(${demo})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <span>Live Demo</span>
            </button>
            <button
              onClick={() => window.open(activeSlide.githubLink, '_blank', 'noopener,noreferrer')}
              aria-label={`View GitHub repository for ${activeSlide.project}`}
              className='project-button github-button'
              style={{ backgroundImage: `url(${github})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
      <div className='carousel-container'>
        {/* <div className='carousel' ref={carouselRef}  style={{ height: `${size}rem`, width: `${size}rem` }}> */}
        <div className='carousel' ref={carouselRef}  style={{ height: `150%`, width: `150%` }}>
          {visibleSlides.map(({ index, position }) => (
            <Suspense key={`slide-${index}`} fallback={<div style={{ width: `${size * 0.06}rem`, height: `${size * 0.06}rem` }} />}>
              <LazySlide
                background={slides[index].slideBackground}
                size={`${size * 0.06}rem`}
                radius={size / (position === 0 ? 1.8 : 1.95)}
                angle={position * 54 + 141}
                scale={position === 0 ? 5 : 2.5}
                className={`slide ${position === 0 ? 'slide-active' : ''}`}
                label={`Slide ${index + 1} of ${slidesCount}, ${slides[index].project}`}
                hidden={position !== 0}
              />
            </Suspense>
          ))}
        </div>
        <div className='controls' role='tablist' aria-label='Carousel Controls'>
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => moveToSlide(index)}
              onKeyDown={e => handleKeyDown(e, index)}
              aria-selected={index === currentSlide}
              aria-controls={`slide-${index}`}
              aria-label={`Go to slide ${index + 1}, ${slide.project}`}
              role='tab'
              tabIndex={index === currentSlide ? 0 : -1}
              className={`control ${index === currentSlide ? 'control-active' : ''}`}
              style={{
                backgroundImage: `url(${slide.slideBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
