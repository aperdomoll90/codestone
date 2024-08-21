'use client'
import { useState } from 'react'
import './styles.css'
import '../../utils/GlobalStyles.css'
import { ResponsiveNavPropsTypes, menuItemsArrayPropsTypes } from './ResponsiveNav.type'
import { ToggleButton } from '../ToggleButtonNew'

export const ResponsiveNav: React.FC<ResponsiveNavPropsTypes> = ({ logo, height, width, logoHeight, logoMargin, menuItemsArray, primaryColor, secondaryColor, hoverColor, pressColor, labelColor }) => {
  const [visible, setVisible] = useState(false)

  const renderMenuItems = menuItemsArray?.map((item: menuItemsArrayPropsTypes, index: number) => (
    <li key={`${item.label}-${index}`} className='responsiveNav-active'>
      <a className='responsiveNav-link' href={item.link}>
        <span aria-hidden='true'>0{index}</span>
        {item.label}
      </a>
    </li>
  ))

  return (
    <section id='primary-header' className='primary-header flex-row'>
      <ToggleButton
        top={1}
        right={1}
        customClass='mobile-nav-toggle'
        ariaControls='primary-navigation'
        ariaExpanded={visible}
        active={visible}
        setActive={() => {
          setVisible(!visible)
        }}
        buttonBackgroundColor='transparent'
      />
      <nav>
        <ul id='primary-navigation' aria-expanded={visible} data-visible={visible} className='primary-navigation uppercase ff-sans-cond flex-row'>
          {renderMenuItems}
        </ul>
      </nav>
    </section>
  )
}
