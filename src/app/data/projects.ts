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
    image: '/csvConductorStatic.png',
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
  stop: {
    id: 'stop',
    name: 'Sea Turtle Oversight Protection',
    location: 'Fort Lauderdale, FL',
    services: 'Design & Development',
    year: '2024',
    image: '/stop.png',
    liveUrl: 'https://sea-turtle-op-7f429.web.app/',
    overview:
      'Designed and developed the web platform for Sea Turtle Oversight Protection (STOP), a non-profit conservation organization in Broward County, Florida dedicated to rescuing disoriented sea turtle hatchlings. The platform serves as the digital face of the organization, featuring a 3D interactive sea turtle model, educational resources about coastal lighting impacts on marine life, and integrated donation and volunteer recruitment flows.',
    features: [
      '3D interactive sea turtle model rendered in the browser',
      'Educational content on coastal lighting and hatchling disorientation',
      'Volunteer recruitment and membership registration flows',
      'Donation integration via Square payment links',
      'Name-a-hatchling program with e-commerce through Square',
      'Guided eco-tour booking system (Turtle Treks)',
      'Responsive dark-themed design reflecting the nighttime conservation work',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['Next.js', 'TypeScript', 'Three.js', 'SCSS Modules'],
      },
      {
        category: 'Infrastructure',
        items: ['Firebase Hosting', 'Square API', 'Responsive Design'],
      },
    ],
  },
  'starbrite-rebate': {
    id: 'starbrite-rebate',
    name: 'StarPriority',
    location: 'Fort Lauderdale, FL',
    services: 'Full-Stack Development',
    year: '2023',
    image: '/staticRebate.png',
    overview:
      'Built a full-stack rebate submission platform for Star brite, enabling customers to submit product rebates with file uploads, reCAPTCHA verification, and automated email confirmations. Includes a secure admin portal for reviewing submissions, managing rebate status, and exporting data to CSV for reporting.',
    features: [
      'Customer rebate submission flow with multi-step form',
      'Image and file upload with AWS S3 storage',
      'reCAPTCHA integration for spam prevention',
      'Automated email confirmations to customers',
      'Admin portal for reviewing and managing submissions',
      'CSV export for data reporting and analysis',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['Next.js', 'TypeScript', 'Node.js', 'SCSS Modules'],
      },
      {
        category: 'Infrastructure',
        items: ['AWS S3', 'AWS SES', 'reCAPTCHA', 'PostgreSQL'],
      },
    ],
  },
  'starbrite-locator': {
    id: 'starbrite-locator',
    name: 'StarLocator',
    location: 'Fort Lauderdale, FL',
    services: 'Full-Stack Development',
    year: '2023',
    image: '/starLocator.png',
    overview:
      'Developed a product-based store locator for the Star brite Shopify ecosystem, allowing customers to find nearby retailers carrying specific products. Store data is uploaded via CSV into a database, and results are displayed on an interactive map. Built as a standalone React application embedded into the Shopify storefront.',
    features: [
      'Location-based search with configurable radius',
      'Product-specific store filtering',
      'Interactive map with store pins and details',
      'CSV-based store data import and management',
      'Embedded into Shopify storefront seamlessly',
      'Responsive design for mobile and desktop',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['React', 'TypeScript', 'Google Maps API', 'SCSS Modules'],
      },
      {
        category: 'Infrastructure',
        items: ['Shopify Integration', 'PostgreSQL', 'Node.js API', 'CSV Import Pipeline'],
      },
    ],
  },
  'quartz-council': {
    id: 'quartz-council',
    name: 'QuartzCouncil',
    location: 'GitHub App',
    services: 'AI Code Review Agent',
    year: '2025',
    image: '/quartzStatic.png',
    video: '/quartsCouncilVideo.mp4',
    githubUrl: 'https://github.com/aperdomoll90/quartz-council',
    overview:
      'An opt-in, on-demand AI pull request reviewer triggered by /quartz review commands on GitHub PRs. Uses a multi-agent "review council" architecture where specialized reviewer agents analyze code in parallel, then a moderator deduplicates and publishes high-signal inline comments and a summary. Deployed on AWS Lambda with SQS for async processing and DynamoDB for idempotency.',
    features: [
      'Multi-agent review council with specialized reviewers running in parallel',
      'Amethyst agent for TypeScript type safety (unsafe casts, missing null guards, any misuse)',
      'Citrine agent for React/Next.js performance and architecture patterns',
      'Chalcedony agent for repo-specific conventions via .quartzcouncil.yml config',
      'Quartz moderator for deduplication, comment limiting, and summary generation',
      'Inline comments snapped to valid diff lines with severity levels',
      'Quality controls: hedging filter, false positive detection, Jaccard deduplication',
      'Rate limiting, idempotency checking, and token usage tracking with cost estimation',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['Python', 'FastAPI', 'LangChain', 'OpenAI SDK', 'Pydantic'],
      },
      {
        category: 'Infrastructure',
        items: ['AWS Lambda', 'AWS SQS', 'AWS DynamoDB', 'AWS API Gateway', 'AWS SAM'],
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
    image: '/csvConductorStatic.png',
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

// Web projects for the work grid
export const webProjects: Project[] = [
  {
    id: 'stop',
    name: 'Sea Turtle Oversight Protection',
    location: 'Fort Lauderdale, FL',
    services: 'Design & Development',
    href: '/work/stop',
    year: '2024',
    image: '/stop.png',
  },
  {
    id: 'starbrite-rebate',
    name: 'StarPriority',
    location: 'Fort Lauderdale, FL',
    services: 'Full-Stack Development',
    href: '/work/starbrite-rebate',
    year: '2023',
    image: '/staticRebate.png',
  },
  {
    id: 'starbrite-locator',
    name: 'StarLocator',
    location: 'Fort Lauderdale, FL',
    services: 'Full-Stack Development',
    href: '/work/starbrite-locator',
    year: '2023',
    image: '/starLocator.png',
  },
  {
    id: 'quartz-council',
    name: 'QuartzCouncil',
    location: 'GitHub App',
    services: 'AI Code Review Agent',
    href: '/work/quartz-council',
    year: '2025',
    image: '/quartzStatic.png',
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

