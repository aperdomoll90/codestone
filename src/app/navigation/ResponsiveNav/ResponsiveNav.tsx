'use client'
import { useRef, useState } from 'react'
import styles from './ResponsiveNav.module.scss'
import Link from 'next/link'
import { SingleItemFollowMouse } from '@/app/utils/FollowMouse'
import { ToggleButton } from '../ToggleButtonNew'

export interface menuItemsArrayPropsTypes {
  label?: string
  link: string
}
const navItemsArray = [
  { label: 'Work', link: '#c-work' },
  { label: 'About', link: '#c-about' },
  { label: 'Contact', link: '#c-contact' },
]

const NavItemComponent = ({ item, index }: { item: menuItemsArrayPropsTypes; index: number }) => {
  const areaRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove, handleMouseLeave } = SingleItemFollowMouse({
    areaRef,
    targetSelector: `.${styles['c-navigation__menu-item-link']}`,
    options: {
      intensity: 0.35, // how far it can travel (0.5 = half as far)
      // maxTravelPercent: 60,           // hard cap (±%)
      followLerpFactor: 0.1, // chase speed (lower = more delay)
      // cursorOffsetPercent: { x: 6, y: -4 }, // sit a bit off the cursor
      clampWithinArea: true, // keep inside its span
      returnSpring: { stiffness: 11, damping: 14, precision: 0.01 }, // bounce back feel
    },
  })

  return (
    <span ref={areaRef} key={index} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`${styles['c-navigation__menu-item']}`}>
      <Link href={item.link} className={`${styles['c-navigation__menu-item-link']}`}>
        {item.label}
      </Link>
    </span>
  )
}

export const ResponsiveNav = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <ToggleButton active={visible} setActive={setVisible} />
      <section className={`${styles['c-navigation']}`} data-visible={visible}>
        <p className={`${styles['c-navigation__logo']}`}>© Code by Adrian</p>
        <nav className={`${styles['c-navigation__menu']}`} aria-expanded={visible} data-visible={visible}>
          {navItemsArray.map((item, index) => (
            <NavItemComponent item={item} index={index} />
          ))}
        </nav>
      </section>
    </>
  )
}
