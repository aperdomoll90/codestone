'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ProjectGrid.module.scss'
import { Project } from './types'
import { useMagnetize } from 'css-forge'
import { useTransitionRouter } from 'next-view-transitions'

type ViewMode = 'list' | 'grid'
type GridLayout = 'square' | 'banner'

interface IProjectGridProps {
  headers: string[]
  projects: Project[]
  viewMode: ViewMode
  gridLayout?: GridLayout
  enableHoverPreview?: boolean
}

export function ProjectGrid({
  headers,
  projects,
  viewMode,
  gridLayout = 'square',
  enableHoverPreview,
}: IProjectGridProps) {
  const router = useTransitionRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove: magnetizeMouseMove, handleMouseLeave: magnetizeMouseLeave } = useMagnetize({
    areaRef: contentRef,
    targets: [
      {
        selector: `.${styles['c-project-grid__preview']}`,
        options: {
          followLerpFactor: 0.08,
          intensity: 1,
          clampWithinArea: true,
          maxTravelPercent: 1000,
          cursorOffsetPercent: { x: 0, y: 25 },
          returnSpring: { stiffness: 14, damping: 12, precision: 0.01 },
        },
      },
    ],
  })

  const { handleMouseMove: magnetizeLabelMove, handleMouseLeave: magnetizeLabelLeave } = useMagnetize({
    areaRef: previewRef,
    targets: [
      {
        selector: `.${styles['c-project-grid__preview-label']}`,
        options: {
          followLerpFactor: 0.08,
          intensity: 1,
          clampWithinArea: true,
          maxTravelPercent: 300,
          cursorOffsetPercent: { x: 0, y: 0 },
          returnSpring: { stiffness: 14, damping: 12, precision: 0.01 },
        },
      },
    ],
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    setHoveredIndex(index)
    if (enableHoverPreview) {
      magnetizeMouseMove(e)
      magnetizeLabelMove(e)
    }
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    magnetizeMouseLeave()
    magnetizeLabelLeave()
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (project.isExternal) return
    e.preventDefault()
    router.push(project.href)
  }

  return (
    <>
      <section className={styles['c-project-grid']} data-view={viewMode}>
        <div className={styles['c-project-grid__header']}>
          {headers.map((header) => (
            <span key={header}>{header}</span>
          ))}
        </div>

        <div ref={contentRef} className={styles['c-project-grid__content']}>
          {projects.map((project, projectIndex) => (
            <a
              key={project.href}
              href={project.href}
              target={project.isExternal ? '_blank' : undefined}
              rel={project.isExternal ? 'noopener noreferrer' : undefined}
              className={styles['c-project-grid__item']}
              style={{ '--project-image': `url(${project.image})` } as React.CSSProperties}
              data-view={viewMode}
              data-layout={gridLayout}
              data-hovered={hoveredIndex === projectIndex}
              onMouseMove={e => handleMouseMove(e, projectIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={e => handleClick(e, project)}>
              <span>{project.name}</span>
              <span>{project.location}</span>
              <span>{project.services}</span>
              <span>{project.year}</span>
            </a>
          ))}

          {/* Hover preview - inside content for magnetize to work */}
          {enableHoverPreview && viewMode === 'list' && (
            <div
              ref={previewRef}
              className={styles['c-project-grid__preview']}
              data-visible={hoveredIndex !== null}>
              <div
                className={styles['c-project-grid__preview-images']}
                style={{ '--active-index': hoveredIndex ?? 0 } as React.CSSProperties}>
                {projects.map((project) => (
                  <Image key={project.image} src={project.image} alt={project.name} width={300} height={200} />
                ))}
              </div>
              <span className={styles['c-project-grid__preview-label']}>View</span>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
