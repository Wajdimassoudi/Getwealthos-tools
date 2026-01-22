'use client'

import { useState, useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { identifyMusic, copyToClipboard } from '@/lib/api-utils'
import { Copy, Music, AlertCircle } from 'lucide-react'

export default function ShazamMusic() {
  const { language } = useContext(LanguageContext)
  const t = language === 'ar' ? require('@/contexts/LanguageContext').translations.ar : require('@/contexts/LanguageContext').translations.en
  
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleIdentify = async () => {
    if (!url.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال رابط صحيح' : 'Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await identifyMusic(url)
      setResult(data)
    } catch (err: any) {
      setError(err.message || (language === 'ar' ? 'حدث خطأ' : 'Error occurred'))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    await copyToClipboard(text)
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t.tools.shazam.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t.tools.shazam.description}</p>

      <div className="space-y-3">
        {/* Input */}
        <input
          type="text"
          placeholder={t.tools.shazam.placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleIdentify()}
          disabled={loading}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm"
        />

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-2 rounded">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Identify Button */}
        <Button
          onClick={handleIdentify}
          disabled={loading || !url.trim()}
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
              <Music className="w-4 h-4" />
              {t.tools.shazam.button}
            </>
          )}
        </Button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30 space-y-2">
            {result.title && (
              <div>
                <p className="text-xs text-muted-foreground">Title:</p>
                <p className="text-sm font-medium text-foreground">{result.title}</p>
              </div>
            )}
            {result.artist && (
              <div>
                <p className="text-xs text-muted-foreground">Artist:</p>
                <p className="text-sm font-medium text-foreground">{result.artist}</p>
              </div>
            )}
            {result.album && (
              <div>
                <p className="text-xs text-muted-foreground">Album:</p>
                <p className="text-sm font-medium text-foreground">{result.album}</p>
              </div>
            )}
            {result.link && (
              <div>
                <p className="text-xs text-muted-foreground">Link:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-background p-2 rounded break-all">
                    {result.link}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleCopy(result.link)}
                    title={t.common.copy}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
