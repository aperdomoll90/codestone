import './styles.css'
import { ToggleButtonPropsType } from './ToggleButton.types'

export const ToggleButton: React.FC<ToggleButtonPropsType> = ({ size, color, buttonHover, buttonBackgroundColor, shadow, active, setActive, ariaControls, ariaExpanded, top, bottom, leftMobile, leftDesktop, rightMobile, rightDesktop, customClass }) => {
  const defaultColor = '#fff'
  const defaultBackgroundColor = '#303030da'

  const stylesProps = {
    '--size': size ? `${size}rem` : '2rem',
    '--color': color ? color : defaultColor,
    '--buttonHover': buttonHover && buttonHover,
    '--buttonBackgroundColor': buttonBackgroundColor ? buttonBackgroundColor : defaultBackgroundColor,
    '--shadow': shadow ? 'rgba(0, 0, 0, 0.8)' : '',
    '--top': top ? `${top}rem` : 'auto',
    '--bottom': bottom ? `${bottom}rem` : 'auto',
    '--leftMobile': leftMobile ? `${leftMobile}rem` : 'auto',
    '--leftDesktop': leftDesktop ? `${leftDesktop}rem` : 'auto',
    '--rightMobile': rightMobile ? `${rightMobile}rem` : 'auto',
    '--rightDesktop': rightDesktop ? `${rightDesktop}rem` : 'auto',
  }

  const isActive = active ? 'ToggleButtonActive ToggleButton' : 'ToggleButton'
  const classArray = customClass && customClass ? `${isActive} ${customClass}` : isActive

  return (
    <button className={classArray} aria-controls={ariaControls} aria-expanded={ariaExpanded} style={stylesProps as React.CSSProperties} onClick={() => setActive()}>
      <span></span>
      <span></span>
      <span></span>
      <span className='sr-only'>menu</span>
    </button>
  )
}
