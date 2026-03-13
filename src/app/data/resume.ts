export interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  isSpacer?: boolean
}

export interface Education {
  title: string
  institution: string
  period: string
}

export interface ResumeData {
  headline: string
  about: string
  experience: Experience[]
  education: Education[]
  skills: string[]
}

export const resumeData: ResumeData = {
  headline: 'Full Stack Software Developer',
  about:
    'Full-stack software engineer with a focus on accessible UI, component libraries, and design systems in React, Next.js, and TypeScript. Author of published npm packages including css-forge, point-focus, and csv-conductor. Experience building cross-platform mobile apps with React Native and currently exploring AI agent orchestration. Bilingual in English and Spanish, certified EMT, and driven by a love for automation, art, cooking, and agriculture.',
  experience: [
    {
      title: 'Founding Engineer / Technical Lead',
      company: 'AMR Estate Wines',
      location: 'Greenfield, California',
      period: '2025 – Present',
      description:
        'Architected and built the company\'s end-to-end digital commerce infrastructure, including e-commerce storefront, point-of-sale, and inventory management systems for both online and in-person wine sales. Built internal tools for product catalog, inventory workflows, and vineyard operations, connecting Shopify, payment processors, and operational dashboards for end-to-end traceability. Implemented barcode and QR-based product tracking to streamline fulfillment, event logistics, and inventory audits. Defined the technology roadmap and system architecture, designing for scalability across future distribution channels and retail expansion.',
    },
    {
      title: 'Software Engineer',
      company: 'CITY Furniture',
      location: 'Florida, USA',
      period: '01/2022 – 03/2026',
      description:
        'Owned product pages and Blueprint, the internal UI component library powering a high-traffic e-commerce platform serving nearly 700K monthly visitors and $94M in annual online revenue. Modernized Blueprint by replacing JS-based styling with CSS-native solutions, reducing bundle size and improving both runtime performance and WCAG accessibility compliance across the entire site. Participated in the migration from React Context to Redux across product pages, cart, and checkout flows, improving state predictability on critical revenue paths. Implemented 3D model rendering on product detail pages for interactive product visualization. Built and published point-focus (npm), a physics-based image zoom library, when no existing solution met the platform\'s requirements. Served as the primary liaison between design and engineering teams, championing accessibility standards across the development workflow.',
    },
    {
      title: 'Software Engineer',
      company: 'Rockval, Inc',
      location: 'Florida, USA',
      period: '07/2021 – 09/2021',
      description:
        'Built a cross-platform commercial real estate investment platform (iOS/Android) enabling investors and portfolio managers to discover, analyze, and collaborate on property deals. Developed interactive map-based property discovery with real-time filtering across demographics, zoning, and transaction history. Implemented a financial proforma engine supporting multi-property and multi-deal analysis with rent rolls, occupancy schedules, and operating statements. Integrated HubSpot CRM for contact management and built a permission-based sharing system with NDA enforcement for secure deal collaboration. Sole developer using React Native, TypeScript, and Auth0.',
    },
    {
      title: 'Non-relevant roles',
      company: '',
      location: '',
      period: '01/2017 – 06/2021',
      description: '',
      isSpacer: true,
    },
    {
      title: 'Red Zone Specialist',
      company: 'Apple',
      location: 'Boca Raton FL',
      period: '07/2015 – 12/2016',
      description:
        "Provided support, training and troubleshooting for customers' existing products and applications, as well as recommending new products that fit their technical requirements.",
    },
    {
      title: 'Non-relevant roles',
      company: '',
      location: '',
      period: '11/2013 – 06/2015',
      description: '',
      isSpacer: true,
    },
    {
      title: 'Computer User Support Specialist',
      company: 'Facultad de Ciencias Médicas Julio Trigo López',
      location: 'Cuba',
      period: '10/2008 – 10/2013',
      description:
        'Supervised the performance, configuration, upgrade and repair of equipment and systems for employee and student use. Trained employees and students on how to use their devices and Microsoft Office applications.',
    },
  ],
  education: [
    {
      title: 'Software Engineering Career Course',
      institution: 'Boca Code',
      period: '04/2020 - 06/2020',
    },
    {
      title: 'Associate in Arts Degree (Marketing)',
      institution: 'Palm Beach State College',
      period: '09/2014 – Present',
    },
    {
      title: 'EMT Certification',
      institution: 'Palm Beach State College',
      period: '03/2015 – 09/2015',
    },
    {
      title: 'Bachelor of Science, Information Technology',
      institution: 'Institute Polytechnic Informatics Raul Cepero Bonilla',
      period: '09/2005 – 07/2008',
    },
  ],
  skills: [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'SCSS Modules',
    'Tailwind CSS',
    'Responsive & Accessible UI',
    'SVG & Canvas',
    'Three.js',
    'Node.js',
    'Express',
    'REST APIs',
    'MongoDB',
    'PostgreSQL',
    'Firebase',
    'Shopify',
    'Jest',
    'AWS (S3, Lambda, Amplify)',
    'Serverless Functions & Architecture',
    'Performance Optimization',
  ],
}
