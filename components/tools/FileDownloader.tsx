'use client'

import { useState, useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { getFileDownloadLink, copyToClipboard } from '@/lib/api-utils'
import { Copy, Download, AlertCircle } from 'lucide-react'

export default function FileDownloader() {
  const { language } = useContext(LanguageContext)
  const t = language === 'ar' ? require('@/contexts/LanguageContext').translations.ar : require('@/contexts/LanguageContext').translations.en
  
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleGetLink = async () => {
    if (!url.trim()) {
      setError(language === 'ar' ? 'يرجى إدخال رابط صحيح' : 'Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await getFileDownloadLink(url)
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
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t.tools.file.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t.tools.file.description}</p>

      <div className="space-y-3">
        {/* Input */}
        <input
          type="text"
          placeholder={t.tools.file.placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGetLink()}
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

        {/* Get Link Button */}
        <Button
          onClick={handleGetLink}
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
              {t.tools.file.button}
            </>
          )}
        </Button>

        {/* Result */}
        {result && result.download_link && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
            <p className="text-xs text-muted-foreground mb-2">Direct Link:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-background p-2 rounded break-all">
                {result.download_link}
              </code>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(result.download_link)}
                title={t.common.copy}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {result.filename && (
              <p className="text-xs text-muted-foreground mt-2">
                {language === 'ar' ? 'الملف:' : 'File:'} {result.filename}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
