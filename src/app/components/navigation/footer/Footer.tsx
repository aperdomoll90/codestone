'use client'

import React from 'react'
import styles from './Footer.module.scss'
import { DrawButton } from '@/app/components/drawButton/DrawButton'

interface FontSizes {
  default?: string
  sm?: string
  md?: string
  mdx?: string
  lg?: string
}

interface FooterProps {
  linkFontSizes?: FontSizes
}

const linkFontSizes = {
  default: '0.8rem',
  sm: '0.85rem',
  md: '0.9rem',
  mdx: '1rem',
  lg: '1.125rem',
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={styles['c-footer']}>
      <div
        style={{ '--label': `'Contact Details'` } as React.CSSProperties}
        className={styles['c-footer__group']}
      >
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
            '--fs-default': linkFontSizes?.default,
            '--fs-sm': linkFontSizes?.sm,
            '--fs-md': linkFontSizes?.md,
            '--fs-mdx': linkFontSizes?.mdx,
            '--fs-lg': linkFontSizes?.lg,
          } as React.CSSProperties
        }
        className={styles['c-footer__group']}
      >
        <span className={styles['c-footer__text']}>
          2025 © Edition
        </span>
      </div>

      {/* Social */}
      <div
        style={{ '--label': `'Social'` } as React.CSSProperties}
        className={styles['c-footer__group']}
      >
        <DrawButton
          href='https://www.linkedin.com/in/adrian-perdomo-12997474/'
          fontSize={linkFontSizes}
        >
          LinkedIn
        </DrawButton>
      </div>
    </div>
  )
}
