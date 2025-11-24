import styles from './ToggleButton.module.scss'
import '../../utils/GlobalStyles.css'
import { ToggleButtonPropsType } from './ToggleButton.types'

export const ToggleButton: React.FC<ToggleButtonPropsType> = ({ active, setActive }) => {
  return (
    <button
      className={styles['c-toggle-button']}
      data-active={active}
      style={
        {
          '--size': '2rem',
        } as React.CSSProperties
      }
      onClick={() => setActive(prev => !prev)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span className='sr-only'>menu</span>
    </button>
  )
}
