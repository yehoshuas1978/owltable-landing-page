# Deploying to Vercel

This guide explains how to deploy the OwlTable landing page to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- Your GitHub repository connected to Vercel

## Deployment Steps

### 1. Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `owltable-landing-page`
4. Vercel will automatically detect that this is a Next.js project

### 2. Configure Project Settings

Vercel will auto-detect the following settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

You don't need to change any of these settings.

### 3. Environment Variables (Optional)

If you need to add environment variables:

1. Go to **Project Settings** → **Environment Variables**
2. Add any required variables for production, preview, or development environments

### 4. Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy your application
3. You'll receive a production URL (e.g., `owltable-landing-page.vercel.app`)

### 5. Custom Domain (Optional)

To add a custom domain:

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## Automatic Deployments

Once connected, Vercel will automatically:

- Deploy the `main` branch to production
- Create preview deployments for pull requests
- Rebuild when you push changes to GitHub

## Documentation

The documentation is hosted separately on GitHub Pages and is built/deployed via GitHub Actions when changes are pushed to the `documentation/` folder.

- **Main App**: Deployed to Vercel
- **Documentation**: Deployed to GitHub Pages at `https://<username>.github.io/owltable-landing-page/`

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are listed in `package.json`
- Verify that the build works locally with `npm run build`

### Environment Variables

- Make sure all required environment variables are set in Vercel
- Check that variable names match exactly (case-sensitive)

### Deployment Not Triggering

- Verify that Vercel has access to your GitHub repository
- Check that the webhook is properly configured in GitHub settings

## Support

For more information, see:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
