import styles from './ToggleButton.module.scss'
import { ToggleButtonPropsType } from './ToggleButton.types'

export const ToggleButton: React.FC<ToggleButtonPropsType> = ({ active, setActive, yPosition='2rem' }) => {
  return (
    <button
      className={styles['c-toggle-button']}
      data-active={active}
      style={
        {
          '--top': yPosition,
        } as React.CSSProperties
      }
      onClick={() => setActive(prev => !prev)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span  className={styles['sr-only']}>menu</span>
    </button>
  )
}
