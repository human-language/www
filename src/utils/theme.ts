export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme'
export const DARK_CLASS = 'dark'

export function getThemePreference(): Theme {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  }
  
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light'
  }
  
  return 'light'
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement
  
  requestAnimationFrame(() => {
    if (theme === 'dark') {
      root.classList.add(DARK_CLASS)
    } else {
      root.classList.remove(DARK_CLASS)
    }
    
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#030713' : '#ffffff')
    }
  })
  
  localStorage.setItem(THEME_KEY, theme)
  
  window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }))
}

export function toggleTheme(): Theme {
  const current = document.documentElement.classList.contains(DARK_CLASS) 
    ? 'dark' 
    : 'light'
  const next = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}

export function initTheme(): void {
  const theme = getThemePreference()
  
  if (theme === 'dark') {
    document.documentElement.classList.add(DARK_CLASS)
  } else {
    document.documentElement.classList.remove(DARK_CLASS)
  }
  
  localStorage.setItem(THEME_KEY, theme)
  
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      })
    }
  }
}
