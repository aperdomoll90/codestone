'use client'
import * as React from 'react'
import './styles.css'
import { Carousel } from './Carrousel'
import { SvgCarrousel } from './SvgCarrousel'

const RenderCarrousel = () => {
  return <SvgCarrousel />
  // return <Carousel slides={slideData} size={60} />
}

export default RenderCarrousel
