'use client'
import React from 'react'
import Image from 'next/image'
import styles from './Hero.module.scss'
import Ribbon from '@/app/components/ribbon/Ribbon'
import { Marquee } from '@/app/components/marquee/Marquee'

const arrowSvg = (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1 1L21 21M21 21V5.5M21 21H5.5' stroke='white' stroke-width='2' />
  </svg>
)

export const Hero = () => {
  return (
    <section className={`${styles['c-hero']}`}>
      <Ribbon className={`${styles['c-hero__ribbon']}`} />
      <div className={`${styles['c-hero__occupation']}`}>
        {arrowSvg}
        <h4>
          Full-Stack <br /> Software Engineer
        </h4>
      </div>

      <div className={`${styles['c-hero__banner']}`}>
        <Marquee />
      </div>
      <Image className={`${styles['c-hero__portrait']}`} src='/me.png' alt='me' width={400} height={500} />
    </section>
  )
}
