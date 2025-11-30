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
        <p className={`${styles['c-about-section_content-secondary']}`}>
          With equal parts creativity, code, and interaction insight, I offer a truly multifaceted approach.
        </p>
      </div>

      <div className={`${styles['c-about-section_container']}`}>
        <BubbleButton
          label='About Me'
          fontSize={{
            default: '1rem',
            md: '1.8rem',
            lg: '2.2rem',
          }}
          padding={{
            default: '2rem',
            lg: '3rem',
          }}
          className={`${styles['c-about-section_container-aboutme']}`}
        />
        <BubbleButton
          label='CodePen'
          href='https://codepen.io/fuzzy-wolfpup/collections/'
          fontSize={{
            default: '.8rem',
            md: '1.5rem',
            lg: '2rem',
          }}
          padding={{
            default: '1.4rem',
            md: '2rem',
          }}
          className={`${styles['c-about-section_container-codepen']}`}
        />

        <div className={`${styles['c-about-section_container-featured']}`}>
          <p>point-focus</p>

          <BubbleButton
            label='GitHub'
            href='https://github.com/aperdomoll90'
            fontSize={{
              default: '.8rem',
              md: '1.6rem',
              lg: '2rem',
            }}
            padding={{
              default: '1.3rem',
            }}
            className={`${styles['c-about-section_container-featured-github']}`}
          />

          <BubbleButton
            label='npm'
            href='https://www.npmjs.com/~aperdomoll90'
            fontSize={{
              default: '.9rem',
              md: '1.1rem',
              lg: '1.6rem',
            }}
            className={`${styles['c-about-section_container-featured-npm']}`}
          />
        </div>
      </div>
    </section>
  )
}
