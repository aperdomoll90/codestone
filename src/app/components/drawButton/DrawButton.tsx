import React from 'react'
import Link from 'next/link'
import styles from './DrawButton.module.scss'
import { Swoosh, UnderSwoosh } from '../../../../public/swoosh'

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

type DrawButtonVariant = 'circled' | 'underline'

interface DrawButtonProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
  className?: string
  fontSize?: string | ValuePerBreakpoint
  target?: string
  variant?: DrawButtonVariant
  style?: React.CSSProperties
}

export const DrawButton: React.FC<DrawButtonProps> = ({ href, onClick, children, className = '', fontSize = '1rem', target, variant = 'circled', style }) => {
  const sizeVars: CSSVarFontSizes =
    typeof fontSize === 'string'
      ? { '--fs-default': fontSize }
      : {
          '--fs-default': fontSize?.default,
          '--fs-sm': fontSize?.sm,
          '--fs-md': fontSize?.md,
          '--fs-mdx': fontSize?.mdx,
          '--fs-lg': fontSize?.lg,
        }

  const combinedStyles = { ...sizeVars, ...style }

  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:') || href?.startsWith('tel:')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  const SvgComponent = variant === 'underline' ? UnderSwoosh : Swoosh

  return (
    <Link
      href={href || '#'}
      onClick={handleClick}
      className={`${styles['c-draw-button']} ${className}`}
      style={combinedStyles}
      data-variant={variant}
      target={target || (isExternal ? '_blank' : undefined)}
      rel={isExternal ? 'noopener noreferrer' : undefined}>
      <span className={styles['c-draw-button__label']}>{children}</span>
      <SvgComponent className={styles['c-draw-button__svg']} />
    </Link>
  )
}
