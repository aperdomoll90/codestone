'use client'
import React, { useState } from 'react'
import styles from './Work.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'

interface NpmProject {
  id: string
  name: string
  subtitle: string
  link: string
  year: string
  image: string
}

interface WebProject {
  id: string
  name: string
  location: string
  services: string
  year: string
  image: string
  href: string
}

const npmProjects: NpmProject[] = [
  {
    id: 'point-focus',
    name: 'point-focus',
    subtitle: 'Image Zoom & Focus React Component',
    link: 'https://www.npmjs.com/package/point-focus',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
  },
]

const webProjects: WebProject[] = [
  {
    id: 'five4free',
    name: 'Five4Free',
    location: 'USA',
    services: 'Design & Development',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
    href: '/work/five4free',
  },
  {
    id: 'posidon',
    name: 'Posidon',
    location: 'USA',
    services: 'Design & Development',
    year: '2020',
    image: '/carouselassets/djslide.png',
    href: '/work/posidon',
  },
  {
    id: 'wonderlust',
    name: 'Wonderlust',
    location: 'USA',
    services: 'Design & Development',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
    href: '/work/wonderlust',
  },
  {
    id: 'nymph',
    name: 'Nymph',
    location: 'USA',
    services: 'Design & Development',
    year: '2020',
    image: '/carouselassets/djslide.png',
    href: '/work/nymph',
  },
]

export default function Work() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const handleMouseMove = (e: React.MouseEvent, projectId: string) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setHoveredProject(projectId)
  }

  const handleMouseLeave = () => {
    setHoveredProject(null)
  }

  const hoveredImage = webProjects.find(p => p.id === hoveredProject)?.image

  return (
    <CurvedSection
      className={styles['c-work']}
      animationRange='70% 100%'
      scaleFrom={10}
      scaleTo={5}
      background='var(--white)'
      curveBackground='var(--white)'>
      <section className={styles['c-work__header']}>
        <h1 className={styles['c-work__header--title']}>
          Building digital products that
          <br />
          set new standards
        </h1>

        <div className={styles['c-work__view-toggler']}>
          <button
            className={styles['c-work__view-toggler-btn']}
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
            className={styles['c-work__view-toggler-btn']}
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

      {viewMode === 'list' ? (
        <>
          <section className={styles['c-work__section']}>
            <div className={styles['c-work__table-header']}>
              <span>Open-Source npm library</span>
              <span>Subtitle</span>
              <span>Link</span>
              <span>Year</span>
            </div>

            {npmProjects.map(project => (
              <a key={project.id} href={project.link} target='_blank' rel='noopener noreferrer' className={styles['c-work__table-row']}>
                <span className={styles['c-work__table-row--name']}>{project.name}</span>
                <span className={styles['c-work__table-row--subtitle']}>{project.subtitle}</span>
                <span className={styles['c-work__table-row--link']}>{project.link}</span>
                <span className={styles['c-work__table-row--year']}>{project.year}</span>
              </a>
            ))}
          </section>

          {/* Web Projects Table */}
          <section className={styles['c-work__section']}>
            <div className={styles['c-work__table-header']}>
              <span>Project</span>
              <span>Location</span>
              <span>Services</span>
              <span>Year</span>
            </div>

            {webProjects.map(project => (
              <a
                key={project.id}
                href={project.href}
                className={styles['c-work__table-row']}
                data-hovered={hoveredProject === project.id}
                onMouseMove={e => handleMouseMove(e, project.id)}
                onMouseLeave={handleMouseLeave}>
                <span className={styles['c-work__table-row--name']}>{project.name}</span>
                <span className={styles['c-work__table-row--location']}>{project.location}</span>
                <span className={styles['c-work__table-row--services']}>{project.services}</span>
                <span className={styles['c-work__table-row--year']}>{project.year}</span>
              </a>
            ))}
          </section>

          {/* Floating image preview */}
          {hoveredProject && hoveredImage && (
            <div
              className={styles['c-work__preview']}
              style={{
                left: mousePos.x,
                top: mousePos.y,
              }}>
              <img src={hoveredImage} alt='Project preview' />
              <span className={styles['c-work__preview--label']}>View</span>
            </div>
          )}
        </>
      ) : (
        <>
          {/* NPM Library Grid */}
          <section className={styles['c-work__section']}>
            <span className={styles['c-work__section-label']}>Open-Source npm library</span>
            <div className={styles['c-work__grid--npm']}>
              {npmProjects.map(project => (
                <a key={project.id} href={project.link} target='_blank' rel='noopener noreferrer' className={styles['c-work__card--npm']}>
                  <img src={project.image} alt={project.name} className={styles['c-work__card-image']} />
                  <div className={styles['c-work__card-overlay']}>
                    <span className={styles['c-work__card-title']}>
                      {project.name.split('-').map((word, i) => (
                        <span key={i}>
                          {word.charAt(0).toUpperCase() + word.slice(1)}
                          <br />
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className={styles['c-work__card-view']}>
                    <span>View</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Web Projects Grid */}
          <section className={styles['c-work__section']}>
            <span className={styles['c-work__section-label']}>Web Projects</span>
            <div className={styles['c-work__grid']}>
              {webProjects.map(project => (
                <a key={project.id} href={project.href} className={styles['c-work__card']}>
                  <img src={project.image} alt={project.name} className={styles['c-work__card-image']} />
                  <div className={styles['c-work__card-info']}>
                    <span className={styles['c-work__card-name']}>{project.name}</span>
                    <span className={styles['c-work__card-services']}>{project.services}</span>
                    <span className={styles['c-work__card-year']}>{project.year}</span>
                  </div>
                  <div className={styles['c-work__card-view']}>
                    <span>View</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </CurvedSection>
  )
}
