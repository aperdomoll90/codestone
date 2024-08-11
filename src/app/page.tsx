'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import RenderCarrousel from './carrousel/page'
import Hero from './hero/Hero'
import About from './about/About'

interface Section {
  background: string
  content: React.ReactNode
}

interface HomeProps {
  sections: Section[]
  transitionDuration?: number
  transitionEasing?: string
}

const HomeComponent: React.FC<HomeProps> = ({ sections, transitionDuration = 500, transitionEasing = 'ease' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const lastScrollTime = useRef(0)

  const totalSections = sections.length

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sectionElements = container.querySelectorAll(`.${styles.screen}`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sectionElements).indexOf(entry.target as Element)
            setCurrentSection(index)
          }
        })
      },
      { threshold: 1.0 } // Adjust threshold as needed
    )

    sectionElements.forEach((section) => observer.observe(section))

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime.current < 1000) return

      let direction = 0

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        direction = e.deltaY > 0 ? 1 : -1
      } else {
        direction = e.deltaX > 0 ? 1 : -1
      }

      setCurrentSection(prev => {
        const next = prev + direction
        if (next >= 0 && next < totalSections) {
          lastScrollTime.current = now
          return next
        }
        return prev
      })
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section))
      container.removeEventListener('wheel', handleWheel)
    }
  }, [totalSections])

  const transitionStyle = `transform ${transitionDuration}ms ${transitionEasing}`

  const getBackgroundColor = (sectionIndex: number) => {
    const backgroundColors = [
      'radial-gradient(#a7a3d8, #585672)',
      'radial-gradient(#a7a3d8, #03254e)',
      'radial-gradient(#E7B13B, #885310)',
      'radial-gradient(#E7B13B, #885310)'
    ]
    return {
      background: backgroundColors[sectionIndex],
    }
  }

  return (
    <div className={styles.container} ref={containerRef} style={getBackgroundColor(currentSection)}>
      <main
        className={styles.main}
        style={{
          transform: `translateX(-${currentSection * 100}vw)`,
          transition: transitionStyle,
        }}>
        {sections.map((section, index) => (
          <section key={index} className={styles.screen}>
            {section.content}
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

const sections = [
  { background: 'red', content: <Hero /> },
  { background: 'blue', content: <About /> },
  { background: 'blue', content: <About /> },
  { background: 'yellow', content: <RenderCarrousel /> },
]

const Home = () => {
  return <HomeComponent sections={sections} transitionDuration={800} transitionEasing='ease-in-out' />
}

export default Home