import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { BentoGrid } from './BentoGrid'
import { getMockPush } from '../../../../__mocks__/next-view-transitions'

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

describe('BentoGrid', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<BentoGrid />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 15000)

  it('matches snapshot', () => {
    const { container } = render(<BentoGrid />)
    expect(container).toMatchSnapshot()
  })

  it('renders 8 cards in compact variant by default', () => {
    const { container } = render(<BentoGrid />)
    const cards = container.querySelectorAll('a')
    expect(cards.length).toBe(8)
  })

  it('renders all 12 cards in full variant', () => {
    const { container } = render(<BentoGrid variant="full" />)
    const cards = container.querySelectorAll('a')
    expect(cards.length).toBe(12)
  })

  it('sets data-variant attribute', () => {
    const { container } = render(<BentoGrid variant="full" />)
    const grid = container.firstChild as HTMLElement
    expect(grid.getAttribute('data-variant')).toBe('full')
  })

  it('applies additional className', () => {
    const { container } = render(<BentoGrid className="custom-grid" />)
    const grid = container.firstChild as HTMLElement
    expect(grid.className).toContain('custom-grid')
  })

  it('renders project titles', () => {
    render(<BentoGrid />)
    expect(screen.getByText('RockVal')).toBeInTheDocument()
    expect(screen.getByText('csv-conductor')).toBeInTheDocument()
    expect(screen.getByText('QuartzCouncil')).toBeInTheDocument()
    expect(screen.getByText('css-forge')).toBeInTheDocument()
  })

  it('renders project roles', () => {
    render(<BentoGrid />)
    expect(screen.getByText('Mobile Dev')).toBeInTheDocument()
    expect(screen.getAllByText('npm Library').length).toBeGreaterThanOrEqual(1)
  })

  it('renders View button on each card', () => {
    render(<BentoGrid />)
    const viewButtons = screen.getAllByText('View')
    expect(viewButtons.length).toBe(8)
  })

  it('navigates to project page on card click', () => {
    const mockPush = getMockPush()
    mockPush.mockClear()
    render(<BentoGrid />)
    const firstCard = screen.getAllByText('View')[0].closest('a') as HTMLElement
    fireEvent.click(firstCard)
    expect(mockPush).toHaveBeenCalledWith('/work/rockval')
  })

  it('renders project descriptions', () => {
    render(<BentoGrid />)
    expect(screen.getByText('Real estate investment app')).toBeInTheDocument()
    expect(screen.getByText('CSV parser & generator')).toBeInTheDocument()
    expect(screen.getByText('AI code review agent')).toBeInTheDocument()
    expect(screen.getByText('React component library')).toBeInTheDocument()
  })

  it('renders static images for hover-video projects', () => {
    render(<BentoGrid />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(1)
  })
})
