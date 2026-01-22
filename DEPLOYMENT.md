# GetWealth OS - Deployment Guide

## Quick Start - Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

Click this button to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourrepo%2Fgetwealthos&env=SHRINKME_API_KEY,SHRINKME_API_URL&envDescription=ShrinkMe%20API%20credentials%20for%20link%20shortening&envLink=https%3A%2F%2Fshrinkme.io)

### Option 2: Manual Vercel Deployment

1. **Sign up on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub/GitLab/Bitbucket

2. **Import Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Enter your repository URL
   - Click "Import"

3. **Configure Environment**
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     SHRINKME_API_KEY=99a3b5b93b3c9ff5970f7fd070f313de58e610d1
     SHRINKME_API_URL=https://shrinkme.io/api
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site is live!

## Custom Domain

### Add Domain to Vercel

1. Go to Project Settings → Domains
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `getwealthos.com`)
4. Update DNS records at your domain provider:
   ```
   CNAME: cname.vercel.com
   ```
5. Vercel will verify and enable HTTPS automatically

## Environment Variables

### Required Variables

```env
SHRINKME_API_KEY=99a3b5b93b3c9ff5970f7fd070f313de58e610d1
SHRINKME_API_URL=https://shrinkme.io/api
```

### Recommended Variables

```env
NEXT_PUBLIC_SITE_URL=https://getwealthos.com
NEXT_PUBLIC_SITE_NAME=GetWealth OS
NODE_ENV=production
```

### Optional Variables (for future integrations)

```env
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

## Pre-Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Build successfully: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] All APIs responding
- [ ] Both languages (AR/EN) working
- [ ] Dark/Light mode toggle working
- [ ] Mobile responsive looks good
- [ ] ShrinkMe API key configured
- [ ] Meta tags updated
- [ ] Favicon configured

## Post-Deployment Tasks

### 1. Setup SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add domain to Google Analytics
- [ ] Add domain to Google AdSense

### 2. Configure Analytics
- [ ] Enable Vercel Analytics in project settings
- [ ] Add Google Analytics ID to `.env.local`
- [ ] Test analytics tracking
- [ ] Set up Sentry for error tracking (optional)

### 3. Setup AdSense
- [ ] Apply for Google AdSense
- [ ] Copy AdSense client ID
- [ ] Add to environment variables
- [ ] Wait for approval (7-14 days)
- [ ] Verify code implemented

### 4. Configure ShrinkMe
- [ ] Verify ShrinkMe API working
- [ ] Test link shortening
- [ ] Set up payment method
- [ ] Check daily earnings

### 5. Monitoring
- [ ] Setup error alerts via Vercel
- [ ] Monitor Core Web Vitals
- [ ] Check daily traffic
- [ ] Monitor API response times

## Performance Optimization

### Vercel Settings

1. **Builds**
   - Function memory: 1024 MB
   - Max execution time: 60s

2. **Edge Caching**
   - Set cache headers in `next.config.mjs`
   - Cache static assets: 1 year
   - Cache API responses: 5 minutes

3. **Deployment Settings**
   - Enable Preview Deployments
   - Auto-deploy on push
   - Enable Web Analytics

### Monitoring

```bash
# Check build logs
vercel logs <deployment-id>

# Check real-time logs
vercel logs --follow

# View analytics
vercel analytics
```

## Troubleshooting

### Build Fails

```bash
# Clear build cache
vercel project remove-cache

# Redeploy
vercel --prod
```

### Cold Start Issues

- Increase function memory in Vercel settings
- Optimize API response times
- Consider adding Edge Runtime

### CORS Errors

- Verify `vercel.json` has correct headers
- Check API endpoints are accessible
- Test in different browsers

### Environment Variables Not Loading

- Verify variables in Vercel Settings
- Prefix client-side vars with `NEXT_PUBLIC_`
- Restart dev server: `npm run dev`

## Scalability

### Expected Traffic

- **Day 1-30**: 100-1K users/day
- **Month 1-3**: 1K-5K users/day
- **Month 3+**: 5K-20K users/day

### Vercel Plan Recommendations

| Users/Day | Plan | Cost |
|-----------|------|------|
| <1K | Hobby Free | $0 |
| 1K-10K | Pro | $20/month |
| 10K-100K | Pro | $20/month |
| 100K+ | Enterprise | Contact sales |

### Database (Future)

When adding database:
- Use Vercel's integrated Postgres
- Or Supabase for PostgreSQL
- Or Firebase for real-time data

## Backup & Recovery

### Automatic Backups
- GitHub repository is backup
- Vercel keeps deployment history (100 deployments)

### Manual Backup

```bash
# Clone repository
git clone <repo-url>

# Export analytics from localStorage
# Implement in admin panel when needed
```

## DNS Configuration

### Recommended Settings

```
A Record: @  → Vercel IP
CNAME: www → cname.vercel.com
MX Record: (for email) → Managed by email provider
TXT Record: (for verification) → As needed
```

## Security Headers

Already configured in `next.config.mjs`:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Add More Security

1. **HTTPS**: Automatic via Vercel
2. **HSTS**: Enable in Vercel settings
3. **CSP Headers**: Update in `next.config.mjs`

## Continuous Deployment

### GitHub Integration

1. Push to main branch
2. Vercel automatically:
   - Builds project
   - Runs tests
   - Deploys to production
   - Updates preview URLs

### Preview Deployments

- Each PR gets preview URL
- Test changes before merge
- Rollback easy if needed

## Team Collaboration

### Add Team Members (Pro Plan+)

1. Vercel Dashboard → Team Settings
2. Click "Add Member"
3. Invite via email
4. Set permissions:
   - Viewer (read-only)
   - Developer (can deploy)
   - Admin (full access)

## Monitoring & Logging

### Vercel Logs

```bash
# Real-time logs
vercel logs --tail

# All logs
vercel logs

# Specific deployment
vercel logs <deployment-id>
```

### Metrics to Monitor

- **Performance**: Core Web Vitals, page load time
- **Traffic**: Daily active users, pageviews
- **Errors**: API failures, JavaScript errors
- **Revenue**: ShrinkMe earnings, AdSense revenue

## Updating & Maintenance

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update next

# Commit and push
git add .
git commit -m "Update dependencies"
git push origin main
```

### Rollback to Previous Version

```bash
# In Vercel Dashboard
# Select Deployments → Click previous deployment → Promote to Production
```

## Cost Analysis

### Monthly Costs

| Service | Free Plan | Cost |
|---------|-----------|------|
| Vercel Hosting | Up to 50GB bandwidth | $0 |
| Domain | .com/.io | $10-15 |
| Custom email | Forwarder | $0 |
| **Total** | | **$10-15** |

### Revenue Potential

```
Conservative (5K daily users):
- ShrinkMe: 1.5K clicks × $0.01 = $15/day = $450/month
- AdSense: 150K impressions × $5/1000 = $750/month
- Total: ~$1,200/month profit

Aggressive (20K daily users):
- ShrinkMe: 6K clicks × $0.01 = $60/day = $1,800/month
- AdSense: 600K impressions × $5/1000 = $3,000/month
- VIP: 200 subscribers × $5 = $1,000/month
- Total: ~$5,800/month profit
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Status Page**: https://vercel.statuspage.io

## Next Steps

1. ✅ Deploy project
2. ✅ Setup analytics
3. ✅ Configure AdSense
4. ✅ Setup ShrinkMe payments
5. ✅ Monitor performance
6. ✅ Optimize for SEO
7. ✅ Scale based on traffic

---

For questions, check the main README.md or contact support.
