# Fix DNS Configuration for www.owltable.net

## Current Status

✅ Domains are added to your Vercel project  
⚠️ DNS records need to be updated  

## The Problem

Your domains show **"DNS Change Recommended"** because the DNS records aren't pointing to Vercel correctly yet.

## DNS Instructions from Vercel

![Vercel DNS Instructions](/home/yehoshua_sus/.gemini/antigravity/brain/aaa52f5e-955e-4bcb-82cd-a9e0d963a590/dns_instructions_1764332030042.png)

## What You Need to Do

You need to update your DNS records at your domain registrar (where you bought owltable.net).

### For www.owltable.net

Based on Vercel's recommendations, you need to add/update these DNS records:

**CNAME Record:**
- **Type**: CNAME
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: 3600 (or Auto)

### For owltable.net (root domain)

**A Record:**
- **Type**: A
- **Name**: `@` (or leave blank for root)
- **Value**: `76.76.76.76` (Vercel's IP address)
- **TTL**: 3600 (or Auto)

## Where to Update DNS

1. **Log in to your domain registrar** (where you bought owltable.net)
   - Common registrars: GoDaddy, Namecheap, Google Domains, Cloudflare, etc.

2. **Find DNS Settings**
   - Look for: "DNS Management", "DNS Settings", "Nameservers", or "Advanced DNS"

3. **Update the records** as shown above

4. **Save changes**

## After Updating DNS

1. **Wait 5-30 minutes** for DNS propagation (can take up to 48 hours in rare cases)
2. **Go back to Vercel** → Your Project → Settings → Domains
3. **Click "Refresh"** next to each domain
4. The warnings should disappear and show ✓ Valid Configuration

## Check DNS Propagation

You can check if your DNS changes have propagated:
- Visit: https://dnschecker.org/
- Enter: `www.owltable.net`
- Check if it shows the CNAME pointing to `cname.vercel-dns.com`

## Troubleshooting

### "I don't know where I bought my domain"

Run this command to find out:
```bash
whois owltable.net | grep -i registrar
```

### "The DNS records are already set correctly"

- Clear your browser cache
- Wait a bit longer (DNS can take time)
- Click "Refresh" in Vercel domains page
- Try accessing the site in incognito mode

### "I'm using Cloudflare"

If you're using Cloudflare:
1. Make sure the DNS record is set to "DNS only" (gray cloud), not "Proxied" (orange cloud)
2. Or follow Vercel's Cloudflare-specific instructions

## Need Help?

Let me know:
1. Where your domain is registered (GoDaddy, Namecheap, etc.)
2. If you're using Cloudflare or another DNS provider
3. Any error messages you see

I can provide specific instructions for your registrar!
