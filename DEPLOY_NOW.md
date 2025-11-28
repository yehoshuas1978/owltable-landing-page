# Deploy to Vercel - Step by Step Guide

## Quick Deploy Using Vercel CLI

I've installed the Vercel CLI for you. Now follow these steps:

### Step 1: Login to Vercel

Run this command in your terminal:

```bash
cd /home/yehoshua_sus/Projects/owltable-landing-page
vercel login
```

This will:
1. Ask you to enter your email address
2. Send you a verification email
3. Click the link in the email to authenticate

### Step 2: Deploy to Vercel

After logging in, run:

```bash
vercel
```

The CLI will ask you a few questions:

1. **"Set up and deploy?"** → Press `Y` (Yes)
2. **"Which scope?"** → Select your account (press Enter)
3. **"Link to existing project?"** → Press `N` (No) - this is a new project
4. **"What's your project's name?"** → Press Enter to use `owltable-landing-page`
5. **"In which directory is your code located?"** → Press Enter (current directory)
6. **"Want to override the settings?"** → Press `N` (No) - auto-detection is perfect

Vercel will then:
- Build your Next.js app
- Deploy it to a preview URL
- Give you a URL like: `owltable-landing-page-xxx.vercel.app`

### Step 3: Deploy to Production

To deploy to production (www.owltable.net), run:

```bash
vercel --prod
```

### Step 4: Add Custom Domain

After deploying, add your custom domain:

```bash
vercel domains add www.owltable.net
```

Then follow the DNS instructions Vercel provides.

---

## Alternative: Deploy via Vercel Dashboard (Web UI)

If you prefer using the web interface instead of CLI:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Search for `owltable-landing-page`
4. Click "Import"
5. Click "Deploy" (all settings are auto-detected)

---

## What to Do Now

**Option 1 (Recommended - Faster):** Use the CLI commands above  
**Option 2:** Use the web dashboard at vercel.com/new

Both methods will work perfectly! The CLI is faster if you're comfortable with the terminal.

---

## Need Help?

If you get stuck at any step, let me know and I can help troubleshoot!
