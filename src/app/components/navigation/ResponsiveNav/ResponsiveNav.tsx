'use client'
import { useRef, useState, useMemo, useEffect } from 'react'
import styles from './ResponsiveNav.module.scss'
import { ToggleButton } from '../ToggleButtonNew'
import { DrawButton, useMagnetize } from 'css-forge'
import { usePathname } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'
import { Drawer } from '@/app/components/drawer/Drawer'
import { PerdomoLogoIcon } from '@/app/constants/icons'

export interface menuItemsArrayPropsTypes {
  label?: string
  link: string
}

const navItems = [
  { label: 'Home', link: '/' },
  { label: 'Work', link: '/work' },
  { label: 'About', link: '/about' },
  { label: 'Contact', link: '/#c-contact' },
]

const linkFontSizes = {
  default: '1.5rem',
  mdx: '1.2rem',
}

const NavItemComponent = ({ item, onNavigate }: { item: menuItemsArrayPropsTypes; onNavigate: (href: string, e: React.MouseEvent) => void }) => {
  const areaRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove, handleMouseLeave } = useMagnetize({
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

  const handleClick = (e: React.MouseEvent) => {
    onNavigate(item.link, e)
  }

  return (
    <span ref={areaRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={styles['c-navigation__menu-item']}>
      <DrawButton fontSize={linkFontSizes} href={item.link} onClick={handleClick} className={styles['c-navigation__menu-item-link']}>
        {item.label}
      </DrawButton>
    </span>
  )
}

export const ResponsiveNav = () => {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const router = useTransitionRouter()

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

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('/#') || href.startsWith('http') || href.startsWith('mailto:')) {
      return
    }
    e.preventDefault()
    setVisible(false)
    router.push(href)
  }

  return (
    <section className={`${styles['c-navigation']}`} data-visible={visible} data-route={routeName}>
      <ToggleButton yPosition={routeName === 'home' ? '4rem' : '2rem'} active={visible} setActive={setVisible} />
      <p className={`${styles['c-navigation__logo']}`}><PerdomoLogoIcon /> Code by Adrian</p>
      <Drawer open={visible} onClose={() => setVisible(false)} anchor="right" hideCloseButton wrapperClassName={styles['c-navigation__drawer']} className={styles['c-navigation__menu']}>
        {filteredNavItems.map((item) => (
          <NavItemComponent item={item} key={item.link} onNavigate={handleNavigate} />
        ))}
      </Drawer>
    </section>
  )
}