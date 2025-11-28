# Fix: www.owltable.net Shows 404 on Vercel

## Problem

Your domain `www.owltable.net` is pointing to Vercel (good!), but it's showing a 404 error because **the domain hasn't been linked to your Vercel project yet**.

## Solution: Link Domain to Your Project

You have **two options** to fix this:

---

### Option 1: Using Vercel Dashboard (Easiest)

1. **Go to your Vercel dashboard:**
   - Visit: https://vercel.com/dashboard
   - Find your `owltable-landing-page` project
   - Click on it

2. **Add the domain:**
   - Click on **"Settings"** tab
   - Click on **"Domains"** in the left sidebar
   - Click **"Add"** button
   - Enter: `www.owltable.net`
   - Click **"Add"**

3. **Verify DNS (if needed):**
   - Vercel will check if the domain is pointing correctly
   - If it shows a checkmark ✓, you're done!
   - If not, follow Vercel's DNS instructions

4. **Wait a few minutes:**
   - Domain propagation can take 1-5 minutes
   - Refresh `www.owltable.net` and it should work!

---

### Option 2: Using Vercel CLI

1. **Login to Vercel CLI:**
   ```bash
   cd /home/yehoshua_sus/Projects/owltable-landing-page
   vercel login
   ```

2. **Link the domain:**
   ```bash
   vercel domains add www.owltable.net
   ```

3. **Verify:**
   ```bash
   vercel domains ls
   ```

---

## What's Happening?

- ✅ Your Next.js app is deployed to Vercel
- ✅ Your domain DNS is pointing to Vercel
- ❌ The domain is not linked to your specific project

**The fix:** Just add the domain to your project in the Vercel dashboard!

---

## Quick Check: What's Your Vercel URL?

When you deployed, Vercel gave you a URL like:
- `owltable-landing-page.vercel.app`
- or `owltable-landing-page-xxx.vercel.app`

**Try visiting that URL** - it should work! That confirms your deployment is successful.

Once you link `www.owltable.net` to the project, both URLs will work.

---

## After Fixing

Once you add the domain in Vercel dashboard:
1. Wait 1-5 minutes for propagation
2. Visit `www.owltable.net`
3. Your Next.js app should load! 🎉

---

## Still Having Issues?

If the domain still doesn't work after 5 minutes:

1. **Check DNS settings:**
   - Make sure `www.owltable.net` has a CNAME record pointing to `cname.vercel-dns.com`

2. **Check Vercel project:**
   - Verify the domain appears in your project's "Domains" settings
   - Make sure it shows a green checkmark

3. **Clear browser cache:**
   - Try in an incognito/private window
   - Or clear your browser cache

Let me know if you need help with any of these steps!
