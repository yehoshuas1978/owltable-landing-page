import React from 'react';

export default function HowDataMaskingProtectsYourBusiness() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
                In today's interconnected digital landscape, protecting sensitive information is no longer optional—it's a critical business imperative. Every day, enterprises collect vast amounts of data, much of it personally identifiable information (PII) or sensitive corporate intelligence.
            </p>
            
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1.5rem', color: '#2d3748' }}>What is Data Masking?</h2>
            <p>
                Data masking, also known as data obfuscation, is the process of hiding original data with modified content (characters or other data). The main objective is to create a structural version that looks similar and can be used for purposes like software testing and user training, all while protecting the actual data.
            </p>

            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1.5rem', color: '#2d3748' }}>Why Your Business Needs It</h2>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyleType: 'disc' }}>
                <li><strong>Regulatory Compliance:</strong> GDPR, HIPAA, and SOC2 require strict controls over who can access PII. Masking data allows you to safely use production-like data in non-production environments without violating these regulations.</li>
                <li><strong>Insider Threat Mitigation:</strong> A significant portion of data breaches originate internally. By limiting access to raw production data, you drastically reduce this attack surface.</li>
                <li><strong>Safer Development & Testing:</strong> Developers and QA engineers need realistic data to test effectively. Masking provides high-fidelity data without the risk.</li>
            </ul>

            <div style={{ backgroundColor: '#ebf8ff', borderLeft: '4px solid #3182ce', padding: '1.5rem', borderRadius: '4px', marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2b6cb0', marginBottom: '0.5rem' }}>The Cost of Inaction</h3>
                <p style={{ color: '#2a4365', margin: 0 }}>
                    According to IBM's Cost of a Data Breach Report, the average cost of a breach reached $4.45 million in 2023. Implementing robust data masking is a fraction of that cost, providing an immediate return on investment in risk reduction alone.
                </p>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1.5rem', color: '#2d3748' }}>How OwlTable Helps</h2>
            <p>
                OwlTable's advanced data masking engine goes beyond simple redaction. We offer format-preserving encryption, deterministic masking, and advanced synthetic data generation to ensure your masked databases are perfectly suited for testing while remaining 100% secure.
            </p>
        </div>
    );
}
