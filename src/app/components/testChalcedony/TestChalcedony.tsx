'use client'
import React, { useState } from 'react'
import styles from './TestChalcedony.module.scss'

// =============================================================================
// TEST COMPONENT FOR CHALCEDONY AGENT
// This file contains INTENTIONAL violations of repo conventions.
// Chalcedony should flag these issues during PR review.
// =============================================================================

interface TestChalcedonyProps {
  title: string
  isActive?: boolean
}

// VIOLATION: Hook not named with "use" prefix, exported as default would be wrong
// (This one is correct - just showing the pattern)
const useTestHook = () => {
  return { value: 'test' }
}

export const TestChalcedony: React.FC<TestChalcedonyProps> = ({ title, isActive = false }) => {
  const [open, setOpen] = useState(false)

  // VIOLATION 1: CSS Modules accessed with dot notation instead of bracket notation
  // Should be: styles['c-test-chalcedony']
  const containerClass = styles.testContainer

  // VIOLATION 2: Missing BEM prefix (should be c-test-chalcedony, not test-container)
  // The class name doesn't follow c-component__element pattern

  // VIOLATION 3: Using class toggling for state instead of data-* attributes
  // Should use data-open={open} instead of conditional class
  const stateClass = open ? styles.isOpen : styles.isClosed

  return (
    // VIOLATION 4: data-custom is not in allowed_prefixes list
    // Allowed: data-state, data-variant, data-open, data-anchor, data-active, data-visible
    <div
      className={`${containerClass} ${stateClass}`}
      data-custom="bad-prefix"
      data-title={title}
    >
      {/* VIOLATION 5: More dot notation instead of bracket notation */}
      <h2 className={styles.heading}>{title}</h2>

      {/* VIOLATION 6: Class name doesn't follow BEM (should be c-test-chalcedony__button) */}
      <button
        className={styles.btn}
        onClick={() => setOpen(!open)}
      >
        Toggle
      </button>

      {/* VIOLATION 7: Using isActive class toggle instead of data-active attribute */}
      <div className={`${styles.content} ${isActive ? styles.active : ''}`}>
        <p>This content should use data-active instead of class toggling.</p>
      </div>

      {/* CORRECT PATTERN (for comparison) */}
      <div
        className={styles['c-test-chalcedony__footer']}
        data-visible={open}
      >
        This follows the correct pattern
      </div>
    </div>
  )
}

// VIOLATION 8: Default export of component (not a hook issue, but worth noting pattern)
// For hooks: export default useMyHook would be wrong
export default TestChalcedony
