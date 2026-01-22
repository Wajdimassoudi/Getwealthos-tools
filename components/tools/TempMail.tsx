'use client'

import { useState, useContext, useEffect } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { getTempMailDomains, getTempMailEmails, copyToClipboard } from '@/lib/api-utils'
import { Copy, Mail, AlertCircle, RefreshCw } from 'lucide-react'

export default function TempMail() {
  const { language } = useContext(LanguageContext)
  const t = language === 'ar' ? require('@/contexts/LanguageContext').translations.ar : require('@/contexts/LanguageContext').translations.en
  
  const [domains, setDomains] = useState<string[]>([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [username, setUsername] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [emails, setEmails] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [domainsLoading, setDomainsLoading] = useState(false)
  const [error, setError] = useState('')

  // Load domains on mount
  useEffect(() => {
    loadDomains()
  }, [])

  const loadDomains = async () => {
    setDomainsLoading(true)
    try {
      const data = await getTempMailDomains()
      if (Array.isArray(data)) {
        setDomains(data)
        if (data.length > 0) setSelectedDomain(data[0])
      }
    } catch (err) {
      setError(language === 'ar' ? 'فشل تحميل النطاقات' : 'Failed to load domains')
    } finally {
      setDomainsLoading(false)
    }
  }

  const handleCreateEmail = () => {
    if (!username.trim() || !selectedDomain) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    const email = `${username}@${selectedDomain}`
    setGeneratedEmail(email)
    setError('')
    setEmails([])
  }

  const handleViewEmails = async () => {
    if (!generatedEmail) {
      setError(language === 'ar' ? 'يرجى إنشاء بريد أولاً' : 'Please create email first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await getTempMailEmails(generatedEmail)
      setEmails(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError(err.message || (language === 'ar' ? 'حدث خطأ' : 'Error occurred'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{t.tools.tempmail.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t.tools.tempmail.description}</p>

      <div className="space-y-3">
        {/* Domain Selection */}
        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">
            {language === 'ar' ? 'اختر النطاق' : 'Select Domain'}
          </label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            disabled={domainsLoading || domains.length === 0}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                @{domain}
              </option>
            ))}
          </select>
        </div>

        {/* Username Input */}
        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">
            {language === 'ar' ? 'اسم المستخدم' : 'Username'}
          </label>
          <input
            type="text"
            placeholder="john123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm"
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
          onClick={handleCreateEmail}
          disabled={!username.trim() || !selectedDomain}
          className="w-full gap-2"
          variant="default"
        >
          <Mail className="w-4 h-4" />
          {t.tools.tempmail.button}
        </Button>

        {/* Generated Email */}
        {generatedEmail && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
            <p className="text-xs text-muted-foreground mb-2">Email:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-background p-2 rounded break-all font-mono">
                {generatedEmail}
              </code>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(generatedEmail)}
                title={t.common.copy}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* View Emails Button */}
        {generatedEmail && (
          <Button
            onClick={handleViewEmails}
            disabled={loading}
            variant="outline"
            className="w-full gap-2 bg-transparent"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                {t.common.loading}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                {t.tools.tempmail.viewButton}
              </>
            )}
          </Button>
        )}

        {/* Emails List */}
        {emails.length > 0 && (
          <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
            <p className="text-xs font-medium text-foreground mb-2">
              {language === 'ar' ? 'الرسائل' : 'Messages'} ({emails.length})
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {emails.map((email, i) => (
                <div key={i} className="text-xs p-2 bg-background rounded border border-border">
                  <p className="font-medium text-foreground truncate">{email.from || email.sender}</p>
                  <p className="text-muted-foreground truncate">{email.subject}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
