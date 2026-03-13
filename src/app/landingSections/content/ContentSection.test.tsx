import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ContentSection } from './ContentSection'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  })
})

describe('ContentSection', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ContentSection />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 15000)

  it('matches snapshot', () => {
    const { container } = render(<ContentSection />)
    expect(container).toMatchSnapshot()
  })

  it('renders both AboutSection and WorkSection', () => {
    const { container } = render(<ContentSection />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(2)
  })

  it('wraps content in a CurvedSection', () => {
    const { container } = render(<ContentSection />)
    const curvedSection = container.querySelector('svg #content-curve')
    expect(curvedSection).toBeInTheDocument()
  })
})
