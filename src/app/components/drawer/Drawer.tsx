'use client'
import React from 'react'
import styles from './Drawer.module.scss'
import { useSwipeGesture } from '@/app/hooks/useSwipeGesture'

type Anchor = 'bottom' | 'right' | 'left' | 'top'

interface DrawerProps {
  open: boolean
  onClose: () => void
  anchor?: Anchor
  children: React.ReactNode
  className?: string
  wrapperClassName?: string
  hideCloseButton?: boolean
  lockScroll?: boolean
}

const swipeDirectionMap: Record<Anchor, 'onSwipeDown' | 'onSwipeUp' | 'onSwipeLeft' | 'onSwipeRight'> = {
  bottom: 'onSwipeDown',
  top: 'onSwipeUp',
  left: 'onSwipeLeft',
  right: 'onSwipeRight',
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  anchor = 'bottom',
  children,
  className = '',
  wrapperClassName = '',
  hideCloseButton = false,
  lockScroll = true,
}) => {
  const swipeDirection = swipeDirectionMap[anchor]

  const { touchHandlers } = useSwipeGesture({
    [swipeDirection]: onClose,
    enabled: open,
    lockScroll: lockScroll && open,
  })

  return (
    <div className={`${styles['c-drawer']} ${wrapperClassName}`} data-open={open} data-anchor={anchor}>
      <div className={styles['c-drawer__overlay']} onClick={onClose} />
      <div className={`${styles['c-drawer__content']} ${className}`} {...touchHandlers}>
        {!hideCloseButton && (
          <button
            className={styles['c-drawer__close']}
            onClick={onClose}
            aria-label="Close drawer"
          >
            <span />
            <span />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
