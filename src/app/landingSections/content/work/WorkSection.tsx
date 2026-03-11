'use client'
import React from 'react'
import styles from './WorkSection.module.scss'
import { WorkCarousel, ProjectItem } from '@/app/components/workCarousel/WorkCarousel'
import { BubbleButton } from 'css-forge'
import { useTransitionRouter } from 'next-view-transitions'

const projectsRow1: ProjectItem[] = [
  { id: 'css-forge-1', title: 'css-forge', image: '/cssforge.png', href: 'https://www.npmjs.com/package/css-forge' },
  { id: 'csv-conductor-1', title: 'csv-conductor', image: '/csvconductor.png', href: 'https://www.npmjs.com/package/csv-conductor' },
  { id: 'point-focus-1', title: 'point-focus', image: '/ant.png', href: 'https://www.npmjs.com/package/point-focus' },
  { id: 'css-forge-2', title: 'css-forge', image: '/cssforge.png', href: 'https://www.npmjs.com/package/css-forge' },
  { id: 'csv-conductor-2', title: 'csv-conductor', image: '/csvconductor.png', href: 'https://www.npmjs.com/package/csv-conductor' },
  { id: 'point-focus-2', title: 'point-focus', image: '/ant.png', href: 'https://www.npmjs.com/package/point-focus' },
]

const projectsRow2: ProjectItem[] = [
  { id: 'csv-conductor-3', title: 'csv-conductor', image: '/csvconductor.png', href: 'https://www.npmjs.com/package/csv-conductor' },
  { id: 'point-focus-3', title: 'point-focus', image: '/ant.png', href: 'https://www.npmjs.com/package/point-focus' },
  { id: 'css-forge-3', title: 'css-forge', image: '/cssforge.png', href: 'https://www.npmjs.com/package/css-forge' },
  { id: 'csv-conductor-4', title: 'csv-conductor', image: '/csvconductor.png', href: 'https://www.npmjs.com/package/csv-conductor' },
  { id: 'point-focus-4', title: 'point-focus', image: '/ant.png', href: 'https://www.npmjs.com/package/point-focus' },
  { id: 'css-forge-4', title: 'css-forge', image: '/cssforge.png', href: 'https://www.npmjs.com/package/css-forge' },
]

export const WorkSection = () => {
  const router = useTransitionRouter()

  const handleNavigate = () => {
    router.push('/work')
  }

  return (
    <section id="c-work" className={styles['c-work-section']}>
      <div className={styles['c-work-section__carousels']}>
        <WorkCarousel projects={projectsRow1} direction='left' />
        <WorkCarousel projects={projectsRow2} direction='right' />
      </div>

        <BubbleButton
          label='More Work'
          onClick={handleNavigate}
          className={styles['c-work-section__button']}
          fontSize={{ default: '0.7rem', md: '1rem', mdx: '1.1rem', lg: '1.3rem' }}
          padding={{ default: '1rem', md: '2rem', mdx: '2.5rem' }}
          magnetArea={{ default: '0', mdx: '3rem' }}
        />
    </section>
  )
}
