'use client'
import styles from './WorkSection.module.scss'
import { BubbleButton } from 'css-forge'
import { useTransitionRouter } from 'next-view-transitions'
import { BentoGrid } from '@/app/components/bentoGrid/BentoGrid'

export const WorkSection = () => {
  const router = useTransitionRouter()

  const handleNavigate = () => {
    router.push('/work')
  }

  return (
    <section id="c-work" className={styles['c-work-section']}>
      <BentoGrid />

      <BubbleButton
        label='More Work'
        onClick={handleNavigate}
        className={styles['c-work-section__button']}
        fontSize={{ default: '0.7rem', md: '1rem', mdx: '1.1rem', lg: '1.3rem' }}
        padding={{ default: '1rem', md: '2rem', mdx: '2.5rem' }}
        magnetArea={{ default: '0', mdx: '3rem' }}
      />
    </section>
  )
}
