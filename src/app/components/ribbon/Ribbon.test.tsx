import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Ribbon } from './Ribbon'

describe('Ribbon', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Ribbon />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<Ribbon />)
    expect(container).toMatchSnapshot()
  })

  it('is marked as aria-hidden', () => {
    const { container } = render(<Ribbon />)
    const ribbon = container.firstChild as HTMLElement
    expect(ribbon.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders the ribbon text', () => {
    render(<Ribbon />)
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Global')).toBeInTheDocument()
    expect(screen.getByText('Solutions')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    const { container } = render(<Ribbon className="hero-ribbon" />)
    const ribbon = container.firstChild as HTMLElement
    expect(ribbon.className).toContain('hero-ribbon')
  })
})
