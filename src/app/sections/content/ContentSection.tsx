'use client'
import React from 'react'
import styles from './ContentSection.module.scss'
import { AboutSection } from './about/AboutSection'
import { WorkSection } from './work/WorkSection'

export const ContentSection = () => {
  return <section className={`${styles['c-content-section']}`}>
    <AboutSection />
    <WorkSection/>
  </section>
}
