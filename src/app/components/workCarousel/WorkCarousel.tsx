'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import styles from './WorkCarousel.module.scss'
import { MagnetizeComponent } from '@/app/components/utils/MagnetizeComponent'

export interface ProjectItem {
  id: string
  title: string
  image: string
  href?: string
}

interface ProjectCardProps {
  project: ProjectItem
  ariaHidden?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, ariaHidden = false }) => {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove, handleMouseLeave } = MagnetizeComponent({
    areaRef: cardRef,
    targets: [
      {
        selector: `.${styles['c-carousel__item-button']}`,
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

  return (
    <div
      ref={cardRef}
      className={styles['c-carousel__item']}
      aria-hidden={ariaHidden}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles['c-carousel__item-media']}>
        <Image src={project.image} alt={project.title} width={400} height={250} className={styles['c-carousel__item-image']} />
        <span className={styles['c-carousel__item-title']}>{project.title}</span>
      </div>
      <a href={project.href || '#'} className={styles['c-carousel__item-button']}>
        View
      </a>
    </div>
  )
}

interface WorkCarouselProps {
  projects: ProjectItem[]
  direction?: 'left' | 'right'
}

export const WorkCarousel: React.FC<WorkCarouselProps> = ({ projects, direction = 'left' }) => {
  const isRight = direction === 'right'

  return (
    <div data-direction={direction} className={styles['c-carousel']}>
      <div className={styles['c-carousel__track']}>
        {isRight && projects.map((project, index) => (
          <ProjectCard key={`${project.id}-dup-${index}`} project={project} ariaHidden />
        ))}
        {projects.map((project, index) => (
          <ProjectCard key={`${project.id}-${index}`} project={project} />
        ))}
        {!isRight && projects.map((project, index) => (
          <ProjectCard key={`${project.id}-dup-${index}`} project={project} ariaHidden />
        ))}
      </div>
    </div>
  )
}
