import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ToggleButton } from './ToggleButton'

describe('ToggleButton', () => {
  const mockSetActive = jest.fn()

  beforeEach(() => {
    mockSetActive.mockClear()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ToggleButton active={false} setActive={mockSetActive} />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(
      <ToggleButton active={false} setActive={mockSetActive} />
    )
    expect(container).toMatchSnapshot()
  })

  it('sets data-active attribute based on active prop', () => {
    const { rerender } = render(
      <ToggleButton active={false} setActive={mockSetActive} />
    )
    const button = screen.getByRole('button')
    expect(button.getAttribute('data-active')).toBe('false')

    rerender(<ToggleButton active={true} setActive={mockSetActive} />)
    expect(button.getAttribute('data-active')).toBe('true')
  })

  it('calls setActive on click', () => {
    render(<ToggleButton active={false} setActive={mockSetActive} />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockSetActive).toHaveBeenCalledTimes(1)
  })

  it('toggles state via setActive callback', () => {
    let currentState = false
    const toggleSetActive = jest.fn((updater: (prev: boolean) => boolean) => {
      currentState = updater(currentState)
    })
    render(<ToggleButton active={currentState} setActive={toggleSetActive} />)
    fireEvent.click(screen.getByRole('button'))
    expect(currentState).toBe(true)
  })

  it('renders three visual spans plus sr-only label', () => {
    const { container } = render(
      <ToggleButton active={false} setActive={mockSetActive} />
    )
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(4)
  })

  it('has accessible menu label via sr-only span', () => {
    render(<ToggleButton active={false} setActive={mockSetActive} />)
    expect(screen.getByText('menu')).toBeInTheDocument()
  })

  it('applies custom yPosition via CSS variable', () => {
    render(<ToggleButton active={false} setActive={mockSetActive} yPosition="3rem" />)
    const button = screen.getByRole('button')
    expect(button.style.getPropertyValue('--top')).toBe('3rem')
  })

  it('defaults yPosition to 2rem', () => {
    render(<ToggleButton active={false} setActive={mockSetActive} />)
    const button = screen.getByRole('button')
    expect(button.style.getPropertyValue('--top')).toBe('2rem')
  })
})
