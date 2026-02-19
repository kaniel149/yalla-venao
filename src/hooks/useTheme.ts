import { useEffect, useState } from 'react'

export function useTheme() {
  const getTheme = () => {
    const h = new Date().getHours()
    return h >= 7 && h < 19 ? 'day' : 'night'
  }

  const [theme, setTheme] = useState<'day' | 'night'>(getTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const interval = setInterval(() => {
      const t = getTheme()
      if (t !== theme) {
        setTheme(t as 'day' | 'night')
        document.documentElement.setAttribute('data-theme', t)
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [theme])

  return theme
}
