import React from 'react'
import Link from 'next/link'
import styles from './DrawButton.module.scss'
import { Swoosh } from '../../../../public/swoosh'

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
}

interface DrawButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  fontSize?: string | ValuePerBreakpoint
  target?: string
}

export const DrawButton: React.FC<DrawButtonProps> = ({
  href,
  children,
  className = '',
  fontSize = '1rem',
  target,
}) => {
  const sizeVars: CSSVarFontSizes = typeof fontSize === 'string'
    ? { '--fs-default': fontSize }
    : {
        '--fs-default': fontSize?.default,
        '--fs-sm': fontSize?.sm,
        '--fs-md': fontSize?.md,
        '--fs-mdx': fontSize?.mdx,
        '--fs-lg': fontSize?.lg,
      }

  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

  return (
    <Link
      href={href}
      className={`${styles['c-draw-button']} ${className}`}
      style={sizeVars}
      target={target || (isExternal ? '_blank' : undefined)}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span className={styles['c-draw-button__label']}>{children}</span>
      <Swoosh className={styles['c-draw-button__svg']} />
    </Link>
  )
}
