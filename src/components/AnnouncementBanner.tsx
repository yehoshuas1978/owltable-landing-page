'use client';

import { AlertCircle, X } from 'lucide-react';

export default function AnnouncementBanner({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 shadow-lg">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium">
                        <span className="font-bold">Pre-Launch:</span> OwlTable is currently under development and not yet available.
                        Expected launch: Q1 2026. Join our waitlist to be notified!
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-1"
                    aria-label="Close announcement"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
