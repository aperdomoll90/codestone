'use client'
import { useRef, useState, useMemo, useEffect } from 'react'
import styles from './ResponsiveNav.module.scss'
import { ToggleButton } from '../toggleButtonNew'
import { MagnetizeComponent } from '@/app/components/utils/MagnetizeComponent'
import { DrawButton } from '@/app/components/drawButton/DrawButton'
import { usePathname } from 'next/navigation'
import { Drawer } from '@/app/components/drawer/Drawer'

export interface menuItemsArrayPropsTypes {
  label?: string
  link: string
}

const navItems = [
  { label: 'Home', link: '/' },
  { label: 'Work', link: '/work' },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/contact' },
]

const linkFontSizes = {
  default: '1.5rem',
  mdx: '1.2rem',
}

const NavItemComponent = ({ item }: { item: menuItemsArrayPropsTypes }) => {
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
    <span ref={areaRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={styles['c-navigation__menu-item']}>
      <DrawButton fontSize={linkFontSizes} href={item.link} className={styles['c-navigation__menu-item-link']}>
        {item.label}
      </DrawButton>
    </span>
  )
}

export const ResponsiveNav = () => {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  const routeName = useMemo(() => {
    if (pathname === '/') return 'home'
    if (pathname === '/about') return 'about'
    if (pathname === '/work') return 'work'
    if (pathname === '/resume') return 'resume'
    if (pathname.startsWith('/work/')) return 'project'
    return 'other'
  }, [pathname])

  const filteredNavItems = useMemo(() => {
    return navItems.filter(item => item.link !== pathname)
  }, [pathname])

  useEffect(() => {
    setVisible(false)
  }, [pathname])

  return (
    <section className={`${styles['c-navigation']}`} data-visible={visible} data-route={routeName}>
      <ToggleButton yPosition={routeName === 'home' ? '4rem' : '2rem'} active={visible} setActive={setVisible} />
      <p className={`${styles['c-navigation__logo']}`}>© Code by Adrian</p>
      <Drawer open={visible} onClose={() => setVisible(false)} anchor="right" hideCloseButton wrapperClassName={styles['c-navigation__drawer']} className={styles['c-navigation__menu']}>
        {filteredNavItems.map((item) => (
          <NavItemComponent item={item} key={item.link} />
        ))}
      </Drawer>
    </section>
  )
}
