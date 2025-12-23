export interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
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
    'Certified EMT, fluent in English and Spanish, has worked in medical data and medical finance as well as IT at a medical school. I love art, cooking, baking, medical applications of technology, nanotechnology, automation, AI, and I hope to improve lives through my work.',
  experience: [
    {
      title: 'Software Engineer',
      company: 'Rockval, Inc',
      location: 'West Palm Beach',
      period: '07/2021 – 09/2021',
      description: 'Mobile Application Development, Front-end Development, Design, UX/UI.',
    },
    {
      title: 'Baker',
      company: "Scramble Jake's",
      location: 'Knoxville TN',
      period: '08/2020 – 02/2021',
      description:
        'Assist the Executive Pastry Chef in the daily activities of the kitchen, including, inventory, purchasing of supplies, and cost control.',
    },
    {
      title: 'Home Health Intake Coordinator',
      company: 'First Choice Home Health and Hospice',
      location: 'Harrisonburg VA',
      period: '03/2020 – 07/2020',
      description:
        'Insurance and medical data collection management for Home Care, Home Health and Hospice department. Maintain accuracy of records of physicians, family/friends, and facilities.',
    },
    {
      title: 'Pastry Chef Assistant',
      company: 'Wild Thyme at the Atlantic Hotel',
      location: 'Fort Lauderdale FL',
      period: '10/2019 – 02/2020',
      description:
        'Assist the Executive Pastry Chef in the daily activities of the kitchen, including menu development, inventory, purchasing of supplies, and cost control.',
    },
    {
      title: 'Medicaid Financial Analyst',
      company: 'Change Healthcare',
      location: 'Boca Raton FL',
      period: '10/2016 – 10/2019',
      description:
        'Collection, maintenance and verification of insurance and medical data to ensure fulfillment of Medicaid and Medicare programs assistance for eligible patients. Experience with medical insurance verification systems, Cerner Powerchart EMR, PHI, PII, and HIPAA.',
    },
    {
      title: 'Red Zone Specialist',
      company: 'Apple',
      location: 'Boca Raton',
      period: '07/2015 – 12/2016',
      description:
        "Provided support, training and troubleshooting for customers' existing products and applications, as well as recommending new products that fit their technical requirements.",
    },
    {
      title: 'Administrative Assistant',
      company: 'Ameriprise Financial',
      location: 'Boca Raton',
      period: '07/2014 – 10/2016',
      description:
        'Managed workflow by assigning tasks to other administrative employees, ensuring that deadlines were met and expectations were exceeded. Assumed responsibility for maintenance of office equipment.',
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
