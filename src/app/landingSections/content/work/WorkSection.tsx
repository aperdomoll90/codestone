'use client'
import React from 'react'
import styles from './WorkSection.module.scss'
import { WorkCarousel, ProjectItem } from '@/app/components/workCarousel/WorkCarousel'
import BubbleButton from '@/app/components/bubbleButton/BubbleButton'

const projectsRow1: ProjectItem[] = [
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
]

const projectsRow2: ProjectItem[] = [
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
  { id: 'hiker', title: 'Hiker', image: '/carouselassets/hikerslide.png', href: '#' },
  { id: 'dj', title: 'DJ', image: '/carouselassets/djslide.png', href: '#' },
]

export const WorkSection = () => {
  return (
    <section id="c-work" className={styles['c-work-section']}>
      <div className={styles['c-work-section__carousels']}>
        <WorkCarousel projects={projectsRow1} direction='left' />
        <WorkCarousel projects={projectsRow2} direction='right' />
      </div>

        <BubbleButton
          label='More Work'
          href='#'
          className={styles['c-work-section__button']}
          fontSize={{ default: '0.7rem', md: '1rem', mdx: '1.1rem', lg: '1.3rem' }}
          padding={{ default: '1rem', md: '2rem', mdx: '2.5rem' }}
          magnetArea={{ default: '0', mdx: '3rem' }}
        />
    </section>
  )
}
