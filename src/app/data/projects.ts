export interface ProjectDetail {
  id: string
  name: string
  location: string
  services: string
  year: string
  image: string
  video?: string
  liveUrl?: string
  githubUrl?: string
  npmUrl?: string
  overview: string
  features: string[]
  techStack: {
    category: string
    items: string[]
  }[]
}

export interface Project {
  id: string
  name: string
  location: string
  services: string
  year: string
  image: string
  href: string
  isExternal?: boolean
}

// Full project details for detail pages
export const projectsData: Record<string, ProjectDetail> = {
  'css-forge': {
    id: 'css-forge',
    name: 'css-forge',
    location: 'npm',
    services: 'React Component Library',
    year: '2024',
    image: '/cssforge.png',
    liveUrl: 'https://aperdomoll90.github.io/css-forge',
    githubUrl: 'https://github.com/aperdomoll90/css-forge',
    npmUrl: 'https://www.npmjs.com/package/css-forge',
    overview:
      'A lightweight, customizable React component library focused on animations, magnetic effects, and interactive UI elements. Built with TypeScript and designed for modern web applications with zero dependencies on external CSS frameworks.',
    features: [
      'BubbleButton - Animated button with magnetic hover effects and bubble animations',
      'DrawButton - Text links with animated underline/circle SVG effects',
      'Magnetize Hook - Add magnetic cursor-following effects to any element',
      'Responsive sizing props with breakpoint support',
      'CSS variable theming for easy customization',
      'Tree-shakeable exports for optimal bundle size',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['React', 'TypeScript', 'CSS Modules', 'Rollup'],
      },
      {
        category: 'Features',
        items: ['Zero external dependencies', 'SSR compatible', 'Fully typed', 'Storybook documentation'],
      },
    ],
  },
  'csv-conductor': {
    id: 'csv-conductor',
    name: 'csv-conductor',
    location: 'npm',
    services: 'CSV Parser & Generator',
    year: '2024',
    image: '/csvconductor.png',
    githubUrl: 'https://github.com/aperdomoll90/csv-conductor',
    npmUrl: 'https://www.npmjs.com/package/csv-conductor',
    overview:
      'A robust TypeScript library for parsing and generating CSV files with support for complex data transformations, custom delimiters, and streaming for large datasets. Designed for both Node.js and browser environments.',
    features: [
      'Parse CSV strings or files into JavaScript objects',
      'Generate CSV from arrays or object collections',
      'Custom delimiter and quote character support',
      'Header row detection and mapping',
      'Streaming API for large file processing',
      'TypeScript generics for type-safe parsing',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['TypeScript', 'Node.js Streams', 'Vitest'],
      },
      {
        category: 'Features',
        items: ['Browser & Node.js support', 'Zero dependencies', 'RFC 4180 compliant', 'Memory efficient streaming'],
      },
    ],
  },
  'point-focus': {
    id: 'point-focus',
    name: 'point-focus',
    location: 'npm',
    services: 'Image Zoom & Focus React Component',
    year: '2020',
    image: '/ant.png',
    githubUrl: 'https://github.com/aperdomoll90/point-focus',
    npmUrl: 'https://www.npmjs.com/package/point-focus',
    overview:
      'A React component for creating interactive image zoom and focus effects. Perfect for product galleries, portfolio showcases, and any application requiring detailed image inspection with smooth pan and zoom interactions.',
    features: [
      'Smooth zoom on hover or click',
      'Pan to follow cursor movement',
      'Customizable zoom levels and transition speeds',
      'Touch support for mobile devices',
      'Lightweight with no external dependencies',
      'Accessible keyboard navigation',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['React', 'JavaScript', 'CSS Transforms'],
      },
      {
        category: 'Features',
        items: ['Touch & mouse support', 'Responsive design', 'Customizable styling', 'SSR compatible'],
      },
    ],
  },
  rockval: {
    id: 'rockval',
    name: 'RockVal',
    location: 'React Native',
    services: 'Real Estate Investment App',
    year: '2021',
    image: '/rockvalassets/rockvalbanner.png',
    video: '/rockvalassets/RockvalAppVideo.mov',
    overview:
      'A comprehensive React Native mobile application for real estate investors to analyze properties, calculate proformas, and manage their investment portfolio. Features include property search, financial analysis tools, contact management, and map-based property visualization.',
    features: [
      'Property search and analysis with financial calculations',
      'Proforma generation for investment projections',
      'Interactive maps for property visualization',
      'Contact management for deals and investors',
      'Push notifications for market updates',
      'Secure authentication with Auth0',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['React Native', 'TypeScript', 'React Navigation', 'Styled Components'],
      },
      {
        category: 'Backend & Services',
        items: ['Auth0', 'React Native Maps', 'Async Storage', 'Axios'],
      },
    ],
  },
}

// npm libraries for the work grid
export const npmProjects: Project[] = [
  {
    id: 'css-forge',
    name: 'css-forge',
    location: 'npm',
    services: 'React Component Library',
    href: '/work/css-forge',
    year: '2024',
    image: '/cssforge.png',
  },
  {
    id: 'csv-conductor',
    name: 'csv-conductor',
    location: 'npm',
    services: 'CSV Parser & Generator',
    href: '/work/csv-conductor',
    year: '2024',
    image: '/csvconductor.png',
  },
  {
    id: 'point-focus',
    name: 'point-focus',
    location: 'npm',
    services: 'Image Zoom & Focus React Component',
    href: '/work/point-focus',
    year: '2020',
    image: '/ant.png',
  },
]

// Mobile projects for the work grid
export const mobileProjects: Project[] = [
  {
    id: 'rockval',
    name: 'RockVal',
    location: 'React Native',
    services: 'Real Estate Investment App',
    href: '/work/rockval',
    year: '2021',
    image: '/rockvalassets/rockvalbanner.png',
  },
]

// Get a single project by slug for the detail page
export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData[slug]
}

// Get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
  return Object.keys(projectsData)
}

export function getProjectsByCategory(category: any): Project[] {
  const allProjects = [...npmProjects, ...mobileProjects]
  return allProjects.filter(p => p.services.includes(category))
}

export function transformProjectData(data: any): ProjectDetail {
  return {
    id: data.id,
    name: data.name,
    location: data.location,
    services: data.services,
    year: data.year,
    image: data.image,
    overview: data.description,
    features: data.features.split(','),
    techStack: data.stack
  }
}

export function getProjectFeatureCount(slug: string): number {
  const project = projectsData[slug]
  return project.features.length
}
