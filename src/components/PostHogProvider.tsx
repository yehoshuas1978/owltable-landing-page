'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import React, { useEffect } from 'react';

// Using a placeholder project key. In production, this should come from env variables.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_placeholder_key';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(POSTHOG_KEY, {
            api_host: POSTHOG_HOST,
            capture_pageview: false, // We'll handle this manually in Next.js if needed
            cross_subdomain_cookie: true,
            cookie_name: 'owlmask_ph_cookie'
        });
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
