# Quick Start: Deploy to Vercel

Your Next.js app is ready to deploy! Follow these steps to get it live on Vercel.

## Current Status

✅ **GitHub Repository**: Configured and ready  
✅ **Next.js Build**: Tested and working  
❌ **Vercel Deployment**: Not yet connected  
🔄 **GitHub Pages**: Documentation deployment in progress  

## Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel Dashboard

1. Open [vercel.com/new](https://vercel.com/new) in your browser
2. Sign in with your GitHub account (if not already signed in)

### Step 2: Import Your Repository

1. You'll see "Import Git Repository"
2. Search for: `owltable-landing-page`
3. Click **"Import"** next to your repository

### Step 3: Configure Project (Auto-detected)

Vercel will automatically detect:
- ✅ Framework: **Next.js**
- ✅ Root Directory: `./`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

**You don't need to change anything!**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for the build to complete
3. You'll get a URL like: `owltable-landing-page-xxx.vercel.app`

### Step 5: Add Custom Domain (Optional)

To use `www.owltable.net`:

1. Go to **Project Settings** → **Domains**
2. Add domain: `www.owltable.net`
3. Follow Vercel's DNS instructions to point your domain to Vercel

**DNS Configuration:**
- Add a CNAME record: `www` → `cname.vercel-dns.com`
- Or follow the specific instructions Vercel provides

## What Happens Next?

Once deployed:

- **Main App**: `www.owltable.net` (or your Vercel URL)
- **Documentation**: `yehoshuas1978.github.io/owltable-landing-page/`
- **Auto-deployments**: Every push to `main` triggers a new Vercel deployment

## Troubleshooting

### "Repository not found"
- Make sure you're signed into Vercel with the same GitHub account
- Grant Vercel access to your repositories in GitHub settings

### Build fails
- Check the build logs in Vercel dashboard
- The build works locally, so it should work on Vercel

### Domain not working
- DNS changes can take up to 48 hours (usually much faster)
- Verify your DNS settings match Vercel's requirements

## Need Help?

Check the detailed guide: [VERCEL_DEPLOYMENT.md](file:///home/yehoshua_sus/Projects/owltable-landing-page/VERCEL_DEPLOYMENT.md)
