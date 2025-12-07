'use client'
import React from 'react'
import styles from './ContentSection.module.scss'
import { AboutSection } from './about/AboutSection'
import { WorkSection } from './work/WorkSection'

export const ContentSection = () => {
  return (
    <section className={styles['c-content-section']}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="content-curve" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.5 C0.75,1 0.25,1 0,0.5 L0,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <AboutSection />
      <WorkSection />
    </section>
  )
}
