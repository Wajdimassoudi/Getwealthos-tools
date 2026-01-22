# Development Guide - GetWealth OS

For developers working on GetWealth OS codebase.

## Project Architecture

### Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State**: React Context (Language, Theme)
- **APIs**: Custom fetch utilities with error handling
- **Deployment**: Vercel
- **PWA**: Service Worker ready

### Directory Structure

```
getwealthos/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page with providers
│   └── globals.css        # Global styles + theme tokens
│
├── components/            # React components
│   ├── ui/               # shadcn/ui components (auto-generated)
│   ├── Header.tsx        # Navigation & controls
│   ├── Footer.tsx        # Footer with links
│   ├── ToolsGrid.tsx     # Main tools container
│   ├── VIPOffer.tsx      # VIP modal
│   └── tools/            # Individual tools
│       ├── TikTokDownloader.tsx
│       ├── LogoMaker.tsx
│       ├── FileDownloader.tsx
│       ├── ShazamMusic.tsx
│       ├── TempMail.tsx
│       └── AIChat.tsx
│
├── contexts/             # React contexts
│   ├── LanguageContext.tsx    # Language + translations
│   └── ThemeContext.tsx       # Dark/Light mode
│
├── lib/                  # Utility functions
│   ├── api-utils.ts      # All API integration
│   ├── analytics.ts      # Analytics tracking
│   └── utils.ts          # General utilities (from shadcn)
│
├── hooks/                # React hooks
│   └── use-mobile.tsx    # Mobile detection hook
│
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   ├── robots.txt        # SEO robots file
│   ├── sitemap.xml       # XML sitemap
│   └── icons/           # Favicon and icons
│
├── config files
│   ├── next.config.mjs   # Next.js config
│   ├── tsconfig.json     # TypeScript config
│   ├── tailwind.config.js # Tailwind config
│   ├── package.json      # Dependencies
│   └── vercel.json       # Vercel config
│
└── docs
    ├── README.md         # Main documentation
    ├── DEPLOYMENT.md     # Deployment guide
    ├── QUICKSTART.md     # Quick start
    └── DEVELOPMENT.md    # This file
```

## Code Style & Conventions

### TypeScript

Always use TypeScript for type safety:

```typescript
// Good ✅
interface Props {
  language: 'ar' | 'en'
  onClick: (lang: 'ar' | 'en') => void
}

function MyComponent({ language, onClick }: Props) {
  // ...
}

// Avoid ❌
function MyComponent(props) {
  // ...
}
```

### Component Structure

```typescript
'use client'  // Mark client components

import { useState, useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'

interface Props {
  title: string
}

export default function MyTool({ title }: Props) {
  const { language } = useContext(LanguageContext)
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="space-y-4">
      <h2>{title}</h2>
      {/* Component JSX */}
    </div>
  )
}
```

### Naming Conventions

```typescript
// Components: PascalCase
export default function MyComponent() {}

// Functions: camelCase
export async function fetchData() {}

// Constants: UPPER_SNAKE_CASE
const API_KEY = 'xxx'
const MAX_RETRIES = 3

// Types/Interfaces: PascalCase
interface Props {}
type Status = 'loading' | 'success' | 'error'
```

### Logging

Always use `[v0]` prefix for debugging:

```typescript
console.log('[v0] Component rendered:', props)
console.error('[v0] API error:', error)
console.warn('[v0] Missing dependency')
```

This helps identify v0-generated code in production logs.

## Working with APIs

### Adding a New API

1. **Create API function** in `/lib/api-utils.ts`:

```typescript
export async function myNewAPI(params: string) {
  try {
    const response = await fetch('https://api.example.com/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ param: params }),
    })
    
    const data = await response.json()
    console.log('[v0] API response:', data)
    
    // Always monetize links
    if (data.link) {
      const shortLink = await shortenWithShrinkMe(data.link)
      return { ...data, link: shortLink }
    }
    
    return data
  } catch (error) {
    console.error('[v0] API error:', error)
    throw error
  }
}
```

2. **Create Tool component** in `/components/tools/MyTool.tsx`:

```typescript
'use client'

import { useState, useContext } from 'react'
import LanguageContext from '@/contexts/LanguageContext'
import { myNewAPI } from '@/lib/api-utils'

export default function MyTool() {
  const { language } = useContext(LanguageContext)
  const t = language === 'ar' ? translations.ar : translations.en
  
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  
  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      const data = await myNewAPI(input)
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Error occurred')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      {/* Tool UI */}
    </div>
  )
}
```

3. **Add translations** in `/contexts/LanguageContext.tsx`:

```typescript
export const translations = {
  en: {
    tools: {
      myTool: {
        title: 'My New Tool',
        description: 'Tool description',
        placeholder: 'Enter input...',
        button: 'Submit',
      }
    }
  },
  ar: {
    tools: {
      myTool: {
        title: 'أداتي الجديدة',
        description: 'وصف الأداة',
        placeholder: 'أدخل...',
        button: 'أرسل',
      }
    }
  }
}
```

4. **Import in ToolsGrid.tsx**:

```typescript
import MyTool from '@/components/tools/MyTool'

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MyTool />
      {/* Other tools */}
    </div>
  )
}
```

## Working with Themes

### Edit Colors

Colors are defined in `/app/globals.css` using CSS variables:

```css
:root {
  /* Primary color (purple) */
  --primary: oklch(0.55 0.2 280);
  --primary-foreground: oklch(0.98 0 0);
  
  /* Accent color (amber) */
  --accent: oklch(0.6 0.2 45);
  --accent-foreground: oklch(0.15 0.04 262);
}

.dark {
  --primary: oklch(0.65 0.22 280);
  /* ... dark mode colors ... */
}
```

Use [oklch.dev](https://oklch.dev) to pick colors.

### Update Tailwind Classes

Apply theme tokens in components:

```typescript
// Good ✅ - Uses theme tokens
<button className="bg-primary text-primary-foreground">
  Click me
</button>

// Avoid ❌ - Hard-coded colors
<button className="bg-purple-500 text-white">
  Click me
</button>
```

## Working with Translations

### Add New Translation Key

1. Edit `/contexts/LanguageContext.tsx`
2. Add to both `en` and `ar` objects:

```typescript
export const translations = {
  en: {
    newSection: {
      key1: 'English text',
      key2: 'More text',
    }
  },
  ar: {
    newSection: {
      key1: 'النص العربي',
      key2: 'المزيد من النص',
    }
  }
}
```

### Use Translation in Component

```typescript
const { language } = useContext(LanguageContext)
const t = language === 'ar' ? translations.ar : translations.en

// Use it
<h1>{t.newSection.key1}</h1>
<p>{t.newSection.key2}</p>
```

### Translation Best Practices

✅ **Do:**
- Keep keys organized by section
- Use descriptive key names
- Provide context in comments
- Test both languages

❌ **Don't:**
- Hard-code text in JSX
- Use auto-translate without review
- Forget RTL considerations
- Skip testing Arabic text

## Performance Optimization

### Code Splitting

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
})

export default function Page() {
  return <HeavyComponent />
}
```

### Image Optimization

```typescript
import Image from 'next/image'

// Good ✅
<Image
  src="/logo.png"
  alt="Logo"
  width={40}
  height={40}
  priority
/>

// Avoid ❌
<img src="/logo.png" alt="Logo" />
```

### Minimize Bundles

- Use tree-shaking: Only import used functions
- Avoid large dependencies
- Compress images
- Remove unused CSS

## Testing

### Manual Testing Checklist

Before committing:

```bash
# 1. Start dev server
npm run dev

# 2. Test all languages
# - Switch to Arabic
# - Check text is RTL
# - Switch back to English

# 3. Test all themes
# - Toggle dark mode
# - Check contrast
# - Verify colors

# 4. Test all tools
# - Try each tool
# - Test error cases
# - Check loading states

# 5. Test responsive
# - Desktop (1920px)
# - Tablet (768px)
# - Mobile (320px)

# 6. Test browser
# - Chrome
# - Firefox
# - Safari
```

### Build Testing

```bash
# Test production build locally
npm run build
npm start

# Visit http://localhost:3000
# Repeat manual tests above
```

## Git Workflow

### Branch Naming

```
feature/add-new-tool      # New feature
fix/button-styling        # Bug fix
chore/update-deps         # Maintenance
docs/update-readme        # Documentation
```

### Commit Messages

```bash
# Good ✅
git commit -m "feat: add screenshot tool to tools grid"
git commit -m "fix: dark mode toggle not persisting"
git commit -m "docs: update API documentation"

# Avoid ❌
git commit -m "update"
git commit -m "fix stuff"
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with clear messages
5. Push to branch
6. Create PR with description
7. Wait for review
8. Merge to main

## Debugging

### Browser Console

```typescript
// Verbose logging
console.log('[v0] Variable:', variable)
console.log('[v0] Object:', JSON.stringify(obj, null, 2))
console.log('[v0] Performance mark:', performance.now())

// Check errors
console.error('[v0] Error:', error.message)
```

### DevTools

```
1. Press F12 (or Cmd+Option+I)
2. Check Console for [v0] logs
3. Check Network for API calls
4. Check Performance for bottlenecks
5. Check Storage for localStorage data
```

### Vercel Analytics

View real-time logs:

```bash
vercel logs --tail
```

## Environment Variables

### Local Development

Create `.env.local`:

```
SHRINKME_API_KEY=99a3b5b93b3c9ff5970f7fd070f313de58e610d1
SHRINKME_API_URL=https://shrinkme.io/api
```

### Production (Vercel)

Set in Vercel Dashboard → Settings → Environment Variables

### Using Variables

```typescript
// Only accessible on server (won't leak to client)
const secret = process.env.SECRET_KEY

// Accessible on client (use NEXT_PUBLIC_ prefix)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Automatic deployment triggers
# Wait 2-3 minutes
# Check vercel.com for deployment status
```

### Check Logs

```bash
# Real-time logs
vercel logs --tail

# Specific deployment
vercel logs <deployment-id>
```

## Common Tasks

### Add Dark Mode to Component

```typescript
import { useTheme } from '@/contexts/ThemeContext'

export default function MyComponent() {
  const { isDark } = useTheme()
  
  return (
    <div className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>
      Content
    </div>
  )
}
```

### Add Language Support

```typescript
const { language } = useContext(LanguageContext)
const isArabic = language === 'ar'

return (
  <div className={isArabic ? 'rtl' : 'ltr'}>
    {isArabic ? 'النص العربي' : 'English text'}
  </div>
)
```

### Handle API Errors

```typescript
try {
  const data = await fetchAPI()
  setResult(data)
} catch (error: any) {
  const message = error.message || 'Unknown error'
  setError(message)
  console.error('[v0] Error:', message)
}
```

## Performance Metrics

### Target Metrics

- **Lighthouse Score**: 90+
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Build Size**: < 500KB
- **Page Load**: < 3s

### Monitor Metrics

```bash
# Locally
npm run build
npm start

# Then visit https://pagespeed.web.dev
```

## Security Checklist

- [ ] No sensitive data in localStorage
- [ ] API keys in environment variables
- [ ] Input validation on all forms
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Error messages don't leak info
- [ ] Rate limiting considered
- [ ] Dependencies up to date

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)

### Tools
- [VS Code](https://code.visualstudio.com) - Recommended editor
- [DevTools](https://developer.chrome.com/docs/devtools) - Browser debugging
- [Vercel Dashboard](https://vercel.com) - Deployment

### Learning
- [Next.js Tutorial](https://nextjs.org/learn)
- [Web Dev Basics](https://web.dev)
- [TypeScript Handbook](https://typescriptlang.org/docs)

---

Happy coding! Questions? Check README.md or open an issue on GitHub.
