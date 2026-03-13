import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AboutSection } from './AboutSection'
import { getMockPush } from '../../../../../__mocks__/next-view-transitions'

describe('AboutSection', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<AboutSection />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { container } = render(<AboutSection />)
    expect(container).toMatchSnapshot()
  })

  it('renders the primary message', () => {
    render(<AboutSection />)
    expect(screen.getByText(/craft an intuitive, accessible experience/)).toBeInTheDocument()
  })

  it('renders the secondary message', () => {
    render(<AboutSection />)
    expect(screen.getByText(/creativity, code, and interaction insight/)).toBeInTheDocument()
  })

  it('renders all bubble buttons', () => {
    render(<AboutSection />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('CodePen')).toBeInTheDocument()
    expect(screen.getByText('Resume')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('npm')).toBeInTheDocument()
  })

  it('navigates to /about when About Me is clicked', () => {
    const mockPush = getMockPush()
    mockPush.mockClear()
    render(<AboutSection />)
    fireEvent.click(screen.getByText('About Me'))
    expect(mockPush).toHaveBeenCalledWith('/about')
  })

  it('navigates to /resume when Resume is clicked', () => {
    const mockPush = getMockPush()
    mockPush.mockClear()
    render(<AboutSection />)
    fireEvent.click(screen.getByText('Resume'))
    expect(mockPush).toHaveBeenCalledWith('/resume')
  })

  it('renders CodePen as an external link', () => {
    render(<AboutSection />)
    const codepenLink = screen.getByText('CodePen').closest('a')
    expect(codepenLink).toHaveAttribute('href', 'https://codepen.io/fuzzy-wolfpup/collections/')
  })

  it('renders GitHub as an external link', () => {
    render(<AboutSection />)
    const githubLink = screen.getByText('GitHub').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aperdomoll90')
  })

  it('renders npm as an external link', () => {
    render(<AboutSection />)
    const npmLink = screen.getByText('npm').closest('a')
    expect(npmLink).toHaveAttribute('href', 'https://www.npmjs.com/~aperdomoll90')
  })
})
