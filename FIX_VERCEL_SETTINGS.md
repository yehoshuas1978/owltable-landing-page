# Fix: Vercel 404 Error (Build Settings)

## The Problem

Your build is successful, but Vercel is serving 404s. This usually happens when **Vercel is looking in the wrong folder** for your app.

Because your project was originally a static export (using `out` folder), Vercel likely saved that setting. Now that we switched to full Next.js (which uses `.next` folder), Vercel is still looking in the empty `out` folder!

## The Fix

1. Go to your **Vercel Project Dashboard**
2. Click **"Settings"** (top tab)
3. Click **"Build & Development Settings"** (left sidebar)
4. Look at **"Output Directory"**:
   - ❌ If it says `out` or is toggled "Override" -> **This is the problem!**
   - ✅ It should be **empty** (default) or not overridden.

### Steps to Fix:

1. If "Output Directory" is overridden:
   - **Toggle OFF** the "Override" switch next to Output Directory.
   - It should revert to the default (Next.js handles this automatically).

2. Check **"Framework Preset"**:
   - It should be **"Next.js"**.

3. **Save** your changes.

4. **Redeploy**:
   - Go to **"Deployments"** tab.
   - Click the **three dots** (...) next to the latest deployment.
   - Click **"Redeploy"**.

## Why this happens

When you first imported the project, Vercel detected `output: 'export'` and automatically set the Output Directory to `out`. Now that we removed `output: 'export'`, we need to tell Vercel to stop looking in `out`.
