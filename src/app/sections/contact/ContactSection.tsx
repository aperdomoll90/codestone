'use client'
import React from 'react'
import styles from './ContactSection.module.scss'
import { FrenchBulldog } from './FrenchBulldog'
import { DrawButton } from '@/app/components/drawButton/DrawButton'

const linkFontSizes = {
  default: '0.8rem',
  sm: '0.85rem',
  md: '0.9rem',
  mdx: '1rem',
  lg: '1.125rem',
}

export const ContactSection = () => {
  return (
    <section id="c-contact" className={styles['c-contact-section']}>
      <div className={styles['c-contact-section__header']}>
        <h2 className={styles['c-contact-section__header--title']}>
          Let's start a<br />
          project together
        </h2>
        <FrenchBulldog />
      </div>

      <div className={styles['c-contact-section__info']}>
        <div style={{ '--label': `'Contact Details'` } as React.CSSProperties} className={styles['c-contact-section__info--group']}>
          <DrawButton href='mailto:aperdomoll90@gmail.com' fontSize={linkFontSizes}>
            aperdomoll90@gmail.com
          </DrawButton>
          <DrawButton href='tel:+13052020222' fontSize={linkFontSizes}>
            +1 305 343 9033
          </DrawButton>
        </div>

        <div
          style={
            {
              '--label': `'Version'`,
              '--fs-default': linkFontSizes.default,
              '--fs-sm': linkFontSizes.sm,
              '--fs-md': linkFontSizes.md,
              '--fs-mdx': linkFontSizes.mdx,
              '--fs-lg': linkFontSizes.lg,
            } as React.CSSProperties
          }
          className={styles['c-contact-section__info--group']}>
          <span className={styles['c-contact-section__info--text']}>2025 © Edition</span>
        </div>

        <div style={{ '--label': `'Social'` } as React.CSSProperties} className={styles['c-contact-section__info--group']}>
          <DrawButton href='https://www.linkedin.com/in/adrian-perdomo-12997474/' fontSize={linkFontSizes}>
            LinkedIn
          </DrawButton>
        </div>
      </div>
    </section>
  )
}
