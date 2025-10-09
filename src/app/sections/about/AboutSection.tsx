'use client'
import React from 'react'
import styles from './AboutSection.module.scss'
import BubbleButton from '@/app/components/bubbleButton/BubbleButton'

export const AboutSection = () => {
  return (
    <section className={`${styles['c-about-section']}`}>
      <div className={`${styles['c-about-section_content']}`}>
        <p className={`${styles['c-about-section_content-message-primary']}`}>
          Together, we will craft an intuitive, accessible experience that speaks directly to your customers.
        </p>
        <p className={`${styles['c-about-section_content-secondary']}`}>With equal parts creativity, code, and interaction insight, I offer a truly multifaceted approach.</p>
      </div>

      <div className={`${styles['c-about-section_container']}`}>
        <BubbleButton label='Code Pen' size='md' className={`${styles['c-about-section_container-codepen']}`} />
        <BubbleButton label='About Me' size='lg' className={`${styles['c-about-section_container-aboutme']}`} />
      </div>
    </section>
  )
}
