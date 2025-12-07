import React, { useRef } from 'react'
import Link from 'next/link'

import { MagnetizeComponent } from '@/app/components/utils/MagnetizeComponent'
import styles from './BubbleButton.module.scss'

interface ValuePerBreakpoint {
  default?: string
  sm?: string
  md?: string
  mdx?: string
  lg?: string
}



interface CSSVarFontSizes extends React.CSSProperties {
  '--fs-default'?: string
  '--fs-sm'?: string
  '--fs-md'?: string
  '--fs-mdx'?: string
  '--fs-lg'?: string

  '--area-default'?: string
  '--area-sm'?: string
  '--area-md'?: string
  '--area-mdx'?: string
  '--area-lg'?: string

  '--pad-default'?: string
  '--pad-sm'?: string
  '--pad-md'?: string
  '--pad-mdx'?: string
  '--pad-lg'?: string
}


interface BubbleButtonProps {
  label: string
  fontSize?: string | ValuePerBreakpoint
  magnetArea?: string | ValuePerBreakpoint
  padding?: string | ValuePerBreakpoint
  className?: string
  onClick?: () => void
  href?: string
}

const BubbleButton: React.FC<BubbleButtonProps> = ({ label, fontSize = '1.5rem', className = '', onClick, href, magnetArea = '4rem' , padding = "1rem"}) => {
  const areaRef = useRef<HTMLDivElement | null>(null)

  const { handleMouseMove, handleMouseLeave } = MagnetizeComponent({
    areaRef,
    targets: [
      {
        selector: `.${styles['c-bubble-button']}`,
        options: {
          intensity: 0.4,
          followLerpFactor: 0.1,
          clampWithinArea: true,
          returnSpring: { stiffness: 11, damping: 14, precision: 0.01 },
        },
      },
      {
        selector: `.${styles['c-bubble-button__label']}`,
        options: {
          intensity: 0.15,
          followLerpFactor: 0.1,
          clampWithinArea: true,
          returnSpring: { stiffness: 11, damping: 14, precision: 0.01 },
        },
      },
    ],
  })

  const sizeVars: CSSVarFontSizes = {
    ...(typeof fontSize === 'string'
      ? { '--fs-default': fontSize }
      : {
          '--fs-default': fontSize?.default,
          '--fs-sm': fontSize?.sm,
          '--fs-md': fontSize?.md,
          '--fs-mdx': fontSize?.mdx,
          '--fs-lg': fontSize?.lg,
        }),

    ...(typeof magnetArea === 'string'
      ? { '--area-default': magnetArea }
      : {
          '--area-default': magnetArea?.default,
          '--area-sm': magnetArea?.sm,
          '--area-md': magnetArea?.md,
          '--area-mdx': magnetArea?.mdx,
          '--area-lg': magnetArea?.lg,
      }),
    
        ...(typeof padding === 'string'
      ? { '--pad-default': padding }
      : {
          '--pad-default': padding?.default,
          '--pad-sm': padding?.sm,
          '--pad-md': padding?.md,
          '--pad-mdx': padding?.mdx,
          '--pad-lg': padding?.lg,
        }),
  }

  return (
    <div
      ref={areaRef}
      className={`${className} ${styles['c-bubble']}`}
      style={sizeVars}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      {href ? (
        <Link href={href} target='_blank' rel='noopener noreferrer' className={styles['c-bubble-button']} onClick={onClick}>
          <span className={styles['c-bubble-button__label']}>{label}</span>
        </Link>
      ) : (
        <button type='button' onClick={onClick} className={styles['c-bubble-button']} style={sizeVars}>
          <span className={styles['c-bubble-button__label']}>{label}</span>
        </button>
      )}
    </div>
  )
}

export default BubbleButton
