'use client'
import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

interface LoadingContextType {
  startLoading: () => void
  stopLoading: () => void
  isLoading: boolean
  loadingStartTime: number | null
}

const LoadingContext = createContext<LoadingContextType | null>(null)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const loadingStartTimeRef = useRef<number | null>(null)

  const startLoading = useCallback(() => {
    loadingStartTimeRef.current = Date.now()
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    loadingStartTimeRef.current = null
    setIsLoading(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading, loadingStartTime: loadingStartTimeRef.current }}>
      {children}
    </LoadingContext.Provider>
  )
}