import React, { Suspense } from 'react'
import { Slide } from './CarrouselTypes'
import { LazySlide } from './LazySlide'

interface CarouselComponentProps {
  size: number
  slides: Slide[]
  visibleSlides: { index: number; position: number }[]
  slidesCount: number
  currentSlide: number
  moveToSlideCallback: (index: number) => void
  handleKeyDownCallback: (event: React.KeyboardEvent, index: number) => void
}

export const CarouselComponent: React.FC<CarouselComponentProps> = ({ size, slides, visibleSlides, slidesCount, currentSlide, moveToSlideCallback, handleKeyDownCallback }) => {
  return (
    <div className='carousel-container'>
      <div className='carousel' style={{ height: `${size}rem`, width: `${size}rem` }}>
        {visibleSlides.map(({ index, position }) => (
          <Suspense key={`slide-${index}`} fallback={<div style={{ width: `${size * 0.06}rem`, height: `${size * 0.06}rem` }} />}>
            <LazySlide
              background={slides[index].slideBackground}
              size={`${size * 0.06}rem`}
              radius={size / (position === 0 ? 1.8 : 1.95)}
              angle={position * 54 + 137}
              scale={position === 0 ? 4.2 : 2.5}
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
            onClick={() => moveToSlideCallback(index)}
            onKeyDown={e => handleKeyDownCallback(e, index)}
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
  )
}
