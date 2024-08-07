'use client'
import './styles.css'
import { useEffect, useState } from 'react'
import { NavBarPropsTypes, menuItemsArrayPropsTypes } from './NavBar.types'
import { ToggleButton } from '../navigation/ToggleButton'
import { preventScrolling } from './preventScrolling'

export const NavBar: React.FC<NavBarPropsTypes> = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log('visible', visible)
    preventScrolling(visible)
  }, [visible])

  const renderAccordionBullet = (link: string, label: string) => {
    return (
      <a className='NavBar-link NavBar-active' href={link}>
        {label}
      </a>
    )
  }

  return (
    <section id='primary-header' className='primary-header flex-row'>
      <ToggleButton
        top={1}
        rightMobile={2}
        rightDesktop={4}
        customClass='mobile-nav-toggle'
        ariaControls='primary-navigation'
        ariaExpanded={visible}
        active={visible}
        color='#000'
        setActive={() => {
          setVisible(!visible)
        }}
        buttonBackgroundColor='transparent'
      />
      <div className='navbar'>
        <div id='primary-navigation' aria-expanded={visible} data-visible={visible} className='primary-navigation uppercase ff-sans-cond flex-row'>
          {renderAccordionBullet('/', 'Home')}
          {renderAccordionBullet('/carrousel', 'Carrousel')}
          {renderAccordionBullet('/wordscrambler', 'WordScrambler')}
        </div>
      </div>
    </section>
  )
}
