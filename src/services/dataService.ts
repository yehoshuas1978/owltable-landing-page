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
        price: '$29',
        period: '/user/month',
        target: 'Small teams, freelancers',
        features: [
            { name: 'Schema diff', description: 'Compare and sync database schemas between environments.' },
            { name: 'ERD visualization', description: 'Visualize your database schema as an Entity-Relationship Diagram.' },
            { name: 'Basic monitoring', description: 'Monitor key database metrics and get alerts on potential issues.' },
            { name: 'Query tuning & alerts', description: 'Analyze query performance and get alerts on slow queries.' }
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
