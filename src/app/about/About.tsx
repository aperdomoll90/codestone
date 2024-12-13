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
      <div id='about-section' className={styles.aboutPositioningContainer}>
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
            I am a passionate technologist with a vision for enhancing digital experiences. My expertise in full-stack development, including React, React Native, and Next.js, allows me to create user interfaces that are both functional and engaging. I bridge the gap between software and hardware,
            applying my knowledge of C++ to work with electronics and microchips. My goal is to improve user experiences by combining creativity with technology. I believe that well-designed digital solutions can have a positive impact on people’s lives, making interactions more enjoyable and
            intuitive.
          </p>
          <p className={styles.aboutContent}>
            I’m committed to pushing the boundaries of what’s possible in technology, always looking for innovative ways to solve problems and create new possibilities. I strive to develop applications that are not only practical but also inspiring, aiming to bring a sense of delight to users. By
            focusing on the intersection of art and technology, I aim to contribute to a future where digital experiences are both useful and enriching.
          </p>
        </div>
      </div>
    </>
  )
}
