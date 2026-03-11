'use client'
import Image from 'next/image'
import styles from './Project.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { DrawButton } from 'css-forge'
import { ProjectDetail } from '../../data/projects'

export default function ProjectContent({ project }: { project: ProjectDetail | undefined }) {
  return (
    <section className={styles['c-project']}>
      <CurvedSection className={styles['c-project__hero']} animationRange='0% 30%' scaleFrom={30} scaleTo={0}>
        {!project ? (
          <h1>Project not found</h1>
        ) : (
          <>
            <h1 className={styles['c-project__hero-title']}>{project.name}</h1>
            <div className={styles['c-project__hero-header']}>
              {['Role/Service', 'Location', 'Year'].map((header) => (
                <span key={header}>{header}</span>
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
          <div className={styles['c-project__content-media-wrapper']}>
            {project.video ? (
              <video
                src={project.video}
                className={styles['c-project__content-video']}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <>
                <Image src={project.image} alt={project.name} width={800} height={500} className={styles['c-project__content-image']} />
                <div className={styles['c-project__content-image-buttons']}>
                  {project.githubUrl && (
                    <DrawButton variant='underline' href={project.githubUrl} target='_blank'>
                      GitHub
                    </DrawButton>
                  )}
                  {project.npmUrl && (
                    <DrawButton variant='underline' href={project.npmUrl} target='_blank'>
                      NPM
                    </DrawButton>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles['c-project__content-info']}>
            <div data-title='Overview' className={styles['c-project__content-info-section']}>
              <p>{project.overview}</p>
            </div>

            <div data-title='Key Features & Highlights' className={styles['c-project__content-info-section']}>
              <ul className={styles['c-project__list']}>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div data-title='Tech Stack & Your Role' className={styles['c-project__content-info-section']}>
              {project.techStack.map((stack) => (
                <div key={stack.category} data-header={stack.category} className={styles['c-project__content-info-section-tech']}>
                  <ul className={styles['c-project__list']}>
                    {stack.items.map((item) => (
                      <li key={item}>{item}</li>
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
