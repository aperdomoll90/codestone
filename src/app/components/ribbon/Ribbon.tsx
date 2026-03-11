import React from 'react'
import styles from './Ribbon.module.scss'

type RibbonProps = React.SVGProps<SVGSVGElement>
const XPosition = '45'

const RotatingGlobe = () => {
  return (
    <div className={`${styles['c-globe']}`}>
      <div className={`${styles['c-globe__long']}`}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span key={`globe-line-${index}`} style={{ '--i': index } as React.CSSProperties} />
          ))}
      </div>
      <div className={`${styles['c-globe__lat']}`} />
    </div>
  )
}

const Ribbon: React.FC<RibbonProps> = ({ className }) => {
  return (
    <div aria-hidden='true' className={`${styles['c-ribbon']} ${className}`}>
      <RotatingGlobe />
      <svg viewBox='0 0 263 104' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M211.56 0.00195312C220.127 0.510954 232.904 3.70805 243.465 11.6768C254.072 19.6801 262.407 32.4756 262 52.0205C261.593 71.5449 253.099 84.323 242.619 92.3203C232.179 100.287 219.804 103.488 211.562 103.998L211.531 104H-38V0H211.529L211.56 0.00195312ZM209 17C189.67 17 174 32.67 174 52C174 71.33 189.67 87 209 87C228.33 87 244 71.33 244 52C244 32.67 228.33 17 209 17Z'
          fill='#1C1D20'
        />
        <text x={XPosition} y='35' fill='white' fontSize='16' fontFamily='Albert Sans, sans-serif' fontWeight='200'>
          Located
          <tspan x={XPosition} dy='20'>
            in
          </tspan>
          <tspan x={XPosition} dy='20'>
            Florida, USA
          </tspan>
        </text>
      </svg>
    </div>
  )
}

export { Ribbon }
