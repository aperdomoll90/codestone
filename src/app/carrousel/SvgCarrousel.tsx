'use client'
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import './styles.css'
import { slideData } from './page'

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

interface CarouselProps {
  slides: Slide[]
  size?: number
}

export const Carousel: React.FC<CarouselProps> = ({ slides, size = 70 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<SVGPathElement | null>(null)
  const slidesCount = slides.length

  const moveToSlide = useCallback(
    (targetIndex: number) => {
      if (isAnimating) return
      setIsAnimating(true)

      const diff = (targetIndex - currentSlide + slidesCount) % slidesCount
      const direction = diff > slidesCount / 2 ? -1 : 1
      let current = currentSlide

      const animate = () => {
        current = (current + direction + slidesCount) % slidesCount
        setCurrentSlide(current)

        if (current !== targetIndex) {
          setTimeout(animate, 300)
        } else {
          setIsAnimating(false)
        }
      }

      animate()
    },
    [currentSlide, isAnimating, slidesCount]
  )

  const visibleSlides = useMemo(() => {
    return [-2, -1, 0, 1, 2].map(offset => ({
      index: (currentSlide + offset + slidesCount) % slidesCount,
      position: offset,
    }))
  }, [currentSlide, slidesCount])

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

  // SVG path for the carousel
  const svgPath = 'M 0 -100 A 100 100 0 1 1 0 100 A 100 100 0 1 1 0 -100'

  useEffect(() => {
    if (carouselRef.current) {
      const pathLength = carouselRef.current.getTotalLength()
      slides.forEach((slide, index) => {
        const slideElement = document.getElementById(`slide-${index}`)
        if (slideElement) {
          const baseAngle = Math.PI / 1.2 // Start angle for visible slides
          const angleStep = (Math.PI * 2) / 6 // Divide the circle into 6 parts

          // Check if this slide is in the visible set
          const visibleSlideInfo = visibleSlides.find(vs => vs.index === index)

          let angle, scale, opacity, zIndex

          if (visibleSlideInfo) {
            // If it's a visible slide, calculate its position on the circle
            angle = baseAngle - visibleSlideInfo.position * angleStep
            scale = visibleSlideInfo.position === 0 ? 1.5 : Math.abs(visibleSlideInfo.position) === 1 ? 0.9 : 0.5
            opacity = 1
            // opacity = visibleSlideInfo.position === 0 ? 1 : 0.7
            zIndex = visibleSlideInfo.position === 0 ? 10 : Math.abs(visibleSlideInfo.position) === 1 ? 5 : 0
          } else {
            // If it's not visible, place it at the bottom of the circle
            angle = Math.PI / -6 // Bottom of the circle
            scale = 0.8 // Smaller scale for non-visible slides
            opacity = 0 // Hidden
            zIndex = -1
          }

          // Calculate position on the circle
          const x = Math.cos(angle) * 100 // 100 is the radius of the path
          const y = -Math.sin(angle) * 100 // Negative to invert the y-axis

          // Apply transformations
          slideElement.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
          slideElement.style.opacity = opacity.toString()
          slideElement.style.zIndex = zIndex.toString()
        }
      })
    }
  }, [visibleSlides, slides])

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
        <svg overflow='visible' width='100%' height='100%' viewBox='-70 -70 130 130' xmlns='http://www.w3.org/2000/svg' className='test'>
          <path ref={carouselRef} id='carouselPath' d={svgPath} fill='none' stroke='black' strokeWidth='1' />
          {slides.map((slide, index) => {
            return (
              <image
                key={`slide-${index}`}
                id={`slide-${index}`}
                href={slide.slideBackground}
                width={size * 0.6}
                height={size * 0.6}
                x={-size * 0.4}
                y={-size * 0.4}
                className={`slide ${index === currentSlide ? 'slide-active' : ''}`}
                style={{
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            )
          })}
        </svg>
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

export const SvgCarrousel = () => {
  return (
    <div id='svg-carrousel-wrapper'>
      <Carousel slides={slideData} size={70} />
    </div>
  )
}
