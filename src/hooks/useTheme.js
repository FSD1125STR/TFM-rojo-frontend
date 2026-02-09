import { useState, useEffect } from 'react'

const STORAGE_PREFIX = 'ui.theme'

function getSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function getStoredTheme(userId) {
  if (!userId) return null
  return localStorage.getItem(`${STORAGE_PREFIX}.${userId}`)
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function useTheme(userId = null) {
  const [theme, setThemeState] = useState(() => {
    const stored = getStoredTheme(userId)
    return stored || getSystemTheme()
  })

  useEffect(() => {
    const stored = getStoredTheme(userId)
    const next = stored || getSystemTheme()
    setThemeState(next)
    applyTheme(next)
  }, [userId])

  useEffect(() => {
    applyTheme(theme)
    if (userId) {
      localStorage.setItem(`${STORAGE_PREFIX}.${userId}`, theme)
    }
  }, [theme, userId])

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme) => {
    setThemeState(newTheme)
  }

  return { theme, toggleTheme, setTheme }
}
