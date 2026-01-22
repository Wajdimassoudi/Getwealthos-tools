'use client'

import { useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import TikTokDownloader from '@/components/tools/TikTokDownloader'
import LogoMaker from '@/components/tools/LogoMaker'
import FileDownloader from '@/components/tools/FileDownloader'
import ShazamMusic from '@/components/tools/ShazamMusic'
import TempMail from '@/components/tools/TempMail'
import AIChat from '@/components/tools/AIChat'
import VIPOffer from '@/components/VIPOffer'

export default function ToolsGrid() {
  const { language } = useContext(LanguageContext)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* VIP Banner */}
      <VIPOffer />

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <TikTokDownloader />
        <LogoMaker />
        <FileDownloader />
        <ShazamMusic />
        <TempMail />
        <AIChat />
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            {language === 'ar' ? 'سريع وفعال' : 'Fast & Reliable'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'جميع الأدوات تعمل بسرعة عالية مع استقرار كامل' 
              : 'All tools work with high speed and complete stability'}
          </p>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            {language === 'ar' ? 'آمن 100%' : '100% Secure'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'ar'
              ? 'بياناتك آمنة تماماً ولا يتم حفظها على الخادم'
              : 'Your data is completely safe and not stored on servers'}
          </p>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🎁</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            {language === 'ar' ? '100% مجاني' : '100% Free'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'ar'
              ? 'جميع الأدوات مجانية بدون أي رسوم إضافية'
              : 'All tools are completely free with no hidden charges'}
          </p>
        </div>
      </div>

      {/* Ad Space */}
      <div className="mt-12 p-8 bg-muted/30 border border-border rounded-xl text-center">
        <p className="text-xs text-muted-foreground">
          {language === 'ar' ? '🎯 مساحة إعلانية - Google AdSense' : '🎯 Ad Space - Google AdSense'}
        </p>
      </div>
    </div>
  )
}
