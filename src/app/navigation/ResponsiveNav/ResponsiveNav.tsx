'use client'
import { useRef, useState } from 'react'
import styles from './ResponsiveNav.module.scss'
import Link from 'next/link'
import { SingleItemFollowMouse } from '@/app/utils/FollowMouse'
import { ToggleButton } from '../ToggleButtonNew'
import { MagnetizeComponent } from '@/app/utils/MagnetizeComponent'

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

  const { handleMouseMove, handleMouseLeave } = MagnetizeComponent({
    areaRef,
    targets: [
      {
        selector: `.${styles['c-navigation__menu-item-link']}`,
        options: {
          intensity: 0.35,
          followLerpFactor: 0.1,
          clampWithinArea: true,
          returnSpring: { stiffness: 11, damping: 14, precision: 0.01 },
        },
      },
    ],
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
