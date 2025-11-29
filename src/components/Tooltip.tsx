'use client';

import { useState } from 'react';

export default function Tooltip({ text, children }: { text: string, children: React.ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            {isHovered && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs bg-black text-white text-sm rounded-md px-3 py-2 z-10 shadow-lg border border-white/10">
                    {text}
                </div>
            )}
        </div>
    );
}
