'use client'

import React, { useRef, useEffect, useState } from 'react'
import styles from './page.module.css'
import RenderCarrousel from './carrousel/page'
import About from './about/About'
import { FollowMouse } from './utils/FollowMouse'

const imageClasses = [styles.heroImageStageHero, styles.heroImageStageAbout, styles.heroImageStageGone]
const backgroundColors = ['radial-gradient(#a7a3d8, #585672)', 'radial-gradient(#a7a3d8, #03254e)', 'radial-gradient(#a7a3d8, #03254e)']

const HeroSection: React.FC = () => (
  <div id={styles.heroWrapper}>
    <p className={styles.heroMessage}>
      I am a Full-Stack Software Engineer from <br /> Fort Lauderdale, Florida
    </p>
  </div>
)

const sections = [<HeroSection key='hero' />, <About key='about' />, <RenderCarrousel key='carrousel' />]

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentSection, setCurrentSection] = useState(0)

  const { handleMouseMove, handleMouseLeave } = FollowMouse({
    areaRef: containerRef,
    affectedElements: '.dynamic-text',
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sectionElements = container.querySelectorAll(`.screen`)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(sectionElements).indexOf(entry.target as Element)
            setCurrentSection(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionElements.forEach(section => observer.observe(section))

    return () => {
      sectionElements.forEach(section => observer.unobserve(section))
    }
  }, [currentSection])

  return (
    <div className={styles.container} ref={containerRef} style={{ background: backgroundColors[currentSection] }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <h1 data-speed='3' className={`dynamic-text ${styles.heroTitle} ${styles.heroTitleOutline} ${styles.titleHeroSection}`}>
        Adrian
      </h1>
      <img className={`${styles.heroImage} ${imageClasses[currentSection]}`} src='/me.png' alt='me' />
      <h1 data-speed='3' className={`dynamic-text ${styles.heroTitle} ${styles.titleHeroSection}`}>
        Adrian
      </h1>
      <main className={styles.main}>
        {sections.map((section, index) => (
          <section key={index} className={`${styles.screen} screen`}>
            {section}
          </section>
        ))}
      </main>
      <div className={styles.indicators}>
        {sections.map((_, index) => (
          <div key={index} className={`${styles.indicator} ${index === currentSection ? styles.active : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default Home
