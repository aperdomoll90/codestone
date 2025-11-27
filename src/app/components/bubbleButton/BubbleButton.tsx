import React, { useRef } from 'react'
import styles from './BubbleButton.module.scss'
import { SingleItemFollowMouse } from '@/app/utils/FollowMouse'

interface BubbleButtonFontSize {
  default?: string
  sm?: string
  md?: string
  lg?: string
}

interface CSSVarFontSizes extends React.CSSProperties {
  '--fs-default'?: string
  '--fs-sm'?: string
  '--fs-md'?: string
  '--fs-lg'?: string
}

interface BubbleButtonProps {
  label: string
  fontSize?: string | BubbleButtonFontSize
  className?: string
  onClick?: () => void
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ label, fontSize = '1.5rem', className = '', onClick }) => {
  const areaRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove: handleLabelMouseMove, handleMouseLeave: handleLabelMouseLeave } = SingleItemFollowMouse({
    areaRef,
    targetSelector: `.${styles['c-bubble-button__label']}`,
    options: {
      intensity: 0.15, // how far it can travel (0.5 = half as far)
      // maxTravelPercent: 60,           // hard cap (±%)
      followLerpFactor: 0.1, // chase speed (lower = more delay)
      // cursorOffsetPercent: { x: 6, y: -4 }, // sit a bit off the cursor
      clampWithinArea: true, // keep inside its span
      returnSpring: { stiffness: 11, damping: 14, precision: 0.01 }, // bounce back feel
    },
  })

  const { handleMouseMove: handleButtonMouseMove, handleMouseLeave: handleButtonMouseLeave } = SingleItemFollowMouse({
    areaRef,
    targetSelector: `.${styles['c-bubble-button']}`,
    options: {
      intensity: 0.4,
      followLerpFactor: 0.1,
      clampWithinArea: true,
      returnSpring: { stiffness: 11, damping: 14, precision: 0.01 },
    },
  })

  // 3) Fan out events to both behaviors
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    handleLabelMouseMove(e)
    handleButtonMouseMove(e)
  }

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    handleLabelMouseLeave()
    handleButtonMouseLeave()
  }

  const sizeVars: CSSVarFontSizes =
    typeof fontSize === 'string'
      ? { '--fs-default': fontSize }
      : {
          '--fs-default': fontSize?.default,
          '--fs-sm': fontSize?.sm,
          '--fs-md': fontSize?.md,
          '--fs-lg': fontSize?.lg,
        }

  return (
    <div ref={areaRef} className={`${className} ${styles['c-bubble']}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <button type='button' onClick={onClick} className={`${styles['c-bubble-button']}`} style={sizeVars}>
        <span className={styles['c-bubble-button__label']}>{label}</span>
      </button>
    </div>
  )
}

export default BubbleButton
