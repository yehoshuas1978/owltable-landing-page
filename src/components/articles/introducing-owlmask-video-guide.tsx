import React from 'react';
import SeoVideo from '@/components/SeoVideo';

export default function IntroducingOwlMaskVideoGuide() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', fontStyle: 'italic' }}>
                We're thrilled to present our complete video guide for OwlMask. Whether you are new to data masking or looking to optimize your existing workflows, this guide will walk you through everything you need to know.
            </p>

            <SeoVideo 
                title="Introducing OwlMask: A Complete Video Guide"
                description="Watch this comprehensive video guide to see how OwlMask simplifies your database anonymization workflow."
                uploadDate="2026-07-05T09:00:00Z"
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            />

            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1.5rem', color: '#2d3748' }}>What You Will Learn</h2>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyleType: 'disc' }}>
                <li><strong>0:00 - Introduction:</strong> The importance of safe test data.</li>
                <li><strong>2:15 - Connecting your Database:</strong> How to securely connect OwlMask to your source databases.</li>
                <li><strong>5:30 - Defining Masking Rules:</strong> A deep dive into deterministic masking, format-preserving encryption, and custom rule creation.</li>
                <li><strong>12:45 - Execution and Validation:</strong> Running your first masking job and verifying the output integrity.</li>
            </ul>

            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1.5rem', color: '#2d3748' }}>Next Steps</h2>
            <p>
                After watching the video, we recommend heading over to our documentation to start setting up your first masking project. If you have any questions, our community forum is a great place to connect with other OwlTable users and our core engineering team.
            </p>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a href="/docs/intro" style={{ display: 'inline-block', backgroundColor: '#3182ce', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', transition: 'background-color 0.2s ease' }}>
                    Read the Documentation
                </a>
            </div>
        </div>
    );
}
