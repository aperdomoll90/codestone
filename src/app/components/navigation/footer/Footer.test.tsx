import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Footer } from './Footer'

describe('Footer', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })

  it('renders the email link', () => {
    render(<Footer />)
    const emailLink = screen.getByText('aperdomoll90@gmail.com')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:aperdomoll90@gmail.com')
  })

  it('renders the phone link', () => {
    render(<Footer />)
    const phoneLink = screen.getByText('+1 305 343 9033')
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+13052020222')
  })

  it('renders the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText('2025 © Edition')).toBeInTheDocument()
  })

  it('renders the LinkedIn link', () => {
    render(<Footer />)
    const linkedinLink = screen.getByText('LinkedIn')
    expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/adrian-perdomo-12997474/')
  })
})
