import React, { useMemo } from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import { Hexagon } from '../../../public/hexagonSVG';
import useIntersectionObserver from '../utils/useIntersectionObserver';

const LINKS = [
  { href: 'https://www.linkedin.com/in/adrian-perdomo-12997474/', src: '/linkedin.png', alt: 'LinkedIn Profile' },
  { href: 'https://github.com/aperdomoll90', src: '/github.png', alt: 'GitHub Profile' },
  { href: '#', src: '/cv.png', alt: 'View CV' },
  { href: '#', src: '/cvdownload.png', alt: 'Download CV' },
];

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 1.0 });

  const hexagons = useMemo(() => (
    <>
      <Hexagon className={`${styles.hexagon} ${styles.largeHexagon}`} />
      <Hexagon className={`${styles.hexagon} ${styles.medHexagon}`} />
      <Hexagon className={`${styles.hexagon} ${styles.smallHexagon}`} />
      <Hexagon className={`${styles.hexagon} ${styles.xsHexagon}`} />
    </>
  ), []);

  return (
    <>
      {hexagons}
      <section 
        ref={ref as React.RefObject<HTMLDivElement>}
        id='about-section' 
        className={`${styles.aboutPositioningContainer} ${isVisible ? styles.active : ''}`}
      >
        <div className={styles.aboutLinksContainer}>
          {LINKS.map((link, index) => (
            <a key={index} href={link.href}>
              <Image src={link.src} width={50} height={50} className={styles.aboutLink} alt={link.alt} />
            </a>
          ))}
        </div>
        <div className={styles.aboutContentContainer}>
          <h1 className={styles.aboutTitle}>LET'S WORK TOGETHER</h1>
          <p className={styles.aboutContent}>
            I am a passionate technologist with a vision for enhancing digital experiences. My expertise in full-stack development, including React, React Native, and Next.js, allows me to create user interfaces that are both functional and engaging. I bridge the gap between software and hardware,
            applying my knowledge of C++ to work with electronics and microchips. My goal is to improve user experiences by combining creativity with technology. I believe that well-designed digital solutions can have a positive impact on people's lives, making interactions more enjoyable and
            intuitive.
          </p>
          <p className={styles.aboutContent}>
            I'm committed to pushing the boundaries of what's possible in technology, always looking for innovative ways to solve problems and create new possibilities. I strive to develop applications that are not only practical but also inspiring, aiming to bring a sense of delight to users. By
            focusing on the intersection of art and technology, I aim to contribute to a future where digital experiences are both useful and enriching.
          </p>
        </div>
      </section>
    </>
  );
}
