'use client'
import React from 'react'
import styles from './About.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { FrenchBulldog } from '@/app/landingSections/contact/FrenchBulldog'
import { RotatingGlobe } from '@/app/components/rotatingGlobe/RotatingGlobe'
import BubbleButton from '@/app/components/bubbleButton/BubbleButton'

const educationData = [
  { title: 'Software Engineering Career Course', subtitle: 'Block Code 2023' },
  { title: 'EMT, Certification', subtitle: 'Palm Beach State College 2018' },
  { title: 'Bachelor of Science, Information Technology', subtitle: 'FP Paul Cesare Bonilla, Cuba 2008' },
]

const servicesData = [
  {
    title: 'Design & Interaction',
    description:
      'I translate concepts into beautiful, user-friendly interfaces—leveraging Figma, Tailwind CSS, Framer Motion, and Three.js to bring ideas to life through micro-animations and 3D experiences.',
  },
  {
    title: 'Front-End Development',
    description:
      'With React, Next.js, React Native, and TypeScript, I build responsive, high-performance applications, optimized for accessibility (WCAG) and delivered with clean, maintainable code.',
  },
  {
    title: 'Full-Stack & Infrastructure',
    description:
      'From Node.js/Express back-ends to MongoDB, Firestore, and AWS Lambda, I deliver end-to-end solutions complete with CI/CD pipelines, scalable hosting, and serverless functions.',
  },
]

export default function About() {
  return (
    <div className={styles['c-about']}>
      {/* Main content - white background */}
      <div className={styles['c-about__main']}>
        {/* Hero */}
        <section className={styles['c-about__hero']}>
          <div className={styles['c-about__hero-left']}>
            <h1 className={styles['c-about__title']}>
              Bridging code & creativity
              <br />
              together
            </h1>
            <span className={styles['c-about__arrow']}>↘</span>
          </div>
          <div className={styles['c-about__hero-right']}>
            <FrenchBulldog />
          </div>
        </section>

        {/* Bio section */}
        <section className={styles['c-about__bio']}>
          <div className={styles['c-about__bio-left']}>
            <p className={styles['c-about__bio-text']}>
              I'm Adrian, a full-stack engineer with a passion for animations, accessibility, and performance. Whether it's pixel-perfect micro-interactions or serverless APIs, I partner with clients to push every project to new frontiers always putting quality and inclusivity first.
            </p>

            <div className={styles['c-about__education']}>
              <h3 className={styles['c-about__section-title']}>Education & Certifications</h3>
              <ul className={styles['c-about__education-list']}>
                {educationData.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong> – {item.subtitle}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles['c-about__links']}>
              <BubbleButton
                label='LinkedIn ↗'
                href='https://www.linkedin.com/in/adrian-perdomo-12997474/'
                fontSize={{ default: '0.5rem', md: '0.6rem', lg: '0.7rem' }}
                padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
                magnetArea={{ default: '0', mdx: '2rem' }}
                className={styles['c-about__link-btn']}
              />
              <BubbleButton
                label='CodePen ↗'
                href='https://codepen.io/fuzzy-wolfpup/collections/'
                fontSize={{ default: '0.5rem', md: '0.6rem', lg: '0.7rem' }}
                padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
                magnetArea={{ default: '0', mdx: '2rem' }}
                className={styles['c-about__link-btn']}
              />
              <BubbleButton
                label='GitHub ↗'
                href='https://github.com/aperdomoll90'
                fontSize={{ default: '0.5rem', md: '0.6rem', lg: '0.7rem' }}
                padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
                magnetArea={{ default: '0', mdx: '2rem' }}
                className={styles['c-about__link-btn']}
              />
            </div>
          </div>

          <div className={styles['c-about__bio-right']}>
            <div className={styles['c-about__placeholder']} />
          </div>
        </section>

        {/* Services section */}
        <section className={styles['c-about__services']}>
          <h2 className={styles['c-about__services-title']}>
            I can help you with ...
          </h2>

          <div className={styles['c-about__services-grid']}>
            {servicesData.map((service, index) => (
              <div key={index} className={styles['c-about__service']}>
                <span className={styles['c-about__service-number']}>0{index + 1}</span>
                <h3 className={styles['c-about__service-title']}>{service.title}</h3>
                <p className={styles['c-about__service-desc']}>{service.description}</p>
              </div>
            ))}
          </div>

          <div className={styles['c-about__globe-container']}>
            <RotatingGlobe className={styles['c-about__globe']} color='var(--charcoal)' />
          </div>
        </section>
      </div>

      {/* Footer - curved charcoal section */}
      <CurvedSection
        className={styles['c-about__footer']}
        background='var(--charcoal)'
        curveBackground='var(--charcoal)'
        animationRange='90% 100%'
        scaleFrom={30}
        scaleTo={30}
      >
        <div className={styles['c-about__footer-content']}>
          <div className={styles['c-about__footer-left']}>
            <span className={styles['c-about__footer-label']}>Version</span>
            <span className={styles['c-about__footer-value']}>2025 © Edition</span>
          </div>
          <div className={styles['c-about__footer-center']}>
            <span className={styles['c-about__footer-label']}>Contact Details</span>
            <span className={styles['c-about__footer-value']}>john@doe.com</span>
            <span className={styles['c-about__footer-value']}>+1 305 202 0222</span>
          </div>
          <div className={styles['c-about__footer-right']}>
            <span className={styles['c-about__footer-label']}>Social</span>
            <div className={styles['c-about__footer-links']}>
              <a href='https://codepen.io/fuzzy-wolfpup/collections/' target='_blank' rel='noopener noreferrer'>CodePen</a>
              <a href='https://github.com/aperdomoll90' target='_blank' rel='noopener noreferrer'>Github</a>
              <a href='https://www.linkedin.com/in/adrian-perdomo-12997474/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
            </div>
          </div>
        </div>
      </CurvedSection>
    </div>
  )
}
