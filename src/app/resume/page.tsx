'use client'
import styles from './Resume.module.scss'
import { CurvedSection } from '@/app/components/curvedSection/CurvedSection'
import { resumeData } from '@/app/data/resume'
import { DrawButton } from 'css-forge'

const Logo = () => (
  <svg className={styles['c-resume__hero-logo']} viewBox="0 0 435 436" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M99.5008 248L119.001 216H316.501C330.001 211.5 344.501 202 344.501 181C344.501 160 330.001 145.5 308.001 145.5H237.501V196.5L204.001 148.5V112.5H316.501C339.501 112.5 378.501 135 378.501 181C378.501 227 336.501 248 316.501 248H99.5008Z" fill="currentColor"/>
    <path d="M269.001 259.5H229.001L271.501 323H312.001L269.001 259.5Z" fill="currentColor"/>
    <path d="M248.501 404V433C310.43 425 430.361 361 434.43 223.5C438.5 86 326.438 -8.67424e-05 220.001 0C109.438 9.01057e-05 0 80.9998 0 223.5C0 336.5 104.438 444 237.501 435V292.5L215 259.5H203C203 313.5 204.929 406.055 203.93 406C167.93 404 146.5 393.841 113 374.5C86.2 359.027 60.5 322.72 51 306.5L149 147L190 205.5H230.5L167 112.5H130.5C107.548 149.5 36.3788 266.823 35.9303 267.5C35.4819 268.177 32.2658 260.5 28.9303 232.5C26.6074 213 27.9303 176.5 43.5008 145.5C49.2019 134.15 91.4418 26.7848 220.001 28.5C332.43 30 406.001 126.47 406.001 223.5C406.001 315 322.938 396 248.501 404Z" fill="currentColor"/>
  </svg>
)

export default function Resume() {
  return (
    <div className={styles['c-resume']}>
      <section className={styles['c-resume__hero']}>
        <Logo />
        <h1>{resumeData.headline}</h1>
        <p>{resumeData.about}</p>
        <DrawButton href='/resume.pdf' variant='underline' fontSize={{ default: '0.85rem' }} download='Adrian_Perdomo_Resume.pdf'>
          Download PDF
        </DrawButton>
        <div className={styles['c-resume__hero-scroll']}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      <CurvedSection className={styles['c-resume__content']} scaleFrom={0} scaleTo={0}>
        <div className={styles['c-resume__content-experience']} data-header='Experience'>
          {resumeData.experience.map((exp, index) => (
            exp.isSpacer ? (
              <div key={exp.period} className={styles['c-resume__content-experience-spacer']}>
                <span>{exp.title} • {exp.period}</span>
              </div>
            ) : (
              <div key={exp.company + exp.period} data-index={`0${index + 1}`} className={styles['c-resume__content-experience-item']}>
                <h3>{exp.title}</h3>
                <span>{exp.company} • {exp.location} • {exp.period}</span>
                <p>{exp.description}</p>
              </div>
            )
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
