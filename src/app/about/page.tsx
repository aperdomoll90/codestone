'use client'
import React from 'react'
import styles from './About.module.css'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'

const LINKS = [
  { href: 'https://www.linkedin.com/in/adrian-perdomo-12997474/', src: '/linkedin.png', alt: 'LinkedIn Profile' },
  { href: 'https://github.com/aperdomoll90', src: '/github.png', alt: 'GitHub Profile' },
  { href: '#', src: '/cv.png', alt: 'View CV' },
  { href: '#', src: '/cvdownload.png', alt: 'Download CV' },
]

export default function About() {
  return (
    <CurvedSection
      className={styles['c-about']}
      background="var(--white)"
      curveBackground="var(--charcoal)"
      animationRange="70% 100%"
      scaleFrom={30}
      scaleTo={0}
    >
      test
    </CurvedSection>
  )
}
