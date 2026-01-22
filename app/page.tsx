'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToolsGrid from '@/components/ToolsGrid'
import LandingPage from '@/components/LandingPage'
import LanguageContext from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function Home() {
  const [language, setLanguage] = useState<'ar' | 'en'>('en')
  const [mounted, setMounted] = useState(false)
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    // Detect language from browser or localStorage
    const saved = localStorage.getItem('language')
    if (saved) {
      setLanguage(saved as 'ar' | 'en')
    } else {
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en'
      setLanguage(browserLang)
    }
    
    // Check if user has seen landing page
    const hasSeenLanding = localStorage.getItem('hasSeenLanding')
    if (hasSeenLanding) {
      setShowLanding(false)
    }
    
    setMounted(true)
  }, [])

  const handleEnter = () => {
    localStorage.setItem('hasSeenLanding', 'true')
    setShowLanding(false)
  }

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  if (!mounted) return null

  return (
    <ThemeProvider>
      <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
        <div className={language === 'ar' ? 'rtl' : 'ltr'}>
          {showLanding && <LandingPage onEnter={handleEnter} />}
          {!showLanding && (
            <>
              <Header />
              <main className="min-h-screen bg-background text-foreground">
                <ToolsGrid />
              </main>
              <Footer />
            </>
          )}
        </div>
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}
