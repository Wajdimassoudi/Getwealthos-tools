import { createContext } from 'react'

type LanguageContextType = {
  language: 'ar' | 'en'
  setLanguage: (lang: 'ar' | 'en') => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
})

export default LanguageContext

export const translations = {
  en: {
    header: {
      title: 'GetWealth OS',
      subtitle: 'Free Tools Collection',
      description: 'All-in-one platform for downloading, converting, and creating',
    },
    tools: {
      tiktok: {
        title: 'TikTok Downloader',
        description: 'Download TikTok videos without watermark',
        placeholder: 'Paste TikTok URL...',
        button: 'Download',
      },
      logo: {
        title: 'Logo Maker',
        description: 'Create stunning logos with text effects',
        themeLabel: 'Choose Effect (Theme URL)',
        textLabel: 'Enter Text',
        button: 'Create Logo',
      },
      file: {
        title: 'File Downloader',
        description: 'Download files from Drive, Mediafire, and more',
        placeholder: 'Paste file URL...',
        button: 'Get Link',
      },
      shazam: {
        title: 'Shazam Music',
        description: 'Identify songs from audio files',
        placeholder: 'Paste MP3 URL...',
        button: 'Identify Song',
      },
      tempmail: {
        title: 'Temp Mail',
        description: 'Create temporary email addresses',
        button: 'Create Email',
        viewButton: 'View Emails',
      },
      aichat: {
        title: 'AI Chat',
        description: 'Chat with advanced AI assistant',
        placeholder: 'Ask me anything...',
        button: 'Send',
        clear: 'Clear Chat',
      },
    },
    common: {
      loading: 'Loading...',
      copy: 'Copy',
      copied: 'Copied!',
      error: 'Error occurred',
      try_again: 'Try Again',
      deploy: 'Deploy to Vercel',
      vip_tools: 'VIP Tools',
      get_premium: 'Get Premium',
      footer: 'Made with ❤️ for creators and developers',
      language: 'Language',
      dark_mode: 'Dark Mode',
      light_mode: 'Light Mode',
    },
  },
  ar: {
    header: {
      title: 'أدواتي - GetWealth OS',
      subtitle: 'مجموعة أدوات مجانية شاملة',
      description: 'منصة متكاملة لتحميل وتحويل وإنشاء المحتوى',
    },
    tools: {
      tiktok: {
        title: 'تحميل تيكتوك',
        description: 'حمّل فيديوهات تيكتوك بدون علامة مائية',
        placeholder: 'الصق رابط تيكتوك...',
        button: 'تحميل',
      },
      logo: {
        title: 'صانع الشعارات',
        description: 'أنشئ شعارات رائعة مع تأثيرات نصية',
        themeLabel: 'اختر التأثير (رابط الموضوع)',
        textLabel: 'أدخل النص',
        button: 'إنشاء',
      },
      file: {
        title: 'تحميل الملفات',
        description: 'حمّل الملفات من Drive وMediafire وغيرها',
        placeholder: 'الصق رابط الملف...',
        button: 'احصل على الرابط',
      },
      shazam: {
        title: 'موسيقى Shazam',
        description: 'اكتشف الأغاني من الملفات الصوتية',
        placeholder: 'الصق رابط MP3...',
        button: 'ابحث عن الأغنية',
      },
      tempmail: {
        title: 'بريد مؤقت',
        description: 'أنشئ عناوين بريد إلكترونية مؤقتة',
        button: 'إنشاء بريد',
        viewButton: 'عرض الرسائل',
      },
      aichat: {
        title: 'محادثة ذكية',
        description: 'تحدث مع مساعد ذكي متقدم',
        placeholder: 'اسأل أي سؤال...',
        button: 'إرسال',
        clear: 'مسح المحادثة',
      },
    },
    common: {
      loading: 'جاري التحميل...',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      error: 'حدث خطأ',
      try_again: 'حاول مجددا',
      deploy: 'انشر على Vercel',
      vip_tools: 'أدوات VIP',
      get_premium: 'احصل على النسخة المميزة',
      footer: 'صُنع بـ ❤️ للمبدعين والمطورين',
      language: 'اللغة',
      dark_mode: 'الوضع الليلي',
      light_mode: 'الوضع الفاتح',
    },
  },
}
