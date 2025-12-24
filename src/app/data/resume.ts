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
    'Certified EMT, fluent in English and Spanish, has worked in medical data and medical finance as well as IT at a medical school. I love art, cooking, baking, medical applications of technology, automation, AI, and I hope to improve lives through my work.',
  experience: [
    {
      title: 'Software Engineer',
      company: 'CITY Furniture',
      location: 'Florida, USA',
      period: '01/2022 – Present',
      description: 'Developed and maintained e-commerce platform features using Next.js and Node.js microservices architecture. Deployed services on AWS infrastructure. Wrote unit and integration tests with Jest. Monitored application performance and troubleshot issues using New Relic.',
    },
    {
      title: 'Software Engineer',
      company: 'Rockval, Inc',
      location: 'Florida, USA',
      period: '07/2021 – 09/2021',
      description: 'Single-handedly developed cross-platform mobile app using React Native and Expo. Integrated Google Maps API with property pinning functionality. Implemented Redux for state management and styled-components for UI.',
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
  skills: ['React', 'JavaScript', 'HTML', 'CSS', 'SASS', 'SQL', 'NoSQL', 'Node', 'Express', 'TypeScript', 'React Native', 'Electron'],
}
