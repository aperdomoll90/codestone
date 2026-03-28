'use client'
import React from 'react'
import styles from './About.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { RotatingGlobe } from '@/app/components/rotatingGlobe/RotatingGlobe'
import { DrawButton } from 'css-forge'
import { useTransitionRouter } from 'next-view-transitions'

const linksData = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adrian-perdomo-12997474/' },
  { label: 'GitHub', href: 'https://github.com/aperdomoll90' },
  { label: 'CodePen', href: 'https://codepen.io/fuzzy-wolfpup/collections/' },
  { label: 'Resume', href: '/resume' },
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
  const router = useTransitionRouter()

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return
    }
    e.preventDefault()
    router.push(href)
  }

  const itemFontSizes = {
    default: '1rem',
    md: '.8rem',
    lg: '1rem',
  }
  return (
    <div className={styles['c-about']}>
      <section className={styles['c-about__main']}>
        <div className={styles['c-about__main-hero']}>
          <h1>Bridging code & creativity together</h1>
        </div>

        <div className={styles['c-about__main-bio']}>
          <p className={styles['c-about__main-bio-text']}>
            I&apos;m Adrian, a full-stack engineer with a passion for animations, accessibility, and performance. Whether it&apos;s pixel-perfect
            micro-interactions or serverless APIs, I partner with clients to push every project to new frontiers always putting quality and
            inclusivity first.
          </p>
          <div className={styles['c-about__main-bio-links']}>
            {linksData.map((link) => (
              <DrawButton
                key={link.href}
                href={link.href}
                variant='underline'
                fontSize={itemFontSizes}
                onClick={(e) => handleNavigate(link.href, e)}>
                {link.label}
              </DrawButton>
            ))}
          </div>
        </div>
      </section>

      <CurvedSection className={styles['c-about__services']} scaleFrom={30} scaleTo={10}>
        <h2 className={styles['c-about__services-title']}>I can help you with ...</h2>

        <div className={styles['c-about__services-grid']}>
          {servicesData.map((service, serviceIndex) => (
            <div data-index={`0${serviceIndex + 1}`} key={service.title} className={styles['c-about__services-grid-item']}>
              <h3 className={styles['c-about__services-grid-item-title']}>{service.title}</h3>
              <p className={styles['c-about__services-grid-item-desc']}>{service.description}</p>
            </div>
          ))}
        </div>

        <div className={styles['c-about__services-globe']}>
          <RotatingGlobe />
        </div>
      </CurvedSection>
    </div>
  )
}
