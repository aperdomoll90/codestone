import './styles.css'
import '../../utils/GlobalStyles.css'
import { ToggleButtonPropsType } from './ToggleButton.types'

export const ToggleButton: React.FC<ToggleButtonPropsType> = ({ size, color, buttonHover, buttonBackgroundColor, shadow, active, setActive, ariaControls, ariaExpanded, top, bottom, left, right, customClass }) => {
  const isActive = active ? 'ToggleButtonActive ToggleButton' : 'ToggleButton'
  const classArray = customClass && customClass ? `${isActive} ${customClass}` : isActive

  return (
    <button
      className={classArray}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      style={
        {
          '--size': '2rem',
        } as React.CSSProperties
      }
      onClick={() => setActive()}>
      <span></span>
      <span></span>
      <span></span>
      <span className='sr-only'>menu</span>
    </button>
  )
}
