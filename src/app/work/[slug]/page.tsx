'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import styles from './Project.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import BubbleButton from '@/app/components/bubbleButton/BubbleButton'

interface ProjectData {
  id: string
  title: string
  role: string
  location: string
  year: string
  image: string
  liveUrl?: string
  githubUrl?: string
  overview: string
  features: string[]
  techStack: {
    category: string
    items: string[]
  }[]
}

const projectsData: Record<string, ProjectData> = {
  wonderlust: {
    id: 'wonderlust',
    title: 'Wonderlust',
    role: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
    liveUrl: '#',
    githubUrl: '#',
    overview:
      'Wonderlust helps outdoor enthusiasts discover, plan and share all types of hiking routes. By combining user-generated content with real-time weather data, it ensures every adventure is tailored to planning. Made for both seasoned explorers and beginners into independent hikes in beautiful surroundings.',
    features: [
      'Live Weather Data To Users (MQTT)',
      'AI to Interact and learn to fit individual Profiles',
      'Catalog View Products For the Marketplace',
      'Seasonal (CRON/JOBS) challenges',
      'Data Share & Accessible To Explorers/Users',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['Next.js', 'Node.js', 'PostgreSQL', 'Mapbox.js + API (Mapbox)', 'Resend.js + Landlord + DP (Hosting)'],
      },
      {
        category: 'design+tools palette:',
        items: ['Figma/Adobe palette, CLI, qlip', 'design+tool, ms (audible, hello)', 'design+tool3 (pngs)'],
      },
    ],
  },
  nymph: {
    id: 'nymph',
    title: 'Nymph',
    role: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/djslide.png',
    liveUrl: '#',
    githubUrl: '#',
    overview: 'A creative music platform for DJs and producers to showcase their work and connect with fans.',
    features: ['Real-time audio streaming', 'Artist collaboration tools', 'Event scheduling', 'Fan engagement features'],
    techStack: [
      {
        category: 'Built with',
        items: ['React', 'Node.js', 'MongoDB', 'Web Audio API'],
      },
    ],
  },
  'five4free': {
    id: 'five4free',
    title: 'Five4Free',
    role: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
    liveUrl: '#',
    overview: 'A platform connecting volunteers with local community service opportunities.',
    features: ['Volunteer matching', 'Event management', 'Impact tracking', 'Community forums'],
    techStack: [
      {
        category: 'Built with',
        items: ['Next.js', 'Prisma', 'PostgreSQL'],
      },
    ],
  },
  posidon: {
    id: 'posidon',
    title: 'Posidon',
    role: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/djslide.png',
    liveUrl: '#',
    githubUrl: '#',
    overview: 'An ocean conservation app that tracks marine wildlife and pollution levels.',
    features: ['Wildlife tracking', 'Pollution monitoring', 'Data visualization', 'Alert system'],
    techStack: [
      {
        category: 'Built with',
        items: ['React Native', 'Node.js', 'MongoDB', 'MapBox'],
      },
    ],
  },
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectsData[slug]

  if (!project) {
    return (
      <CurvedSection background='var(--white)' curveBackground='var(--charcoal)' animationRange='80% 100%' scaleFrom={30} scaleTo={0}>
        <div className={styles['c-project']}>
          <h1>Project not found</h1>
        </div>
      </CurvedSection>
    )
  }

  return (
    <CurvedSection className={styles['c-project']} background='var(--white)' curveBackground='var(--charcoal)' animationRange='80% 100%' scaleFrom={30} scaleTo={0}>
      {/* Hero Section */}
      <section className={styles['c-project__hero']}>
        <h1 className={styles['c-project__title']}>{project.title}</h1>

        <div className={styles['c-project__meta']}>
          <div className={styles['c-project__meta-item']}>
            <span className={styles['c-project__meta-label']}>Role / Service</span>
            <span className={styles['c-project__meta-value']}>{project.role}</span>
          </div>
          <div className={styles['c-project__meta-item']}>
            <span className={styles['c-project__meta-label']}>Location</span>
            <span className={styles['c-project__meta-value']}>{project.location}</span>
          </div>
          <div className={styles['c-project__meta-item']}>
            <span className={styles['c-project__meta-label']}>Year</span>
            <span className={styles['c-project__meta-value']}>{project.year}</span>
          </div>
        </div>
      </section>

      {/* Image with floating action buttons */}
      <div className={styles['c-project__image-wrapper']}>
        <div className={styles['c-project__actions']}>
          {project.liveUrl && (
            <BubbleButton
              label='Live Site ↗'
              href={project.liveUrl}
              fontSize={{ default: '0.6rem', md: '0.75rem', lg: '0.85rem' }}
              padding={{ default: '1rem', md: '1.3rem', lg: '1.5rem' }}
              magnetArea={{ default: '0', mdx: '3rem' }}
              className={styles['c-project__action-btn']}
            />
          )}
          {project.githubUrl && (
            <BubbleButton
              label='GitHub ↗'
              href={project.githubUrl}
              fontSize={{ default: '0.6rem', md: '0.75rem', lg: '0.85rem' }}
              padding={{ default: '1rem', md: '1.3rem', lg: '1.5rem' }}
              magnetArea={{ default: '0', mdx: '3rem' }}
              className={styles['c-project__action-btn']}
            />
          )}
        </div>

        <div className={styles['c-project__image-container']}>
          <img src={project.image} alt={project.title} className={styles['c-project__image']} />
        </div>
      </div>

      {/* Content Section */}
      <div className={styles['c-project__content']}>
        {/* Overview */}
        <div className={styles['c-project__overview']}>
          <h2 className={styles['c-project__section-title']}>Overview</h2>
          <p className={styles['c-project__overview-text']}>{project.overview}</p>
        </div>

        {/* Features & Tech Stack */}
        <div className={styles['c-project__details']}>
          <div className={styles['c-project__features']}>
            <h3 className={styles['c-project__subtitle']}>Key Features & Highlights</h3>
            <ul className={styles['c-project__list']}>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={styles['c-project__tech']}>
            <h3 className={styles['c-project__subtitle']}>Tech Stack & Your Role</h3>
            {project.techStack.map((stack, index) => (
              <div key={index} className={styles['c-project__tech-group']}>
                <span className={styles['c-project__tech-category']}>{stack.category}</span>
                <ul className={styles['c-project__list']}>
                  {stack.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CurvedSection>
  )
}
