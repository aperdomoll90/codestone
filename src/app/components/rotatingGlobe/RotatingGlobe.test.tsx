import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { RotatingGlobe } from './RotatingGlobe'

describe('RotatingGlobe', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<RotatingGlobe />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<RotatingGlobe />)
    expect(container).toMatchSnapshot()
  })

  it('renders 5 longitude lines', () => {
    const { container } = render(<RotatingGlobe />)
    const longitudeSpans = container.querySelectorAll('span')
    expect(longitudeSpans.length).toBe(5)
  })

  it('applies custom className', () => {
    const { container } = render(<RotatingGlobe className="custom-globe" />)
    const globe = container.firstChild as HTMLElement
    expect(globe.className).toContain('custom-globe')
  })

  it('sets globe color CSS variable when color prop is provided', () => {
    const { container } = render(<RotatingGlobe color="var(--white)" />)
    const globe = container.firstChild as HTMLElement
    expect(globe.style.getPropertyValue('--globe-color')).toBe('var(--white)')
  })

  it('does not set style when no color prop is provided', () => {
    const { container } = render(<RotatingGlobe />)
    const globe = container.firstChild as HTMLElement
    expect(globe.getAttribute('style')).toBeNull()
  })
})
