import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Theme types
export type CategoryTheme = 'popular' | 'top-rated' | 'upcoming' | 'default'

interface ThemeContextType {
  currentTheme: CategoryTheme
  setTheme: (theme: CategoryTheme) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<CategoryTheme>('default')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('movie-app-theme') as CategoryTheme
    const savedDarkMode = localStorage.getItem('movie-app-dark-mode') === 'true'
    
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
    setIsDarkMode(savedDarkMode)
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    document.documentElement.setAttribute('data-dark-mode', isDarkMode.toString())
  }, [currentTheme, isDarkMode])

  const setTheme = (theme: CategoryTheme) => {
    setCurrentTheme(theme)
    localStorage.setItem('movie-app-theme', theme)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('movie-app-dark-mode', newDarkMode.toString())
  }

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    isDarkMode,
    toggleDarkMode
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}