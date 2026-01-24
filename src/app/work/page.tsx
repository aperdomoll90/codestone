'use client'
import React, { useState } from 'react'
import styles from './Work.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { ProjectGrid } from './ProjectGrid'
import { npmProjects, mobileProjects } from '../data/projects'

export default function Work() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  return (
    <CurvedSection
      className={styles['c-work']}
      animationRange='70% 100%'
      scaleFrom={10}
      scaleTo={2}
      background='var(--white)'
      curveBackground='var(--white)'>
      <section className={styles['c-work__header']}>
        <h1 className={styles['c-work__header--title']}>Building digital products that set new standards</h1>
        <div className={styles['c-work__header-toggler']}>
          <button
            className={styles['c-work__header-toggler-btn']}
            data-active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            aria-label='List view'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <line x1='4' y1='6' x2='20' y2='6' stroke='currentColor' strokeWidth='1' />
              <line x1='4' y1='12' x2='20' y2='12' stroke='currentColor' strokeWidth='1' />
              <line x1='4' y1='18' x2='20' y2='18' stroke='currentColor' strokeWidth='1' />
            </svg>
          </button>
          <button
            className={styles['c-work__header-toggler-btn']}
            data-active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            aria-label='Grid view'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <rect x='4' y='4' width='6' height='6' stroke='currentColor' strokeWidth='1' />
              <rect x='14' y='4' width='6' height='6' stroke='currentColor' strokeWidth='1' />
              <rect x='4' y='14' width='6' height='6' stroke='currentColor' strokeWidth='1' />
              <rect x='14' y='14' width='6' height='6' stroke='currentColor' strokeWidth='1' />
            </svg>
          </button>
        </div>
      </section>
      <ProjectGrid headers={['Mobile Project', 'Platform', 'Description', 'Year']} projects={mobileProjects} viewMode={viewMode} gridLayout='banner' />

      <ProjectGrid
        headers={['Open-Source npm Library', 'Platform', 'Description', 'Year']}
        projects={npmProjects}
        viewMode={viewMode}
        gridLayout='square'
        enableHoverPreview
      />

    </CurvedSection>
  )
}
