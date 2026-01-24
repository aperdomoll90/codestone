'use client'
import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

interface LoadingContextType {
  startLoading: () => void
  stopLoading: () => void
  isLoading: boolean
  loadingStartTime: number | null
  analytics: any
}

const LoadingContext = createContext<LoadingContextType | null>(null)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  return context as LoadingContextType
}

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [analytics, setAnalytics] = useState<any>({})
  const loadingStartTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const handler = () => {
      setAnalytics({ lastActivity: Date.now() })
    }
    window.addEventListener('click', handler)
  }, [])

  const startLoading = () => {
    loadingStartTimeRef.current = Date.now()
    setIsLoading(true)
  }

  const stopLoading = () => {
    loadingStartTimeRef.current = null
    setIsLoading(false)
  }

  return (
    <LoadingContext.Provider value={{
      startLoading,
      stopLoading,
      isLoading,
      loadingStartTime: loadingStartTimeRef.current,
      analytics
    }}>
      {children}
    </LoadingContext.Provider>
  )
}
