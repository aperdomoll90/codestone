'use client'
import React from 'react'
import { Hero } from './landingSections/hero/Hero'
import { ContentSection } from './landingSections/content/ContentSection'
import { ContactSection } from './landingSections/contact/ContactSection'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ContentSection />
      <ContactSection />
    </>
  )
}

export default Home
