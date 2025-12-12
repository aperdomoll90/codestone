export interface ProjectDetail {
  id: string
  name: string
  location: string
  services: string
  year: string
  image: string
  liveUrl?: string
  githubUrl?: string
  overview: string
  features: string[]
  techStack: {
    category: string
    items: string[]
  }[]
}

export interface NpmProject {
  id: string
  name: string
  location: string
  services: string
  year: string
  image: string
  href: string
  isExternal: true
}

export const npmProjects: NpmProject[] = [
  {
    id: 'point-focus',
    name: 'point-focus',
    location: 'npm',
    services: 'Image Zoom & Focus React Component',
    href: 'https://www.npmjs.com/package/point-focus',
    year: '2020',
    image: '/pointFocus.png',
    isExternal: true,
  },
]

export const projectsData: Record<string, ProjectDetail> = {
  wonderlust: {
    id: 'wonderlust',
    name: 'Wonderlust',
    services: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
    liveUrl: '#',
    githubUrl: '#',
    overview:
      'Wonderlust helps outdoor enthusiasts discover, plan and share all types of hiking routes. By combining user-generated content with real-time weather data, it ensures every adventure is tailored to planning. Made for both seasoned explorers and beginners into independent hikes in beautiful surroundings.',
    features: [
      'Live Weather Data To Users (MQTT)',
      'AI to Interact and learn to fit individual Profiles',
      'Catalog View Products For the Marketplace',
      'Seasonal (CRON/JOBS) challenges',
      'Data Share & Accessible To Explorers/Users',
    ],
    techStack: [
      {
        category: 'Built with',
        items: ['Next.js', 'Node.js', 'PostgreSQL', 'Mapbox.js + API (Mapbox)', 'Resend.js + Landlord + DP (Hosting)'],
      },
      {
        category: 'design+tools palette:',
        items: ['Figma/Adobe palette, CLI, qlip', 'design+tool, ms (audible, hello)', 'design+tool3 (pngs)'],
      },
    ],
  },
  nymph: {
    id: 'nymph',
    name: 'Nymph',
    services: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/djslide.png',
    liveUrl: '#',
    githubUrl: '#',
    overview: 'A creative music platform for DJs and producers to showcase their work and connect with fans.',
    features: ['Real-time audio streaming', 'Artist collaboration tools', 'Event scheduling', 'Fan engagement features'],
    techStack: [
      {
        category: 'Built with',
        items: ['React', 'Node.js', 'MongoDB', 'Web Audio API'],
      },
    ],
  },
  five4free: {
    id: 'five4free',
    name: 'Five4Free',
    services: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/hikerslide.png',
    liveUrl: '#',
    overview: 'A platform connecting volunteers with local community service opportunities.',
    features: ['Volunteer matching', 'Event management', 'Impact tracking', 'Community forums'],
    techStack: [
      {
        category: 'Built with',
        items: ['Next.js', 'Prisma', 'PostgreSQL'],
      },
    ],
  },
  posidon: {
    id: 'posidon',
    name: 'Posidon',
    services: 'Design & Development',
    location: 'USA',
    year: '2020',
    image: '/carouselassets/djslide.png',
    liveUrl: '#',
    githubUrl: '#',
    overview: 'An ocean conservation app that tracks marine wildlife and pollution levels.',
    features: ['Wildlife tracking', 'Pollution monitoring', 'Data visualization', 'Alert system'],
    techStack: [
      {
        category: 'Built with',
        items: ['React Native', 'Node.js', 'MongoDB', 'MapBox'],
      },
    ],
  },
}

// Get all web projects for the work route grid
export function getWebProjects() {
  return Object.values(projectsData).map(project => ({
    id: project.id,
    name: project.name,
    location: project.location,
    services: project.services,
    year: project.year,
    image: project.image,
    href: `/work/${project.id}`,
  }))
}

// Get a single project by slug for the detail page
export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData[slug]
}

// Get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
  return Object.keys(projectsData)
}
