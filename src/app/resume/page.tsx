'use client'
import React from 'react'
import styles from './Resume.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { resumeData } from '@/app/data/resume'
import { DrawButton } from '../components/drawButton/DrawButton'

export default function Resume() {
  return (
    <div className={styles['c-resume']}>
      <section className={styles['c-resume__hero']}>
        <h1>{resumeData.headline}</h1>
        <p>{resumeData.about}</p>
        <DrawButton href='/resume.pdf' variant='underline' fontSize={{ default: '0.85rem' }}>
          Download PDF
        </DrawButton>
      </section>

      <CurvedSection className={styles['c-resume__content']} scaleFrom={0} scaleTo={0}>
        <div className={styles['c-resume__content-experience']} data-header='Experience'>
          {resumeData.experience.map((exp, index) => (
            <div key={exp.company + exp.period} data-index={`0${index + 1}`} className={styles['c-resume__content-experience-item']}>
              <h3>{exp.title}</h3>
              <span>{exp.company} • {exp.location} • {exp.period}</span>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className={styles['c-resume__content-education']} data-header='Education'>
          {resumeData.education.map((edu) => (
            <div key={edu.institution + edu.period} className={styles['c-resume__content-education-item']}>
              <h3>{edu.title}</h3>
              <span>{edu.institution} • {edu.period}</span>
            </div>
          ))}
        </div>

        <div className={styles['c-resume__content-skills']} data-header='Skills'>
          <div className={styles['c-resume__content-skills-grid']}>
            {resumeData.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </CurvedSection>
    </div>
  )
}
