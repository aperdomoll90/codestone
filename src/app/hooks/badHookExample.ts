// =============================================================================
// TEST HOOK FOR CHALCEDONY AGENT
// This file contains INTENTIONAL violations of hooks naming convention.
// =============================================================================

import { useState, useEffect } from 'react'

// VIOLATION 1: Hook function not named with "use" prefix
// Should be: useDataFetcher
export function dataFetcher(url: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading }
}

// VIOLATION 2: Default export of a hook
// Custom hooks should be named exports, not default
const useCounter = (initial: number = 0) => {
  const [count, setCount] = useState(initial)
  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => prev - 1),
  }
}

// This violates the policy: "must not be exported as default"
export default useCounter

// CORRECT PATTERN (for comparison)
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)
  return {
    value,
    toggle: () => setValue(prev => !prev),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
  }
}
