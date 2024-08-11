'use client'
import React, { useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const areaRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMov = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = areaRef.current
    if (area) {
      const width = area.clientWidth
      const height = area.clientHeight

      const titles = document.querySelectorAll<HTMLElement>('.hero-title')

      titles.forEach(title => {
        const speed = title.getAttribute('data-speed')
        if (speed !== null) {
          const x = (e.nativeEvent.offsetX / width) * Number(speed)
          const y = (e.nativeEvent.offsetY / height) * Number(speed)
          title.style.transform = `translateX(${x}%) translateY(${y}%)`
        }
      })
    }
  }

  const handleMouseLeave = () => {
    const titles = document.querySelectorAll<HTMLElement>('.hero-title')
    titles.forEach(title => {
      title.style.transform = 'translateX(0) translateY(0)'
    })
  }

  return (
    <div
      id={`${styles.heroWrapper}`}
      ref={areaRef}
      onMouseMove={handleMouseMov}
      onMouseLeave={handleMouseLeave}
    >
      <p className={styles.heroMessage}>
        I am a Full-Stack Software Engineer from <br /> Fort Lauderdale, Florida
      </p>
      <h1 data-speed='3' className={`${styles.heroTitle} ${styles.heroTitleOutline} hero-title`}>
        Adrian
      </h1>
      <img className={styles.heroImage} src='/me.png' alt='me' />
      <h1 data-speed='3' className={`${styles.heroTitle} hero-title`}>
        Adrian
      </h1>
    </div>
  )
}