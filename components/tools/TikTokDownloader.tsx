'use client'

import { useState, useContext } from 'react'
import LanguageContext, { translations } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { fetchTikTok, copyToClipboard } from '@/lib/api-utils'
import { Copy, Download, AlertCircle } from 'lucide-react'

export default function TikTokDownloader() {
  const { language } = useContext(LanguageContext)
  const t = translations[language]
  
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال رابط صحيح' : 'Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await fetchTikTok(url)
      setResult(data)
    } catch (err: any) {
      setError(err.message || (language === 'ar' ? 'حدث خطأ' : 'Error occurred'))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t.tools.tiktok.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t.tools.tiktok.description}</p>

      <div className="space-y-3">
        {/* Input */}
        <input
          type="text"
          placeholder={t.tools.tiktok.placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
          disabled={loading}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-2 rounded">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Download Button */}
        <Button
          onClick={handleDownload}
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
              <Download className="w-4 h-4" />
              {t.tools.tiktok.button}
            </>
          )}
        </Button>

        {/* Result */}
        {result && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
            {result.video && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Video Link:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-background p-2 rounded break-all">
                    {result.video}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleCopy(result.video)}
                    title={t.common.copy}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {result.audio && (
                  <>
                    <p className="text-xs text-muted-foreground mt-2">Audio Link:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-background p-2 rounded break-all">
                        {result.audio}
                      </code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopy(result.audio)}
                        title={t.common.copy}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
