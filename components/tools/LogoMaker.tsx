'use client'

import { useState, useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { createLogo, copyToClipboard } from '@/lib/api-utils'
import { Copy, Wand2, AlertCircle } from 'lucide-react'

export default function LogoMaker() {
  const { language } = useContext(LanguageContext)
  const t = language === 'ar' ? require('@/contexts/LanguageContext').translations.ar : require('@/contexts/LanguageContext').translations.en
  
  const [theme, setTheme] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const exampleThemes = [
    'https://textpro.me/create-a-3d-gold-text-effect-online-1046.html',
    'https://textpro.me/neon-glow-text-effect-online-1021.html',
    'https://textpro.me/3d-stone-text-effect-1016.html',
  ]

  const handleCreate = async () => {
    if (!theme.trim() || !text.trim()) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await createLogo(theme, text)
      setResult(data)
    } catch (err: any) {
      setError(err.message || (language === 'ar' ? 'حدث خطأ' : 'Error occurred'))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (url: string) => {
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t.tools.logo.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t.tools.logo.description}</p>

      <div className="space-y-3">
        {/* Theme Input */}
        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">
            {t.tools.logo.themeLabel}
          </label>
          <input
            type="text"
            placeholder="https://textpro.me/..."
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <div className="mt-2 flex flex-wrap gap-1">
            {exampleThemes.map((url, i) => (
              <button
                key={i}
                onClick={() => setTheme(url)}
                className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded text-muted-foreground"
              >
                {language === 'ar' ? `تأثير ${i + 1}` : `Theme ${i + 1}`}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">
            {t.tools.logo.textLabel}
          </label>
          <input
            type="text"
            placeholder={t.tools.logo.textLabel}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-2 rounded">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          disabled={loading || !theme.trim() || !text.trim()}
          className="w-full gap-2"
          variant="default"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              {t.common.loading}
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              {t.tools.logo.button}
            </>
          )}
        </Button>

        {/* Result */}
        {result && result.image && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
            <p className="text-xs text-muted-foreground mb-2">Generated Logo:</p>
            <img
              src={result.image || "/placeholder.svg"}
              alt="Generated Logo"
              className="w-full h-32 object-contain bg-background rounded mb-2"
            />
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-background p-2 rounded break-all">
                {result.image}
              </code>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(result.image)}
                title={t.common.copy}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
