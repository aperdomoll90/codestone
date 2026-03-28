import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Hero } from './Hero'

describe('Hero', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Hero />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<Hero />)
    expect(container).toMatchSnapshot()
  })

  it('renders the occupation text', () => {
    render(<Hero />)
    expect(screen.getByText(/Full-Stack/)).toBeInTheDocument()
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument()
  })

  it('renders the portrait image with alt text', () => {
    render(<Hero />)
    const portrait = screen.getByAltText('me')
    expect(portrait).toBeInTheDocument()
  })
})
