# GetWealth OS - Quick Start Guide

Get your free tools platform running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org))
- GitHub account for deployment (optional)
- 10 minutes of your time

## Local Development (2 minutes)

### 1. Clone and Install

```bash
# Clone the repository (replace with your repo URL)
git clone https://github.com/yourname/getwealthos.git
cd getwealthos

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

### 3. Test Features

- ✅ Change language (AR/EN) in header
- ✅ Toggle dark/light mode
- ✅ Click each tool to see forms
- ✅ Test responsive design (resize browser)

## Deploy to Vercel (3 minutes)

### Option A: Instant Deploy (No coding needed)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Paste: `https://github.com/yourname/getwealthos`
4. Click "Import"
5. Click "Deploy"
6. Done! Your site is live at `getwealthos.vercel.app`

### Option B: GitHub Connect

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select from GitHub
5. Auto-deploys on every push!

## Add Custom Domain (Optional)

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `getwealthos.com`)
4. Update DNS at domain registrar:
   - CNAME: `cname.vercel.com`
5. Wait 5-10 minutes, then visit your domain!

## Customize Your Site

### Change Title & Description

Edit `/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
  // ... rest of config
}
```

### Change Colors

Edit `/app/globals.css`:
```css
:root {
  --primary: oklch(0.55 0.2 280);    /* Change purple to your color */
  --accent: oklch(0.6 0.2 45);       /* Change amber to your color */
  /* ... more colors ... */
}
```

Use this tool to pick colors: [oklch.js](https://oklch.dev)

### Add Your Logo

1. Create logo image (SVG or PNG)
2. Save to `/public/logo.png`
3. Update `/components/Header.tsx`:
```typescript
<img src="/logo.png" alt="Logo" className="w-10 h-10" />
```

### Change Tool Names

Edit `/contexts/LanguageContext.tsx` - look for translations section

## Add Monetization

### Setup ShrinkMe Earnings

Already integrated! Just verify:

1. Visit [shrinkme.io](https://shrinkme.io)
2. Sign up for account
3. Go to API settings
4. Copy your API key
5. Update in `.env.local`:
```
SHRINKME_API_KEY=your_key_here
```

### Setup Google AdSense

1. Apply at [google.com/adsense](https://google.com/adsense)
2. Get approval (7-14 days)
3. Copy Publisher ID
4. Update `.env.local`:
```
NEXT_PUBLIC_ADSENSE_ID=your_id
```

### Setup Analytics

Enable Vercel Analytics:
1. Go to [vercel.com](https://vercel.com) → Project → Analytics
2. Click "Enable"
3. View realtime visitor data!

## Test Before Launching

### Mobile Test

```bash
# In browser DevTools:
# 1. Press F12 or Cmd+Option+I
# 2. Click device icon
# 3. Select "iPhone 12" or "Pixel 5"
# 4. Test all tools on mobile
```

### All Tools Test

| Tool | Action | Expected |
|------|--------|----------|
| TikTok | Paste video URL | Shows download link |
| Logo | Enter text + theme | Shows logo image |
| File | Paste file URL | Shows download link |
| Shazam | Paste MP3 URL | Shows song info |
| TempMail | Click create | Shows temp email |
| AI Chat | Type message | AI responds |

### SEO Test

```bash
# Check meta tags
# 1. Right-click page
# 2. Select "View Page Source"
# 3. Look for <title> and <meta> tags
```

## Fix Common Issues

### Nothing appears on localhost

```bash
# Clear cache
rm -rf .next
npm run dev
```

### "Port 3000 already in use"

```bash
# Use different port
npm run dev -- -p 3001
```

### Dark mode not saving

- Make sure localStorage is enabled
- Check browser DevTools → Application → Local Storage

### API errors

1. Check internet connection
2. Try API URL in browser directly
3. Check browser console (F12) for details
4. Test with VPN off (some APIs blocked in some regions)

## Performance Tips

### Optimize Images

Use this free tool: [TinyPNG](https://tinypng.com)

### Monitor Performance

1. Visit [pagespeed.web.dev](https://pagespeed.web.dev)
2. Enter your domain
3. Check "Lighthouse" score
4. Target: 90+ on all metrics

### Check Core Web Vitals

In Vercel Dashboard:
1. Go to your project
2. Click "Analytics"
3. View Core Web Vitals scores

## Scaling Tips

### When Traffic Grows (10K+ daily users)

1. **Upgrade Vercel Plan**
   - Free: Good for <1K daily users
   - Pro ($20/month): Good for 10K+ users
   - Enterprise: For 100K+ users

2. **Add Database** (for user accounts)
   - Supabase: Free tier available
   - Neon: PostgreSQL, free tier
   - Firebase: Real-time, free tier

3. **Setup Email Notifications**
   - SendGrid: Free 100 emails/day
   - Resend: Free for dev, cheap for prod

4. **Monitor Errors**
   - Sentry: Free error tracking
   - Vercel: Built-in error logs

## Revenue Tracking

### Daily Earnings Dashboard

Create `/components/AdminPanel.tsx` to track:

```typescript
import { getAnalytics } from '@/lib/analytics'

export default function AdminPanel() {
  const { visitCount, toolUsage } = getAnalytics()
  
  return (
    <div>
      <h2>Today's Stats</h2>
      <p>Visits: {visitCount}</p>
      <p>Tools Used: {JSON.stringify(toolUsage)}</p>
    </div>
  )
}
```

Then protect with password in `.env.local`:

```
ADMIN_PASSWORD=your_secret_password
```

## Next Features to Add

1. **User Accounts** (with Supabase)
   - Save history
   - Custom preferences
   - Premium features

2. **More Tools**
   - Video converter
   - QR code generator
   - Image compressor
   - Text tools

3. **Mobile App**
   - Using React Native
   - iOS/Android versions

4. **Browser Extension**
   - Right-click context menu
   - Quick access

## Get Help

### Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Vercel Docs**: https://vercel.com/docs
- **shadcn/ui**: https://ui.shadcn.com

### Ask for Help

- Check the main [README.md](./README.md)
- Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- Open GitHub issue
- Email support

## Success Checklist

- [ ] Local development working
- [ ] Deployed to Vercel
- [ ] All 6 tools functional
- [ ] Dark/Light mode working
- [ ] AR/EN languages working
- [ ] ShrinkMe API configured
- [ ] Google AdSense applied
- [ ] Analytics enabled
- [ ] Custom domain added
- [ ] SEO setup complete
- [ ] Mobile responsive
- [ ] Lighthouse score 90+

## What's Next?

1. **Promote Your Site**
   - Share on social media
   - Optimize for Google ranking
   - Add backlinks
   - Write blog posts

2. **Optimize for Conversion**
   - Add "Subscribe" buttons
   - Track user behavior
   - A/B test designs
   - Improve CTR

3. **Scale Revenue**
   - Multiple ad networks
   - Affiliate programs
   - Premium features
   - Sponsorships

4. **Expand Features**
   - Add more tools
   - Improve existing ones
   - Add API features
   - Build community

## Timeline to $1K/Month

- **Week 1**: Launch & setup
- **Week 2-3**: Get 1K daily users (through Twitter/Reddit)
- **Week 4+**: Optimize for search engine
- **Month 2**: 3K daily users
- **Month 3**: 5K daily users = ~$1K/month revenue
- **Month 6**: 10K+ daily users = $3K-5K/month

## Final Tips

✅ **Do:**
- Test thoroughly before launching
- Monitor performance daily
- Update content regularly
- Engage with users
- Collect user feedback

❌ **Don't:**
- Copy competitor designs directly
- Ignore SEO optimization
- Spam users with emails
- Forget to test mobile
- Neglect security updates

---

Congratulations! You now have a fully functional, profit-ready tools platform. Time to launch! 🚀

For detailed setup, check [DEPLOYMENT.md](./DEPLOYMENT.md)
