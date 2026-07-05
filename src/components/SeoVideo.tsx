'use client';

import React, { useState } from 'react';
import JsonLd from './JsonLd';

type SeoVideoProps = {
    title: string;
    description: string;
    uploadDate: string;
    videoUrl: string; // The embed URL e.g. https://www.youtube.com/embed/dQw4w9WgXcQ
    thumbnailUrl?: string; // Optional custom thumbnail, otherwise defaults to a gray box or standard play button
};

export default function SeoVideo({ title, description, uploadDate, videoUrl, thumbnailUrl }: SeoVideoProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Extract YouTube ID for default thumbnail if applicable
    let defaultThumbnail = thumbnailUrl;
    if (!defaultThumbnail && videoUrl.includes('youtube.com/embed/')) {
        const videoId = videoUrl.split('embed/')[1]?.split('?')[0];
        if (videoId) {
            defaultThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }

    const videoObject = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: title,
        description: description,
        thumbnailUrl: defaultThumbnail || 'https://www.owltable.net/icon.jpg', // Fallback to site icon
        uploadDate: uploadDate,
        embedUrl: videoUrl,
    };

    return (
        <div className="seo-video-container" style={{ margin: '2rem 0', width: '100%' }}>
            <JsonLd data={videoObject} />
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
                        src={`${videoUrl}?autoplay=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
}
