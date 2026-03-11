'use client'
import { useState } from 'react'
import styles from './Work.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { ProjectGrid } from './ProjectGrid'
import { npmProjects, mobileProjects } from '../data/projects'
import { ListViewIcon, GridViewIcon } from '@/app/constants/icons'

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
            type="button"
            className={styles['c-work__header-toggler-btn']}
            data-active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            aria-label='List view'>
            {ListViewIcon}
          </button>
          <button
            type="button"
            className={styles['c-work__header-toggler-btn']}
            data-active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            aria-label='Grid view'>
            {GridViewIcon}
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
