'use client'
import React from 'react'
import styles from './ContactSection.module.scss'
import { FrenchBulldog } from './FrenchBulldog'

export const ContactSection = () => {
  return (
    <section id='c-contact' className={styles['c-contact-section']}>
      <div className={styles['c-contact-section__header']}>
        <h2 className={styles['c-contact-section__header--title']}>
          Let&apos;s start a<br />
          project together
        </h2>
        <FrenchBulldog />
      </div>
    </section>
  )
}
