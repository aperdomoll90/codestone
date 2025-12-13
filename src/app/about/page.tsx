'use client'
import React from 'react'
import styles from './About.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { FrenchBulldog } from '@/app/landingSections/contact/FrenchBulldog'
import { RotatingGlobe } from '@/app/components/rotatingGlobe/RotatingGlobe'
import BubbleButton from '@/app/components/bubbleButton/BubbleButton'
import Image from 'next/image'

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
      <section className={styles['c-about__main']}>
        <section className={styles['c-about__main-hero']}>
          <h1>
            Bridging code & creativity
            <br />
            together
          </h1>
          <span>↘</span>
          <FrenchBulldog />
        </section>

        <section className={styles['c-about__main-bio']}>
          <div className={styles['c-about__main-bio-column']}>
            <p className={styles['c-about__main-bio-text']}>
              I'm Adrian, a full-stack engineer with a passion for animations, accessibility, and performance. Whether it's pixel-perfect
              micro-interactions or serverless APIs, I partner with clients to push every project to new frontiers always putting quality and
              inclusivity first.
            </p>

            <ul data-header='Education & Certifications' className={styles['c-about__main-bio-education']}>
                {educationData.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong> – {item.subtitle}
                  </li>
                ))}
            </ul>

            <div className={styles['c-about__main-bio-links']}>
              <BubbleButton
                label='LinkedIn ↗'
                href='https://www.linkedin.com/in/adrian-perdomo-12997474/'
                fontSize={{ default: '0.5rem', md: '0.6rem', lg: '0.7rem' }}
                padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
                magnetArea={{ default: '0', mdx: '2rem' }}
              />
              <BubbleButton
                label='CodePen ↗'
                href='https://codepen.io/fuzzy-wolfpup/collections/'
                fontSize={{ default: '0.5rem', md: '0.6rem', lg: '0.7rem' }}
                padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
                magnetArea={{ default: '0', mdx: '2rem' }}
              />
              <BubbleButton
                label='GitHub ↗'
                href='https://github.com/aperdomoll90'
                fontSize={{ default: '0.5rem', md: '0.6rem', lg: '0.7rem' }}
                padding={{ default: '0.8rem', md: '1rem', lg: '1.2rem' }}
                magnetArea={{ default: '0', mdx: '2rem' }}
              />
            </div>
          </div>

          <Image src='/me.png' alt='portrait image' width={400} height={250} className={styles['c-about__main-bio-image']} />
        </section>
      </section>

      <CurvedSection className={styles['c-about__services']}  scaleFrom={50} scaleTo={50}>
        <h2 className={styles['c-about__services-title']}>I can help you with ...</h2>

        <div className={styles['c-about__services-grid']}>
          {servicesData.map((service, index) => (
            <div data-index={`0${index + 1}`} key={index} className={styles['c-about__services-grid-item']}>
              <h3 className={styles['c-about__services-grid-item-title']}>{service.title}</h3>
              <p className={styles['c-about__services-grid-item-desc']}>{service.description}</p>
            </div>
          ))}
        </div>

        <div className={styles['c-about__services-globe']}>
          <RotatingGlobe color='var(--charcoal)' />
        </div>
      </CurvedSection>
    </div>
  )
}
