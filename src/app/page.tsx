'use client'
import React from 'react'
import { Hero } from './sections/hero/Hero'
import styles from './page.module.scss'
import { ContentSection } from './sections/content/ContentSection'
import { ContactSection } from './sections/contact/ContactSection'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ContentSection />
      <ContactSection/>
    </>
  )
}

export default Home
