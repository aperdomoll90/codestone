'use client'
import React from 'react'
import styles from './Marquee.module.scss'

export const Marquee = () => {
  return (
    <div className={`${styles['c-marquee']}`}>
      <div className={`${styles['c-marquee__track']}`}>
        <h1>Adrian Perdomo - Adrian Perdomo -</h1>
        <h1 aria-hidden={true}>Adrian Perdomo - Adrian Perdomo -</h1>
      </div>
    </div>
  )
}
