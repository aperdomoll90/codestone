'use client'
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, className, ...props }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetPath = typeof href === 'string' ? href : href.pathname

    // Don't trigger loading for same-page navigation or external links
    if (targetPath === pathname || targetPath?.startsWith('http') || targetPath?.startsWith('mailto:')) {
      return
    }

    e.preventDefault()
    router.push(typeof href === 'string' ? href : href.pathname || '/')
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  )
}