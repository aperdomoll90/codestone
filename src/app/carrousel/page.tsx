'use client'
import * as React from 'react'
import './styles.css'
import { Carousel } from './Carrousel'
import { SvgCarrousel } from './SvgCarrousel'

const hikerSlide = '../../carouselassets/hikerslide.png'
const hikerBackground = '../../carouselassets/hikerbackground.png'
const vogeSlide = '../../carouselassets/vogeslide.png'
const vogeBackground = '../../carouselassets/vogebackground.png'
const djSlide = '../../carouselassets/djslide.png'
const djBackground = '../../carouselassets/djbackground.png'
const seaSlide = '../../carouselassets/seaslide.png'
const seaBackground = '../../carouselassets/seabackground.png'

export const slideData = [
  {
    fullBackground: hikerBackground,
    slideBackground: hikerSlide,
    project: 'Pathfinder',
    content: `Pathfinder is your ultimate guide to outdoor adventure and exploration. From trail recommendations to expert hiking tips, we're here to help you navigate the wilderness. Whether you're a seasoned trekker or a curious beginner, Pathfinder offers the maps, gear reviews, and community insights to elevate your outdoor experiences. Lace up your boots and let's blaze new trails together.`,
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: vogeBackground,
    slideBackground: vogeSlide,
    project: 'Nymphora',
    content: `Nymphora is your enchanted gateway to magical makeup artistry. From ethereal looks to spellbinding tutorials, we're here to transform your beauty routine. Whether you're a seasoned enchantress or a curious novice, Nymphora offers the mystical tools and fae-inspired wisdom to elevate your glamour. Step into our enchanted realm and let your inner beauty shine with otherworldly radiance.`,
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: djBackground,
    slideBackground: djSlide,
    project: 'Crossfader',
    content: `Crossfader is your ultimate destination for all things music and DJing. From cutting-edge mixing techniques to industry insights, we're here to amplify your sound. Whether you're a seasoned pro or an aspiring DJ, Crossfader provides the beats, knowledge, and community to elevate your craft. Drop in and ride the wave of musical innovation with us.`,
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: seaBackground,
    slideBackground: seaSlide,
    project: 'Nautica+',
    content: `Nautica+ is your all-in-one destination for everything boating. From expert tips to community discussions, we're here to enhance your nautical experience. Whether you're a seasoned captain or a curious newcomer, Nautica+ provides the resources and connections you need to navigate the waters with confidence. Set sail with us and explore the boundless possibilities of life on the water.`,
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: vogeBackground,
    slideBackground: vogeSlide,
    project: 'Voge',
    content: 'This is the Voge project description.',
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: djBackground,
    slideBackground: djSlide,
    project: 'Musically',
    content: 'This is the Musically project description.',
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: hikerBackground,
    slideBackground: hikerSlide,
    project: 'Wanderer',
    content: 'This is the Wanderer project description.',
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: vogeBackground,
    slideBackground: vogeSlide,
    project: 'Voge',
    content: 'This is the Voge project description.',
    liveLink: '#',
    githubLink: '#',
  },
  {
    fullBackground: djBackground,
    slideBackground: djSlide,
    project: 'Musically',
    content: 'This is the Musically project description.',
    liveLink: '#',
    githubLink: '#',
  },
]

const RenderCarrousel = () => {
  return <SvgCarrousel />
  // return <Carousel slides={slideData} size={60} />
}

export default RenderCarrousel
