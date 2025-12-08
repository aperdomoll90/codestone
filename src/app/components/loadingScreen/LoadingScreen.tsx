'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './LoadingScreen.module.scss'
import { RotatingGlobe } from '../rotatingGlobe/RotatingGlobe'

export const LoadingScreen: React.FC = () => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 900)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  if (!isVisible) return null

  return (
    <div className={`${styles['c-loading']} ${!isLoading ? styles['c-loading--exit'] : ''}`}>
      <div className={styles['c-loading__content']}>
        <RotatingGlobe className={styles['c-loading__globe']} color='var(--white)' />
        <span className={styles['c-loading__text']}>Loading</span>
      </div>
    </div>
  )
}
