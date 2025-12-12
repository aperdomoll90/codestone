'use client'
import { useRef, useState, useMemo, useEffect } from 'react'
import styles from './ResponsiveNav.module.scss'
import { ToggleButton } from '../ToggleButtonNew'
import { MagnetizeComponent } from '@/app/components/utils/MagnetizeComponent'
import { DrawButton } from '@/app/components/drawButton/DrawButton'
import { usePathname } from 'next/navigation'

export interface menuItemsArrayPropsTypes {
  label?: string
  link: string
}

const homeNavItems = [
  { label: 'Work', link: '/work' },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
]

const otherNavItems = [
  { label: 'Home', link: '/' },
  { label: 'Work', link: '/work' },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
]

const linkFontSizes = {
  default: '1.5rem',
  mdx: '1.2rem',
}

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
      <DrawButton fontSize={linkFontSizes} href={item.link} className={styles['c-navigation__menu-item-link']}>
        {item.label}
      </DrawButton>
    </span>
  )
}

export const ResponsiveNav = () => {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const navItems = useMemo(() => {
    if (isHome) return homeNavItems
    return otherNavItems.filter(item => item.link !== pathname)
  }, [isHome, pathname])

  useEffect(() => {
    setVisible(false)
  }, [pathname])

  return (
    <section className={`${styles['c-navigation']}`} data-visible={visible} data-route={isHome ? 'home' : 'other'}>
      <ToggleButton yPosition={isHome ? '4rem' : '2rem'} active={visible} setActive={setVisible} />
      <p className={`${styles['c-navigation__logo']}`}>© Code by Adrian</p>
      <nav className={`${styles['c-navigation__menu']}`} aria-expanded={visible} data-visible={visible}>
        {navItems.map((item, index) => (
          <NavItemComponent item={item} index={index} key={index} />
        ))}
      </nav>
    </section>
  )
}
