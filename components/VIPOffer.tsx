'use client'

import { useState, useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function VIPOffer() {
  const { language } = useContext(LanguageContext)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email.includes('@')) {
      // Save to localStorage for now (in production, send to backend)
      const vipEmails = JSON.parse(localStorage.getItem('vipEmails') || '[]')
      vipEmails.push({ email, timestamp: new Date().toISOString() })
      localStorage.setItem('vipEmails', JSON.stringify(vipEmails))
      setSubmitted(true)
      setTimeout(() => {
        setShowModal(false)
        setEmail('')
        setSubmitted(false)
      }, 2000)
    }
  }

  return (
    <>
      {/* VIP Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-primary-foreground mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {language === 'ar' ? '🌟 أدوات VIP المتميزة' : '🌟 VIP Premium Tools'}
            </h2>
            <p className="text-sm opacity-90">
              {language === 'ar'
                ? 'احصل على حق الوصول المبكر لأدوات جديدة وميزات حصرية'
                : 'Get early access to new tools and exclusive features'}
            </p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            variant="default"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2"
          >
            {language === 'ar' ? '🚀 اشترك الآن' : '🚀 Subscribe Now'}
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card rounded-xl max-w-md w-full p-8 border border-border shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {language === 'ar' ? 'اشترك في VIP' : 'Join VIP'}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {language === 'ar'
                    ? 'احصل على تنبيهات عند إضافة أدوات جديدة وميزات حصرية'
                    : 'Get notified about new tools and exclusive features'}
                </p>

                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <Button
                    onClick={handleSubmit}
                    disabled={!email.includes('@')}
                    className="w-full"
                    variant="default"
                  >
                    {language === 'ar' ? 'اشترك' : 'Subscribe'}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {language === 'ar'
                      ? 'سنرسل لك تحديثات بشأن الأدوات الجديدة'
                      : 'We will send you updates about new tools'}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === 'ar' ? 'تم بنجاح!' : 'Success!'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar'
                    ? 'شكراً لاشتراكك في VIP'
                    : 'Thank you for subscribing to VIP'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
