'use client'

import React, { useRef } from 'react'
import styles from './page.module.css'
import RenderCarrousel from './carrousel/page'
import About from './about/About'
import { FollowMouse } from './utils/FollowMouse'
import UseHorizontalScroll from './utils/UseHorizontalScroll'

interface HomeProps {
  sections: React.ReactNode[]
}

const titleOptions = ['Adrian', 'About', 'Portfolio']
const titleClasses = [styles.titleHeroSection, styles.titleAboutSection, styles.titlePortfolioSection]
const imageClasses = [styles.heroImageStageHero, styles.heroImageStageAbout, styles.heroImageStageGone]
const backgroundColors = ['radial-gradient(#a7a3d8, #585672)', 'radial-gradient(#a7a3d8, #03254e)', 'radial-gradient(#E7B13B, #885310)']

const HeroSection: React.FC = () => (
  <div id={styles.heroWrapper}>
    <p className={styles.heroMessage}>
      I am a Full-Stack Software Engineer from <br /> Fort Lauderdale, Florida
    </p>
  </div>
)

const sections = [<HeroSection key='hero' />, <About key='about' />, <RenderCarrousel key='carrousel' />]

export const Home: React.FC<HomeProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove, handleMouseLeave } = FollowMouse({
    areaRef: containerRef,
    affectedElements: '.dynamic-text',
  })

  const totalSections = sections.length
  const currentSection = UseHorizontalScroll({ containerRef, totalSections })

  return (
    <div className={styles.container} ref={containerRef} style={{ background: backgroundColors[currentSection] }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <h1 data-speed='3' className={`dynamic-text ${styles.heroTitle} ${styles.heroTitleOutline} ${titleClasses[currentSection]}`}>
        {titleOptions[currentSection]}
      </h1>
      <img className={`${styles.heroImage} ${imageClasses[currentSection]}`} src='/me.png' alt='me' />
      <h1 data-speed='3' className={`dynamic-text ${styles.heroTitle} ${titleClasses[currentSection]}`}>
        {titleOptions[currentSection]}
      </h1>
      <main className={styles.main} style={{ transform: `translateX(-${currentSection * 100}vw)` }}>
        {sections.map((section, index) => (
          <section key={index} className={styles.screen}>
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
