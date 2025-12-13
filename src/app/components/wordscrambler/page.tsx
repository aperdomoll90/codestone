'use client'
import { useState, useCallback } from 'react'

const WordScrambler: React.FC<{}> = () => {
  const words = ['CODEPEN', 'REACT', 'JAVASCRIPT'] // Array of words to display
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const [text, setText] = useState(words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [isScrambling, setIsScrambling] = useState(false)

  const scrambleText = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)

    const currentWord = words[wordIndex]
    const nextWord = words[(wordIndex + 1) % words.length]
    const maxLength = Math.max(currentWord.length, nextWord.length)
    let iterations = 0

    // Start with fully scrambled text
    setText(currentWord.replace(/./g, () => letters[Math.floor(Math.random() * 26)]))

    const intervalId = setInterval(() => {
      setText(
        prevText =>
          prevText
            .split('')
            .map((letter, index) => {
              if (index < iterations) {
                return nextWord[index] || ''
              }
              return letters[Math.floor(Math.random() * 26)]
            })
            .join('')
            .padEnd(maxLength, ' ') // Ensure consistent length
      )

      iterations += 1 / 3

      if (iterations >= maxLength) {
        clearInterval(intervalId)
        setText(nextWord)
        setIsScrambling(false)
        setWordIndex(prevIndex => (prevIndex + 1) % words.length)
      }
    }, 30)
  }, [wordIndex, words, letters, isScrambling])

  const handleMouseOver = useCallback(() => {
    if (!isScrambling) {
      scrambleText()
    }
  }, [scrambleText, isScrambling])

  return (
    <div id='counter-wrapper'>
      <h1 onMouseOver={handleMouseOver}>{text}</h1>
    </div>
  )
}
export default WordScrambler
