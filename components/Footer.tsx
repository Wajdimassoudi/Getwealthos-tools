'use client'

import { useContext } from 'react'
import LanguageContext, { translations } from '@/contexts/LanguageContext'
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  const { language } = useContext(LanguageContext)
  const t = translations[language]

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'GitHub', icon: Github, url: '#' },
  ]

  const footerLinks = {
    ar: {
      about: 'عن الموقع',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      contact: 'اتصل بنا',
    },
    en: {
      about: 'About',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact',
    },
  }

  const links = footerLinks[language]

  return (
    <footer className="bg-card border-t border-border">
      {/* Ad Space */}
      <div className="bg-muted/30 border-b border-border px-4 py-4 text-center text-xs text-muted-foreground">
        {language === 'ar' ? '🎯 مساحة إعلانية - Google AdSense' : '🎯 Ad Space - Google AdSense'}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-foreground">GetWealth OS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar'
                ? 'منصة أدوات مجانية متكاملة للمحترفين والمبدعين'
                : 'Complete free tools platform for professionals and creators'}
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'الموارد' : 'Resources'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">{links.about}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">{links.contact}</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'القانوني' : 'Legal'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">{links.privacy}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">{links.terms}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition"
                    title={link.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">6+</p>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'أدوات مجانية' : 'Free Tools'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">10K+</p>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'مستخدم يومي' : 'Daily Users'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">100%</p>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'مجاني وآمن' : 'Free & Safe'}
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} GetWealth OS. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'ar'
                ? '❤️ صُنع بحب للمبدعين والمطورين'
                : '❤️ Made with love for creators and developers'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
