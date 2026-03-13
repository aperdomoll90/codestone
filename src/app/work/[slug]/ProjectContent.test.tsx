import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import ProjectContent from './ProjectContent'
import { ProjectDetail } from '../../data/projects'

const createMockProject = (overrides?: Partial<ProjectDetail>): ProjectDetail => ({
  id: 'test-project',
  name: 'Test Project',
  location: 'npm',
  services: 'Full-Stack Dev',
  year: '2024',
  image: '/test.png',
  overview: 'A test project overview.',
  features: ['Feature one', 'Feature two', 'Feature three'],
  techStack: [
    { category: 'Frontend', items: ['React', 'TypeScript'] },
    { category: 'Backend', items: ['Node.js', 'Express'] },
  ],
  ...overrides,
})

describe('ProjectContent', () => {
  it('has no accessibility violations with project', async () => {
    const { container } = render(<ProjectContent project={createMockProject()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot with project', () => {
    const { container } = render(<ProjectContent project={createMockProject()} />)
    expect(container).toMatchSnapshot()
  })

  it('renders "Project not found" when project is undefined', () => {
    render(<ProjectContent project={undefined} />)
    expect(screen.getByText('Project not found')).toBeInTheDocument()
  })

  it('renders project name as heading', () => {
    render(<ProjectContent project={createMockProject({ name: 'css-forge' })} />)
    expect(screen.getByText('css-forge')).toBeInTheDocument()
  })

  it('renders hero header labels', () => {
    render(<ProjectContent project={createMockProject()} />)
    expect(screen.getByText('Role/Service')).toBeInTheDocument()
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()
  })

  it('renders project info (services, location, year)', () => {
    render(<ProjectContent project={createMockProject({
      services: 'React Library',
      location: 'Remote',
      year: '2025',
    })} />)
    expect(screen.getByText('React Library')).toBeInTheDocument()
    expect(screen.getByText('Remote')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
  })

  it('renders overview text', () => {
    render(<ProjectContent project={createMockProject()} />)
    expect(screen.getByText('A test project overview.')).toBeInTheDocument()
  })

  it('renders all features', () => {
    render(<ProjectContent project={createMockProject()} />)
    expect(screen.getByText('Feature one')).toBeInTheDocument()
    expect(screen.getByText('Feature two')).toBeInTheDocument()
    expect(screen.getByText('Feature three')).toBeInTheDocument()
  })

  it('renders tech stack categories and items', () => {
    render(<ProjectContent project={createMockProject()} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders image when project has no video', () => {
    render(<ProjectContent project={createMockProject()} />)
    const image = screen.getByAltText('Test Project')
    expect(image).toBeInTheDocument()
  })

  it('renders video when project has video', () => {
    const { container } = render(
      <ProjectContent project={createMockProject({ video: '/test-video.mp4' })} />
    )
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video?.getAttribute('src')).toBe('/test-video.mp4')
  })

  it('renders GitHub link when githubUrl is provided', () => {
    render(<ProjectContent project={createMockProject({ githubUrl: 'https://github.com/test' })} />)
    const githubLink = screen.getByText('GitHub').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test')
  })

  it('renders NPM link when npmUrl is provided', () => {
    render(<ProjectContent project={createMockProject({ npmUrl: 'https://npmjs.com/test' })} />)
    const npmLink = screen.getByText('NPM').closest('a')
    expect(npmLink).toHaveAttribute('href', 'https://npmjs.com/test')
  })

  it('does not render GitHub/NPM links when urls are absent', () => {
    render(<ProjectContent project={createMockProject()} />)
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
    expect(screen.queryByText('NPM')).not.toBeInTheDocument()
  })

  it('does not render content section when project is undefined', () => {
    const { container } = render(<ProjectContent project={undefined} />)
    expect(container.querySelector('video')).not.toBeInTheDocument()
    expect(container.querySelectorAll('img').length).toBe(0)
  })
})
