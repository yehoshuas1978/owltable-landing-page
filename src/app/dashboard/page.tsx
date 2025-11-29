'use client';

import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-xl text-gray-400 mb-8">
          This is a demo dashboard page. In a real application, you would see your personalized content here.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
