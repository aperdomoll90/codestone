'use client'
import React from 'react'
import styles from './ContentSection.module.scss'
import { AboutSection } from './about/AboutSection'
import { WorkSection } from './work/WorkSection'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'

export const ContentSection = () => {
  return (
    <CurvedSection
      className={styles['c-content-section']}
      background="var(--white)"
      curveBackground="var(--white)"
      animationRange="70% 100%"
      scaleFrom={30}
      scaleTo={0}
    >
      <AboutSection />
      <WorkSection />
    </CurvedSection>
  )
}
