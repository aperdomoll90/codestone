import React from 'react'

export const BubbleButton = ({ label, onClick, href, className }: {
  label: string
  onClick?: () => void
  href?: string
  className?: string
  fontSize?: Record<string, string>
  padding?: Record<string, string>
  magnetArea?: Record<string, string>
  backgroundColor?: string
  backgroundHoverColor?: string
  target?: string
}) => {
  if (href) {
    return <a href={href} className={className}>{label}</a>
  }
  return <button type="button" onClick={onClick} className={className}>{label}</button>
}

export const DrawButton = ({ children, href, variant, onClick, fontSize, target }: {
  children: React.ReactNode
  href?: string
  variant?: string
  onClick?: (event: React.MouseEvent) => void
  fontSize?: Record<string, string>
  target?: string
}) => {
  if (href) {
    return <a href={href} data-variant={variant} target={target} onClick={onClick}>{children}</a>
  }
  return <button type="button" data-variant={variant} onClick={onClick}>{children}</button>
}

export const useMagnetize = () => ({
  handleMouseMove: jest.fn(),
  handleMouseLeave: jest.fn(),
})
