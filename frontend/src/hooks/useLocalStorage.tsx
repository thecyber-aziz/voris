import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key) // ✅ remove instead of storing "null"
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue] as const
}