'use client'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './BentoGrid.module.scss'
import { useMagnetize } from 'css-forge'
import { useTransitionRouter } from 'next-view-transitions'

interface BentoProject {
  id: string
  title: string
  description: string
  role: string
  image: string
  video?: string
  videoPlayback?: 'auto' | 'hover'
  videoFit?: 'cover' | 'contain'
  href: string
  color: string
  isExternal?: boolean
  hideMedia?: boolean
  gradient?: string
}

// 12 cards: 11 for desktop 14×8 grid + 1 extra for mobile interlocking pattern
const bentoProjects: BentoProject[] = [
  { id: 'rockval', title: 'RockVal', description: 'Real estate investment app', role: 'Mobile Dev', image: '/rockvalInitial.png', video: '/rockvalVideo.mp4', videoPlayback: 'hover', href: '/work/rockval', color: '--bento-cornflower', gradient: 'linear-gradient(135deg, #8FA7B8, #C5D6E3)' },
  { id: 'csv-conductor', title: 'csv-conductor', description: 'CSV parser & generator', role: 'npm Library', image: '/csvConductorStatic.png', video: '/csvConductoryVideo.mp4', videoPlayback: 'hover', href: '/work/csv-conductor', color: '--bento-sky' },
  { id: 'quartz-council', title: 'QuartzCouncil', description: 'AI code review agent', role: 'Dev Tool', image: '/quartzStatic.png', video: '/quartsCouncilVideo.mp4', videoPlayback: 'hover', href: '/work/quartz-council', color: '--bento-lilac', gradient: 'linear-gradient(135deg, #BFA9E6, #D8C7F2)' },
  { id: 'css-forge', title: 'css-forge', description: 'React component library', role: 'npm Library', image: '/forgeInitial.png', video: '/forgevideo.mp4', videoPlayback: 'hover', href: '/work/css-forge', color: '--bento-blush', gradient: 'linear-gradient(135deg, #5C5A60, #7D7A82)' },
  { id: 'star-priority', title: 'StarPriority', description: 'Rebate submission platform', role: 'Full-Stack Dev', image: '/staticRebate.png', video: '/starPriority.mp4', videoPlayback: 'hover', href: '/work/starbrite-rebate', color: '--bento-peach' },
  { id: 'stop', title: 'STOP', description: 'Sea turtle conservation platform', role: 'Web Project', image: '/stopInitial.png', video: '/stopVideo.mp4', videoPlayback: 'hover', href: '/work/stop', color: '--bento-sage', gradient: 'linear-gradient(135deg, #2C4A3E, #4A7A68)' },
  { id: 'star-locator', title: 'StarLocator', description: 'Product-based store locator', role: 'Full-Stack Dev', image: '/starLocatorInitial.png', video: '/starFinderVideo.mp4', videoPlayback: 'hover', href: '/work/starbrite-locator', color: '--bento-yellow', gradient: 'linear-gradient(135deg, #7EC898, #A8E4B8)' },
  { id: 'point-focus', title: 'point-focus', description: 'Image zoom & focus component', role: 'npm Library', image: '/ant.png', video: '/pointFocus.mp4', videoPlayback: 'auto', href: '/work/point-focus', color: '--bento-steel' },
  { id: 'rockval-2', title: 'RockVal', description: 'Real estate investment app', role: 'Mobile Dev', image: '/rockvalassets/rockvalbanner.png', href: '/work/rockval', color: '--bento-peach' },
  { id: 'point-focus-2', title: 'point-focus', description: 'Image zoom & focus component', role: 'npm Library', image: '/ant.png', video: '/pointFocus.mp4', videoPlayback: 'auto', href: '/work/point-focus', color: '--bento-steel' },
  { id: 'star-locator-2', title: 'StarLocator', description: 'Product-based store locator', role: 'Full-Stack Dev', image: '/starLocatorInitial.png', video: '/starFinderVideo.mp4', videoPlayback: 'hover', href: '/work/starbrite-locator', color: '--bento-yellow' },
  { id: 'stop-2', title: 'STOP', description: 'Sea turtle conservation platform', role: 'Web Project', image: '/stop.png', video: '/stop.mp4', videoPlayback: 'hover', href: '/work/stop', color: '--bento-lavender' },
]

interface BentoCardProps {
  project: BentoProject
}

const BentoCard = ({ project }: BentoCardProps) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const router = useTransitionRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 799px)')
    setIsMobile(mediaQuery.matches)
    const handleChange = (changeEvent: MediaQueryListEvent) => setIsMobile(changeEvent.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const isHoverVideo = !isMobile && project.video && project.videoPlayback === 'hover'
  const shouldAutoplay = project.video && !project.hideMedia && (project.videoPlayback === 'auto' || isMobile)

  const { handleMouseMove, handleMouseLeave } = useMagnetize({
    areaRef: cardRef,
    targets: [
      {
        selector: `.${styles['c-bento-grid__button']}`,
        options: {
          followLerpFactor: 0.08,
          intensity: 1,
          clampWithinArea: true,
          maxTravelPercent: 300,
          cursorOffsetPercent: { x: 0, y: 0 },
          returnSpring: { stiffness: 14, damping: 12, precision: 0.01 },
        },
      },
    ],
  })

  const handleClick = (clickEvent: React.MouseEvent) => {
    clickEvent.preventDefault()
    if (project.isExternal) {
      window.open(project.href, '_blank', 'noopener,noreferrer')
    } else {
      router.push(project.href)
    }
  }

  const handleCardMouseEnter = () => {
    if (isHoverVideo && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleCardMouseLeave = () => {
    handleMouseLeave()
    if (isHoverVideo && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    if (!shouldAutoplay || !videoRef.current) return
    const randomDelay = Math.random() * 3000
    const delayTimer = setTimeout(() => {
      videoRef.current?.play()
    }, randomDelay)
    return () => clearTimeout(delayTimer)
  }, [shouldAutoplay])

  const showStaticImage = !project.hideMedia && (!project.video || isHoverVideo)

  return (
    <a
      ref={cardRef}
      className={styles['c-bento-grid__card']}
      href={project.href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      style={{ background: project.gradient || `var(${project.color})` }}
    >
      {showStaticImage ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
        />
      ) : null}
      {project.video && !project.hideMedia && (
        <video
          ref={videoRef}
          src={project.video}
          autoPlay={false}
          loop
          muted
          playsInline
          data-playback={project.videoPlayback}
          style={project.videoFit ? { objectFit: project.videoFit } : undefined}
        />
      )}
      <div className={styles['c-bento-grid__info']}>
        <span className={styles['c-bento-grid__info-role']}>{project.role}</span>
        <span className={styles['c-bento-grid__info-title']}>{project.title}</span>
        <span className={styles['c-bento-grid__info-desc']}>{project.description}</span>
      </div>
      <span className={styles['c-bento-grid__button']}>View</span>
    </a>
  )
}

type BentoVariant = 'compact' | 'full'

interface BentoGridProps {
  className?: string
  variant?: BentoVariant
}

const COMPACT_CARD_COUNT = 8

export const BentoGrid = ({ className, variant = 'compact' }: BentoGridProps) => {
  const projects = variant === 'compact' ? bentoProjects.slice(0, COMPACT_CARD_COUNT) : bentoProjects

  return (
    <div className={`${styles['c-bento-grid']} ${className ?? ''}`} data-variant={variant}>
      {projects.map((project) => (
        <BentoCard key={project.id} project={project} />
      ))}
    </div>
  )
}
