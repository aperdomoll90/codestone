import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Drawer } from './Drawer'

jest.mock('@/app/hooks/useSwipeGesture', () => ({
  useSwipeGesture: () => ({
    touchHandlers: {},
  }),
}))

describe('Drawer', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Drawer content</p>
      </Drawer>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot when open', () => {
    const { container } = render(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Drawer content</p>
      </Drawer>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders children', () => {
    render(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Drawer content</p>
      </Drawer>
    )
    expect(screen.getByText('Drawer content')).toBeInTheDocument()
  })

  it('sets data-open attribute based on open prop', () => {
    const { container, rerender } = render(
      <Drawer open={false} onClose={mockOnClose}>
        <p>Content</p>
      </Drawer>
    )
    const drawerElement = container.firstChild as HTMLElement
    expect(drawerElement.getAttribute('data-open')).toBe('false')

    rerender(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Content</p>
      </Drawer>
    )
    expect(drawerElement.getAttribute('data-open')).toBe('true')
  })

  it('sets data-anchor attribute based on anchor prop', () => {
    const { container } = render(
      <Drawer open={true} onClose={mockOnClose} anchor="right">
        <p>Content</p>
      </Drawer>
    )
    const drawerElement = container.firstChild as HTMLElement
    expect(drawerElement.getAttribute('data-anchor')).toBe('right')
  })

  it('defaults to bottom anchor', () => {
    const { container } = render(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Content</p>
      </Drawer>
    )
    const drawerElement = container.firstChild as HTMLElement
    expect(drawerElement.getAttribute('data-anchor')).toBe('bottom')
  })

  it('calls onClose when overlay is clicked', () => {
    const { container } = render(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Content</p>
      </Drawer>
    )
    const overlay = container.querySelector('[class*="overlay"]') as HTMLElement
    fireEvent.click(overlay)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked', () => {
    render(
      <Drawer open={true} onClose={mockOnClose}>
        <p>Content</p>
      </Drawer>
    )
    const closeButton = screen.getByLabelText('Close drawer')
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('hides close button when hideCloseButton is true', () => {
    render(
      <Drawer open={true} onClose={mockOnClose} hideCloseButton>
        <p>Content</p>
      </Drawer>
    )
    expect(screen.queryByLabelText('Close drawer')).not.toBeInTheDocument()
  })
})
