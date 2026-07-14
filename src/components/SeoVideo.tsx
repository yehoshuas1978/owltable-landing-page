'use client';

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import { Database, FileCheck2, ShieldCheck } from 'lucide-react';

type SeoVideoProps = {
    title: string;
    description: string;
    uploadDate?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    duration?: string; // ISO 8601 duration, e.g., 'PT2M42S'
};

export default function SeoVideo({ title, description, uploadDate, videoUrl, thumbnailUrl, duration }: SeoVideoProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const isExternalEmbed = Boolean(videoUrl?.includes('youtube.com/embed/') || videoUrl?.includes('player.vimeo.com'));
    const isLocalVideo = Boolean(videoUrl && !isExternalEmbed);

    // Extract YouTube ID for default thumbnail if applicable
    let defaultThumbnail = thumbnailUrl;
    if (!defaultThumbnail && videoUrl?.includes('youtube.com/embed/')) {
        const videoId = videoUrl.split('embed/')[1]?.split('?')[0];
        if (videoId) {
            defaultThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }

    const videoObject = videoUrl ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: title,
        description: description,
        thumbnailUrl: defaultThumbnail?.startsWith('/')
            ? `https://www.owltable.net${defaultThumbnail}`
            : defaultThumbnail || 'https://www.owltable.net/icon.jpg',
        ...(uploadDate ? { uploadDate } : {}),
        ...(duration ? { duration } : {}),
        ...(isExternalEmbed ? { embedUrl: videoUrl } : { contentUrl: `https://www.owltable.net${videoUrl}` }),
    } : null;

    if (!videoUrl) {
        return (
            <section className="my-8 overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
                <div className="grid min-h-[360px] md:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex flex-col justify-between bg-slate-100 p-8 text-slate-950">
                        <div>
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                                Product Walkthrough
                            </div>
                            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-normal">{title}</h2>
                            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{description}</p>
                        </div>
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-md border border-slate-200 bg-white p-4">
                                <Database size={22} className="text-cyan-700" aria-hidden="true" />
                                <p className="mt-3 text-sm font-semibold">Connect</p>
                            </div>
                            <div className="rounded-md border border-slate-200 bg-white p-4">
                                <ShieldCheck size={22} className="text-emerald-700" aria-hidden="true" />
                                <p className="mt-3 text-sm font-semibold">Mask</p>
                            </div>
                            <div className="rounded-md border border-slate-200 bg-white p-4">
                                <FileCheck2 size={22} className="text-rose-700" aria-hidden="true" />
                                <p className="mt-3 text-sm font-semibold">Validate</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-slate-900 p-8">
                        <div className="relative aspect-video w-full rounded-lg border border-cyan-300/20 bg-slate-800 p-5">
                            <div className="mb-5 h-3 w-2/3 rounded bg-cyan-300" />
                            <div className="space-y-3">
                                <div className="h-3 w-full rounded bg-slate-600" />
                                <div className="h-3 w-5/6 rounded bg-slate-600" />
                                <div className="h-3 w-3/4 rounded bg-slate-600" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid w-44 gap-3 rounded-lg border border-cyan-300/20 bg-slate-950/70 p-4 shadow-xl shadow-cyan-950/30">
                                    <div className="flex items-center gap-3">
                                        <span className="h-3 w-3 rounded-full bg-cyan-300" />
                                        <span className="h-2 flex-1 rounded bg-slate-500" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="h-3 w-3 rounded-full bg-emerald-300" />
                                        <span className="h-2 flex-1 rounded bg-slate-500" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="h-3 w-3 rounded-full bg-rose-300" />
                                        <span className="h-2 flex-1 rounded bg-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (isLocalVideo) {
        return (
            <div className="my-8 w-full">
                {videoObject ? <JsonLd data={videoObject} /> : null}
                <video
                    className="aspect-video w-full rounded-lg border border-white/10 bg-slate-950 shadow-2xl shadow-black/30"
                    controls
                    playsInline
                    preload="metadata"
                    poster={defaultThumbnail}
                    aria-label={title}
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
        );
    }

    const autoplayUrl = videoUrl?.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;

    return (
        <div className="seo-video-container" style={{ margin: '2rem 0', width: '100%' }}>
            {videoObject ? <JsonLd data={videoObject} /> : null}
            <div 
                className="video-wrapper" 
                style={{ 
                    position: 'relative', 
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    height: 0, 
                    overflow: 'hidden', 
                    borderRadius: '12px',
                    backgroundColor: '#1a1a1a',
                    cursor: isLoaded ? 'default' : 'pointer'
                }}
                onClick={() => !isLoaded && setIsLoaded(true)}
            >
                {!isLoaded && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${defaultThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div style={{ 
                            width: '64px', height: '64px', 
                            backgroundColor: 'rgba(0,0,0,0.7)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease-in-out'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                )}
                {isLoaded && (
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        src={autoplayUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
}
