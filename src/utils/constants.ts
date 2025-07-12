export const QUICK_AMOUNTS = [25, 50, 100, 500] as const

export const STORAGE_KEYS = {
    USER_DATA: 'lazorkit_user',
    AUTH_TOKEN: 'auth_token',
    WALLET_PREFERENCES: 'wallet_preferences',
    THEME: 'theme',
    LANGUAGE: 'language'
} as const

export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile'
} as const

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh'
    },
    PAYMENT: {
        QR: '/payment/qr',
        BUY_USDC: '/payment/buy-usdc',
        STATUS: '/payment/status',
        HISTORY: '/payment/history'
    },
    WALLET: {
        CREATE: '/wallet/create',
        CONNECT: '/wallet/connect',
        BALANCE: '/wallet/balance'
    }
} as const

export const CURRENCIES = {
    USD: 'USD',
    USDC: 'USDC',
    VND: 'VND'
} as const

export const PAYMENT_METHODS = {
    QR: 'qr',
    BANK_TRANSFER: 'bank_transfer',
    CREDIT_CARD: 'credit_card'
} as const

export const WALLET_CONFIG = {
    RPC_URL: import.meta.env.VITE_LAZORKIT_RPC_URL || 'https://api.devnet.solana.com',
    PORTAL_URL: import.meta.env.VITE_LAZORKIT_PORTAL_URL || 'https://portal.lazor.sh',
    PAYMASTER_URL: import.meta.env.VITE_LAZORKIT_PAYMASTER_URL || 'https://lazorkit-paymaster.onrender.com',
    NETWORK: 'devnet',
    AUTO_CONNECT: true,
    PERSIST_CREDENTIALS: true
} as const

export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s-()]+$/,
    WALLET_ADDRESS: /^[A-Za-z0-9]{32,44}$/,
    AMOUNT: /^\d+(\.\d{1,6})?$/
} as const

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error - please check your connection',
    INVALID_AMOUNT: 'Please enter a valid amount',
    WALLET_NOT_CONNECTED: 'Wallet not connected',
    INSUFFICIENT_BALANCE: 'Insufficient balance',
    TRANSACTION_FAILED: 'Transaction failed',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PASSWORD: 'Password must be at least 8 characters'
} as const