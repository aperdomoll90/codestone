'use client'
import React from 'react'
import styles from './AboutSection.module.scss'
import { BubbleButton } from 'css-forge'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/app/components/loadingScreen/LoadingContext'

export const AboutSection = () => {
  const router = useRouter()
  const { startLoading } = useLoading()

  const handleNavigateAbout = () => {
    startLoading()
    setTimeout(() => {
      router.push('/about')
    }, 50)
  }

  return (
    <section id="c-about" className={`${styles['c-about-section']}`}>
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
          href='/about'
          onClick={handleNavigateAbout}
          fontSize={{
            default: '1.2rem',
            md: '1.7rem',
            mdx: '1.5rem',
            lg: '2.2rem',
          }}
          padding={{
            default: '2rem',
            md: '3rem',
            mdx: '2.5rem',
          }}
          magnetArea={{
            default: '0',
            mdx: '4rem',
          }}
          className={`${styles['c-about-section_container-aboutme']}`}
        />
        <BubbleButton
          label='CodePen'
          href='https://codepen.io/fuzzy-wolfpup/collections/'
          fontSize={{
            default: '1.1rem',
            md: '1.6rem',
            mdx: '1.5rem',
            lg: '2rem',
          }}
          padding={{
            default: '1.4rem',
            md: '2rem',
          }}
          magnetArea={{
            default: '0',
            mdx: '4rem',
          }}
          className={`${styles['c-about-section_container-codepen']}`}
        />
        <BubbleButton
          label='Resume'
          href='/resume'
          onClick={() => {
            startLoading()
            setTimeout(() => {
              router.push('/resume')
            }, 50)
          }}
          fontSize={{
            default: '1.2rem',
            md: '1.5rem',
            mdx: '1.2rem',
            lg: '1.6rem',
          }}
          padding={{
            default: '1.2rem',
            md: '1.6rem',
          }}
          magnetArea={{
            default: '0',
            mdx: '4rem',
          }}
          className={`${styles['c-about-section_container-resume']}`}
        />

        <BubbleButton
          label='GitHub'
          href='https://github.com/aperdomoll90'
          fontSize={{
            default: '.8rem',
            md: '1.3rem',
            mdx: '1.6rem',
            lg: '2rem',
          }}
          padding={{
            default: '1.3rem',
          }}
          magnetArea={{
            default: '0',
            mdx: '4rem',
          }}
          className={`${styles['c-about-section_container-github']}`}
        />
        <BubbleButton
          label='npm'
          href='https://www.npmjs.com/~aperdomoll90'
          fontSize={{
            default: '.9rem',
            mdx: '1.1rem',
            lg: '1.6rem',
          }}
          magnetArea={{
            default: '0',
            mdx: '4rem',
          }}
          className={`${styles['c-about-section_container-npm']}`}
        />
      </div>
    </section>
  )
}
