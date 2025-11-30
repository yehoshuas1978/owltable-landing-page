export interface UserData {
    name: string;
    role: string;
    email: string;
    status: 'Active' | 'Inactive';
    lastActive: string;
    securityLevel: string;
}

export interface PricingPlan {
    name: string;
    price: string;
    period: string;
    target: string;
    features: { name: string, description: string }[];
    highlight?: boolean;
}

const FAKE_USER_DATA: UserData = {
    name: 'Alex T.',
    role: 'Lead Developer',
    email: 'alex.t@jetbrains-style.com',
    status: 'Active',
    lastActive: 'Just now',
    securityLevel: 'Admin',
};

const FAKE_PRICING_DATA: PricingPlan[] = [
    {
        name: 'Starter',
        price: '$19',
        period: '/user/month',
        target: 'Small teams, freelancers',
        features: [
            { name: 'Edit Data on the Fly', description: 'Visually browse and edit data directly within a query result set (up to 500 records).' },            
            { name: 'Schema diff', description: 'Compare and sync database schemas between environments.' },
            { name: 'ERD visualization', description: 'Visualize your database schema as an Entity-Relationship Diagram.' },
            { name: 'Basic monitoring', description: 'Monitor key database metrics and get alerts on potential issues.' },
            { name: 'Query tuning & alerts', description: 'Analyze query performance and get alerts on slow queries.' },
            { name: 'Query History', description: 'Keep track of every executed query, making it easy to review, re-run, or debug past actions without losing context.' },
            { name: 'Query tuning & alerts', description: 'Quickly export your query results to industry-standard formats (CSV or JSON) for easy sharing and integration with spreadsheets or other tools.' }            
        ]
    },
    {
        name: 'Pro',
        price: '$99',
        period: '/user/month',
        target: 'Growing companies',
        features: [
            { name: 'CI/CD integration', description: 'Integrate database changes into your CI/CD pipeline.' },
            { name: 'Advanced monitoring', description: 'Connect with external monitoring systems like OpenTelemetry for a unified view of your infrastructures health.' },
            { name: 'Automation', description: 'Automate Tedious TasksSimplify Backups: Schedule and automate database backups to ensure your data is always protected without manual intervention.' },
            { name: 'Data masking & subsetting', description: 'Mask sensitive data and create smaller, representative subsets of your data for development and testing.' },
            { name: 'Capacity planning', description: 'Forecast future database growth and plan capacity accordingly.' },
        ],
        highlight: true
    },
    {
        name: 'Enterprise (Coming Soon)',
        price: 'Custom',
        period: '$30k–$80k/year per company',
        target: 'Larger organizations & enterprises',
        features: [
            { name: 'Expanded Compatibility', description: 'Connect to virtually any database, including NoSQL (e.g., MongoDB) and major cloud databases (e.g., Amazon RDS, Azure SQL).' },
            { name: 'Proactive Diagnostics', description: 'Receive Smart Alerts for critical issues (like disk space) and Automated Root Cause Analysis to immediately diagnose performance problems.' },
            { name: 'Full Database Versioning', description: 'Treat your entire database as a versioned artifact, enabling complex deployment and rollback strategies.' },
            { name: 'Advanced CLI & Automation', description: 'A powerful Command-Line Interface (CLI) for deep automation and integration into infrastructure-as-code workflows.' },
            { name: 'AI-Powered SQL Tools', description: 'Includes Natural Language to SQL (Text-to-SQL) and Schema-Aware Suggestions for faster, error-free development.' },
            { name: 'Distributed Systems Support', description: 'Manage at scale with Advanced Role Management and granular access control.' }
        ],
        highlight: true // Assuming you want to highlight the top-tier plan
    }    
];

export interface LicenseData {
    owner: string;
    plan: string;
    status: 'Active' | 'Expired';
    expiryDate: string;
    licenseKey: string;
}

const FAKE_LICENSE_DATA: LicenseData = {
    owner: 'Alex T.',
    plan: 'Pro Plan',
    status: 'Active',
    expiryDate: '2025-12-31',
    licenseKey: 'OWL-PRO-2024-XXXX-YYYY-ZZZZ',
};

export const dataService = {
    getUserData: async (): Promise<UserData> => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return FAKE_USER_DATA;
    },

    getPricingData: async (): Promise<PricingPlan[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return FAKE_PRICING_DATA;
    },

    getLicenseData: async (): Promise<LicenseData> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return FAKE_LICENSE_DATA;
    },
};
