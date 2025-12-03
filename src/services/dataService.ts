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
            { name: 'Query Optimization on Creation', description: 'Get immediate feedback and suggested rewrites for the SQL statement you just created, ensuring performance best practices are baked in from the start.' },
            { name: 'Query History', description: 'Keep track of every executed query, making it easy to review, re-run, or debug past actions without losing context.' },
            { name: 'Basic Export (CSV/JSON) ', description: 'Quickly export your query results to industry-standard formats (CSV or JSON) for easy sharing and integration with spreadsheets or other tools.' }
        ]
    },
    {
        name: 'Pro',
        price: '$79',
        period: '/user/month (up to 10 users) + $15/additional user',
        target: 'Small to mid-sized teams',
        features: [
            { name: 'Smart Synthetic Data Generator', description: 'Smart Synthetic Data Generator allows your team to quickly and reliably populate development, staging, or testing environments with realistic, high-volume data that strictly conforms to your existing database schema.' },
            { name: 'Schema-Aware Suggestions', description: 'The AI provides contextually relevant column and table name suggestions as you type, significantly reducing syntax errors and speeding up development.' },
            { name: 'Query tuning & alerts', description: 'Analyze query performance and get alerts on slow queries.' },
            { name: 'Forecast Future Needs', description: 'Visualize historical data growth trends to accurately predict future storage requirements and avoid surprises.' },
            { name: 'Resource Alerts', description: 'Receive alerts for critical issues, such as running out of disk space, before they impact your services.' },
            { name: 'Automation', description: 'Automate Tedious TasksSimplify Backups: Schedule and automate database backups to ensure your data is always protected without manual intervention.' },
            { name: 'CI/CD integration', description: 'Integrate database changes into your CI/CD pipeline.' },
            { name: 'Powerful CLI', description: 'A full-featured Command-Line Interface (CLI) that can connect to the main application' },
            { name: 'Advanced Role Management', description: 'granular access control.' },
        ],
        highlight: true
    },
    {
        name: 'Enterprise (Coming Soon)',
        price: 'Custom',
        period: '$3,000/month per company',
        target: 'Larger organizations & enterprises',
        features: [
            { name: 'Data masking & subsetting', description: 'Mask sensitive data and create smaller, representative subsets of your data for development and testing.' },
            { name: 'Expanded Compatibility', description: 'Connect to virtually any database, including NoSQL (e.g., MongoDB) and major cloud databases (e.g., Amazon RDS, Azure SQL).' },
            { name: 'Proactive Diagnostics', description: 'Receive Smart Alerts for critical issues (like disk space) and Automated Root Cause Analysis to immediately diagnose performance problems.' },
            { name: 'Advanced monitoring', description: 'Connect with external monitoring systems like OpenTelemetry for a unified view of your infrastructures health.' },
            { name: 'Automated Root Cause Analysis', description: 'Move beyond alerts to diagnosis. OwlTable will automatically identify the root cause of performance problems, saving you hours of troubleshooting.' },
            { name: 'Full Database Versioning', description: 'Treat your entire database as a versioned artifact, enabling complex deployment and rollback strategies.' },
            { name: 'Distributed Systems Support', description: 'Manage at scale with Advanced Role Management and granular access control.' },
            { name: 'AI-Powered SQL Tools', description: 'Includes Natural Language to SQL (Text-to-SQL) and Schema-Aware Suggestions for faster, error-free development.' },
        ]
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
