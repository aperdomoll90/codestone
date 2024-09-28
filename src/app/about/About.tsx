import React from 'react'
import styles from './About.module.css'
import { Hexagon } from '../../../public/hexagonSVG'
const linkedin = '/linkedin.png'
const github = '/github.png'
const cv = '/cv.png'
const cvDownload = '/cvdownload.png'

export default function About() {
  return (
    <>
      <Hexagon className={`${styles.hexagon} ${styles.largeHexagon}`} />
      <Hexagon className={`${styles.hexagon} ${styles.medHexagon}`} />
      <Hexagon className={`${styles.hexagon} ${styles.smallHexagon}`} />
      <Hexagon className={`${styles.hexagon} ${styles.xsHexagon}`} />
      <div className={styles.aboutPositioningContainer}>
        <div className={styles.aboutLinksContainer}>
          <a href='https://www.linkedin.com/in/adrian-perdomo-12997474/'>
            <img src={linkedin} className={styles.aboutLink} alt='linkedin Icon' />
          </a>
          <a href='https://github.com/aperdomoll90'>
            <img src={github} className={styles.aboutLink} alt='linkedin Icon' />
          </a>
          <a href='#'>
            <img src={cv} className={styles.aboutLink} alt='linkedin Icon' />
          </a>
          <a href='#'>
            <img src={cvDownload} className={styles.aboutLink} alt='linkedin Icon' />
          </a>
        </div>
        <div className={styles.aboutContentContainer}>
          <h1 className={styles.aboutTitle}>LET’S WORK TOGETHER</h1>
          <p className={styles.aboutContent}>
            I am a digital visionary, driven to transform ordinary experiences into realms of enchantment. With masterful command over full-stack development and cutting-edge technologies like React, React Native, and Next.js, I craft user interfaces that transcend functionality - igniting awe,
            delight, and a sense of wonder. My expertise spans both digital and physical realms, bridging the art of software with the science of electronics and microchips through fluency in C++. An innovator at heart, I blend creativity and technology to unlock new frontiers.
          </p>
          <p className={styles.aboutContent}>
            My true quest, however, is to elevate the human experience by infusing the world with beauty and enchantment. I believe that surrounding our lives with inspiration, joy, and captivating experiences can foster a healthier, more vibrant society. Thus, I am passionate about crafting digital
            solutions that are not merely functional, but transformative - imbuing every interaction with possibility and magic. Join me in co-creating a future where technology becomes an artistic canvas to manifest our dreams and expand the boundaries of imagination.
          </p>
        </div>
      </div>
    </>
  )
}
