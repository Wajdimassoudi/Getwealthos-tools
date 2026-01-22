'use client'

import { useContext } from 'react'
import LanguageContext, { translations } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Globe } from 'lucide-react'

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const t = translations[language]

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t.header.title}</h1>
              <p className="text-xs text-muted-foreground">{t.header.subtitle}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Deploy Button */}
            <Button
              variant="default"
              size="sm"
              className="hidden sm:inline-flex gap-2"
              onClick={() => window.open('https://vercel.com/new', '_blank')}
            >
              🚀 {language === 'ar' ? 'انشر' : 'Deploy'}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={isDark ? t.common.light_mode : t.common.dark_mode}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant={language === 'ar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'En' : 'العربية'}
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-3">{t.header.description}</p>
      </div>

      {/* Google AdSense Placeholder */}
      <div className="bg-muted/30 border-t border-border px-4 py-2 text-center text-xs text-muted-foreground">
        {language === 'ar' ? '🎯 إعلان - مساحة إعلانية' : '🎯 Ad Space - Google AdSense'}
      </div>
    </header>
  )
}
