export interface UserData {
    name: string;
    role: string;
    email: string;
    status: 'Active' | 'Inactive';
    lastActive: string;
    securityLevel: string;
}

const FAKE_USER_DATA: UserData = {
    name: 'Alex T.',
    role: 'Lead Developer',
    email: 'alex.t@jetbrains-style.com',
    status: 'Active',
    lastActive: 'Just now',
    securityLevel: 'Admin',
};

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

    getLicenseData: async (): Promise<LicenseData> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return FAKE_LICENSE_DATA;
    },
};
