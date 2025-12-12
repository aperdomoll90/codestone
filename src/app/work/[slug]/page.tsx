'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import styles from './Project.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import BubbleButton from '@/app/components/bubbleButton/BubbleButton'
import { getProjectBySlug } from '../../data/projects'

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)

  return (
    <section className={styles['c-project']}>
      <CurvedSection className={styles['c-project__hero']} animationRange='0% 30%' scaleFrom={30} scaleTo={0}>
        {!project ? (
          <h1>Project not found</h1>
        ) : (
          <>
            <h1 className={styles['c-project__hero-title']}>{project.name}</h1>
            <div className={styles['c-project__hero-header']}>
              {['Role/Service', 'Location', 'Year'].map((header, index) => (
                <span key={index}>{header}</span>
              ))}
            </div>
            <div className={styles['c-project__hero-info']}>
              <span>{project.services}</span>
              <span>{project.location}</span>
              <span>{project.year}</span>
            </div>
          </>
        )}
      </CurvedSection>
      {project && (
        <section className={styles['c-project__content']}>
          <img src={project.image} alt={project.name} className={styles['c-project__content-image']} />

          {/* Content Section */}
          <div className={styles['c-project__content-info']}>
            {/* Overview */}
            <div data-title='Overview' className={styles['c-project__content-info-section']}>
              <p>{project.overview}</p>
            </div>

            {/* Features & Tech Stack */}
            <div data-title='Key Features & Highlights' className={styles['c-project__content-info-section']}>
              <ul className={styles['c-project__list']}>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div data-title='Tech Stack & Your Role' className={styles['c-project__content-info-section']}>
              {project.techStack.map((stack, index) => (
                <div key={index} data-header={stack.category} className={styles['c-project__content-info-section-tech']}>
                  <ul>
                    {stack.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  )
}
