import React from 'react'

interface HexagonProps {
  className?: string
}

export const Hexagon: React.FC<HexagonProps> = ({ className = '' }) => {
  // Calculate the viewBox based on the polygon points
  const minX = -60
  const minY = -52
  const maxX = 60
  const maxY = 52
  const viewBoxWidth = maxX - minX
  const viewBoxHeight = maxY - minY

  return (
    <div className={className}>
      <svg width='100%' height='100%' viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio='xMidYMid meet'>
        <polygon points='-1,0 -60,-1 -31,-51' fill='white' stroke='none'></polygon>
        <polygon points='0,-1 -30,-52 30,-52' fill='white' stroke='none'></polygon>
        <polygon points='1,0 31.5,-51 60,-0.5' fill='white' stroke='none'></polygon>
        <polygon points='1,1 60,1 31,51' fill='white' stroke='none'></polygon>
        <polygon points='0,2 30,52 -30,52' fill='white' stroke='none'></polygon>
        <polygon points='-1,1 -32,52 -60,1' fill='white' stroke='none'></polygon>
      </svg>
    </div>
  )
}

interface AnimatedHexagonProps {
  position: number
  color: string
}
const duration = '2s'
const color = 'lightblue'
const animateSlice = ({ position, color }: AnimatedHexagonProps) => {
  let baseArray = Array(6).fill('white')
  baseArray[position] = color
  return baseArray.concat(baseArray[0]).join(';')
}

export const AnimateHexagon = (
  <svg width='600' height='600' viewBox='-100 -100 200 200' xmlns='http://www.w3.org/2000/svg'>
    <polygon points='-1,0 -60,-1 -31,-51' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({ position: 1, color: color })} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='0,-1 -30,-52 30,-52' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({ position: 2, color: color })} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='1,0 31.5,-51 60,-0.5' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({ position: 3, color: color })} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='1,1 60,1 31,51' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({ position: 4, color: color })} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='0,2 30,52 -30,52' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({ position: 5, color: color })} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='-1,1 -32,52 -60,1' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({ position: 0, color: color })} dur={duration} repeatCount='indefinite' />
    </polygon>
  </svg>
)
