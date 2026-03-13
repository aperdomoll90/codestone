import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ContactSection } from './ContactSection'

describe('ContactSection', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ContactSection />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<ContactSection />)
    expect(container).toMatchSnapshot()
  })

  it('renders the heading text', () => {
    render(<ContactSection />)
    expect(screen.getByText(/Let's start a/)).toBeInTheDocument()
    expect(screen.getByText(/project together/)).toBeInTheDocument()
  })

  it('renders the FrenchBulldog illustration', () => {
    const { container } = render(<ContactSection />)
    const svgElements = container.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThanOrEqual(1)
  })
})
