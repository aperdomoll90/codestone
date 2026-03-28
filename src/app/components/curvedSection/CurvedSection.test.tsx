import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CurvedSection } from './CurvedSection'

describe('CurvedSection', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <CurvedSection><p>Test content</p></CurvedSection>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(
      <CurvedSection><p>Test content</p></CurvedSection>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders children', () => {
    render(
      <CurvedSection><p>Inner content</p></CurvedSection>
    )
    expect(screen.getByText('Inner content')).toBeInTheDocument()
  })

  it('applies custom background via CSS variable', () => {
    const { container } = render(
      <CurvedSection background="var(--charcoal)"><p>Content</p></CurvedSection>
    )
    const section = container.firstChild as HTMLElement
    expect(section.style.getPropertyValue('--section-bg')).toBe('var(--charcoal)')
  })

  it('applies custom curve background via CSS variable', () => {
    const { container } = render(
      <CurvedSection curveBackground="var(--blue)"><p>Content</p></CurvedSection>
    )
    const section = container.firstChild as HTMLElement
    expect(section.style.getPropertyValue('--curve-bg')).toBe('var(--blue)')
  })

  it('sets scale CSS variables from props', () => {
    const { container } = render(
      <CurvedSection scaleFrom={20} scaleTo={5}><p>Content</p></CurvedSection>
    )
    const section = container.firstChild as HTMLElement
    expect(section.style.getPropertyValue('--curve-scale-from')).toBe('20')
    expect(section.style.getPropertyValue('--curve-scale-to')).toBe('5')
  })

  it('applies additional className', () => {
    const { container } = render(
      <CurvedSection className="custom-class"><p>Content</p></CurvedSection>
    )
    const section = container.firstChild as HTMLElement
    expect(section.className).toContain('custom-class')
  })

  it('includes SVG clipPath definition', () => {
    const { container } = render(
      <CurvedSection><p>Content</p></CurvedSection>
    )
    const clipPath = container.querySelector('#content-curve')
    expect(clipPath).toBeInTheDocument()
  })
})
