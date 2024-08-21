import React from 'react'

interface HexagonProps { 
  position: number
  color: string
}
const duration = '2s'
const color = 'lightblue'
const animateSlice = ({position,color}:HexagonProps) => {
  let baseArray = Array(6).fill('white')
  baseArray[position] = color
  return baseArray.concat(baseArray[0]).join(';');
}
const hexagon = (
  <svg width='600' height='600' viewBox='-100 -100 200 200' xmlns='http://www.w3.org/2000/svg'>
    <polygon points='-1,0 -60,-1 -31,-51' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({position:1,color:color})} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='0,-1 -30,-52 30,-52' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({position:2,color:color})} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='1,0 31.5,-51 60,-0.5' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({position:3,color:color})} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='1,1 60,1 31,51' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({position:4,color:color})} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='0,2 30,52 -30,52' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({position:5,color:color})} dur={duration} repeatCount='indefinite' />
    </polygon>
    <polygon points='-1,1 -32,52 -60,1' fill='white' stroke='none'>
      <animate attributeName='fill' values={animateSlice({position:0,color:color})} dur={duration} repeatCount='indefinite' />
    </polygon>
  </svg>
)
export default function About() {
  return <div id='about-section'>{hexagon}</div>
}
