import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Marquee } from './Marquee'

describe('Marquee', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Marquee />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<Marquee />)
    expect(container).toMatchSnapshot()
  })

  it('renders the name text', () => {
    render(<Marquee />)
    const headings = screen.getAllByText(/Adrian Perdomo/)
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('marks duplicate track as aria-hidden', () => {
    const { container } = render(<Marquee />)
    const hiddenHeadings = container.querySelectorAll('[aria-hidden="true"]')
    expect(hiddenHeadings.length).toBe(1)
  })
})
