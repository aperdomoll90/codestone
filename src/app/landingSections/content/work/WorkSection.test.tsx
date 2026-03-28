import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { WorkSection } from './WorkSection'
import { getMockPush } from '../../../../../__mocks__/next-view-transitions'

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

describe('WorkSection', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<WorkSection />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 15000)

  it('matches snapshot', () => {
    const { container } = render(<WorkSection />)
    expect(container).toMatchSnapshot()
  })

  it('renders the BentoGrid', () => {
    const { container } = render(<WorkSection />)
    const cards = container.querySelectorAll('a')
    expect(cards.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the More Work button', () => {
    render(<WorkSection />)
    expect(screen.getByText('More Work')).toBeInTheDocument()
  })

  it('navigates to /work when More Work is clicked', () => {
    const mockPush = getMockPush()
    mockPush.mockClear()
    render(<WorkSection />)
    fireEvent.click(screen.getByText('More Work'))
    expect(mockPush).toHaveBeenCalledWith('/work')
  })
})
