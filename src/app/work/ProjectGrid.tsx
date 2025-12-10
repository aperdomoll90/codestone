'use client'
import React, { useState } from 'react'
import styles from './ProjectGrid.module.scss'
import { Project } from './types'

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
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent, projectId: string) => {
    if (!enableHoverPreview) return
    setMousePos({ x: e.clientX, y: e.clientY })
    setHoveredProject(projectId)
  }

  const handleMouseLeave = () => {
    setHoveredProject(null)
  }

  const hoveredImage = projects.find(p => p.id === hoveredProject)?.image

  return (
    <>
      <section className={styles['c-project-grid']} data-view={viewMode}>
        <div className={styles['c-project-grid__header']}>
          {headers.map((header, index) => (
            <span key={index}>{header}</span>
          ))}
        </div>

        <div className={styles['c-project-grid__content']}>
          {projects.map(project => (
            <a
              key={project.id}
              href={project.href}
              target={project.isExternal ? '_blank' : undefined}
              rel={project.isExternal ? 'noopener noreferrer' : undefined}
              className={styles['c-project-grid__item']}
              style={{ '--project-image': `url(${project.image})` } as React.CSSProperties}
              data-view={viewMode}
              data-layout={gridLayout}
              data-hovered={hoveredProject === project.id}
              onMouseMove={e => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}>
              <span>{project.name}</span>
              <span>{project.location}</span>
              <span>{project.services}</span>
              <span>{project.year}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Hover preview */}
      {enableHoverPreview && viewMode === 'list' && hoveredProject && hoveredImage && (
        <div
          className={styles['c-project-grid__preview']}
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}>
          <img src={hoveredImage} alt='Project preview' />
          <span className={styles['c-project-grid__preview-label']}>View</span>
        </div>
      )}
    </>
  )
}
