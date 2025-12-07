'use client'
import React from 'react'
import styles from './About.module.css'

const LINKS = [
  { href: 'https://www.linkedin.com/in/adrian-perdomo-12997474/', src: '/linkedin.png', alt: 'LinkedIn Profile' },
  { href: 'https://github.com/aperdomoll90', src: '/github.png', alt: 'GitHub Profile' },
  { href: '#', src: '/cv.png', alt: 'View CV' },
  { href: '#', src: '/cvdownload.png', alt: 'Download CV' },
]

export default function About() {
  return <section className={`${styles['c-about']}`}>test</section>
}
