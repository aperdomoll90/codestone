'use client'
import React from 'react'
import styles from './ContentSection.module.scss'
import { AboutSection } from '../about/AboutSection'

export const ContentSection = () => {
  return <section className={`${styles['c-content-section']}`}>
    <AboutSection/>
  </section>
}
