'use client'
import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import styles from './LoadingScreen.module.scss'
import { RotatingGlobe } from '../rotatingGlobe/RotatingGlobe'
import { useLoading } from './LoadingContext'

const MIN_DISPLAY_TIME = 800
const EXIT_ANIMATION_DURATION = 400

export const LoadingScreen: React.FC = () => {
  const pathname = usePathname()
  const { isLoading, stopLoading } = useLoading()
  const [isExiting, setIsExiting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const showTimeRef = useRef<number | null>(null)
  const initialPathnameRef = useRef<string | null>(null)

  // When loading starts, show the screen and capture initial pathname
  useEffect(() => {
    if (isLoading && !isVisible) {
      showTimeRef.current = Date.now()
      initialPathnameRef.current = pathname
      setIsVisible(true)
      setIsExiting(false)
    }
  }, [isLoading, isVisible, pathname])

  // When pathname changes from initial, navigation completed - schedule exit
  useEffect(() => {
    if (!isVisible || !isLoading || isExiting) return
    if (initialPathnameRef.current === null) return
    if (pathname === initialPathnameRef.current) return

    const startExit = () => {
      setIsExiting(true)
      stopLoading()

      setTimeout(() => {
        setIsVisible(false)
        setIsExiting(false)
        showTimeRef.current = null
        initialPathnameRef.current = null
      }, EXIT_ANIMATION_DURATION)
    }

    const elapsed = showTimeRef.current ? Date.now() - showTimeRef.current : 0
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed)

    const exitTimer = setTimeout(startExit, remainingTime)

    return () => {
      clearTimeout(exitTimer)
    }
  }, [pathname, isVisible, isLoading, isExiting, stopLoading])

  if (!isVisible) return null

  return (
    <div className={`${styles['c-loading']} ${isExiting ? styles['c-loading--exit'] : ''}`} data-exiting={isExiting}>
      <div className={styles['c-loading__content']}>
        <RotatingGlobe className={styles['c-loading__globe']} color='var(--white)' />
        <span className={styles['c-loading__text']}>Loading</span>
      </div>
    </div>
  )
}