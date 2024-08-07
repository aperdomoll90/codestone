'use client'
import React from 'react'
import styles from './Hero.module.css'
const me = '../../public/me.png'

export default function Hero() {
  return (
    <div id={styles.heroWrapper}>
      <p className={styles.heroMessage}>I am a Full-Stack Software Engineer from <br/> Fort Lauderdale, Florida</p>
      <h1 className={`${styles.heroTitle} ${styles.heroTitleOutline}`}>Adrian</h1>
      <img className={styles.heroImage} src='/me.png' alt='me' />
      <h1 className={styles.heroTitle}>Adrian</h1>
    </div>
  )
}
