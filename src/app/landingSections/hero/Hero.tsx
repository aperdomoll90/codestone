'use client'
import React from 'react'
import Image from 'next/image'
import styles from './Hero.module.scss'
import { Ribbon } from '@/app/components/ribbon/Ribbon'
import { Marquee } from '@/app/components/marquee/Marquee'
import { ArrowDownRightIcon } from '@/app/constants/icons'

export const Hero = () => {
  return (
    <section className={`${styles['c-hero']}`}>
      <Ribbon className={`${styles['c-hero__ribbon']}`} />
      <div className={`${styles['c-hero__occupation']}`}>
        {ArrowDownRightIcon}
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
