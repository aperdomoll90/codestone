'use client'
import Image from 'next/image'
import styles from './Project.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { BubbleButton } from 'css-forge'
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
              {['Role/Service', 'Location', 'Year'].map((header, index) => (
                <span key={index}>{header}</span>
              ))}
            </div>
            <div className={styles['c-project__hero-info']}>
              <span>{project.services}</span>
              <span>{project.location}</span>
              <span>{project.year}</span>
            </div>

            <BubbleButton
              label='GitHub ↗'
              backgroundColor='--darkLavender'
              backgroundHoverColor='--lightLavender'
              href='https://github.com/aperdomoll90'
              fontSize={{ default: '0.5rem', md: '1rem' }}
              padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
              magnetArea={{ default: '0', mdx: '2rem' }}
              className={styles['c-project__hero-github']}
            />

            <BubbleButton
              label='Live Site ↗'
              backgroundColor='--darkLavender'
              backgroundHoverColor='--lightLavender'
              href='https://github.com/aperdomoll90'
              fontSize={{ default: '0.8rem', md: '1.5rem' }}
              padding={{ default: '0.8rem', md: '1rem' }}
              magnetArea={{ default: '0', mdx: '2rem' }}
              className={styles['c-project__hero-demo']}
            />
          </>
        )}
      </CurvedSection>
      {project && (
        <section className={styles['c-project__content']}>
          <Image src={project.image} alt={project.name} width={800} height={500} className={styles['c-project__content-image']} />

          <div className={styles['c-project__content-info']}>
            <div data-title='Overview' className={styles['c-project__content-info-section']}>
              <p>{project.overview}</p>
            </div>

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
                  <ul className={styles['c-project__list']}>
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
