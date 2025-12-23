'use client'
import React from 'react'
import styles from './RotatingGlobe.module.scss'

interface RotatingGlobeProps {
  className?: string
  color?: string
}

export const RotatingGlobe: React.FC<RotatingGlobeProps> = ({ className = '', color }) => {
  const style = color ? { '--globe-color': color } as React.CSSProperties : undefined

  return (
    <div className={`${styles['c-globe']} ${className}`} style={style}>
      <div className={styles['c-globe__long']}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span key={index} style={{ '--i': index } as React.CSSProperties} />
          ))}
      </div>
      <div className={styles['c-globe__lat']} />
    </div>
  )
}
