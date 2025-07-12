import axiosClient from '@/core/services/axios-client'

const API_USER_PROFILE = '/user/profile'
const API_USER_UPDATE = '/user/update'
const API_USER_BALANCE = '/user/balance'
const API_USER_SETTINGS = '/user/settings'

interface UserProfile {
    id: string
    email: string
    username: string
    fullName?: string
    avatar?: string
    isEmailVerified: boolean
    createdAt: string
    updatedAt: string
}

interface UpdateProfileParams {
    username?: string
    fullName?: string
    avatar?: string
}

interface UserSettings {
    notifications: {
        email: boolean
        push: boolean
        sms: boolean
    }
    security: {
        twoFactorEnabled: boolean
        biometricEnabled: boolean
    }
    preferences: {
        currency: string
        language: string
        theme: 'light' | 'dark' | 'auto'
    }
}

export const userApi = {
    async getProfile() {
        const response = await axiosClient.get<UserProfile>(API_USER_PROFILE)
        return response.data
    },

    async updateProfile(params: UpdateProfileParams) {
        const response = await axiosClient.put<UserProfile>(API_USER_UPDATE, params)
        return response.data
    },

    async getUserBalance() {
        const response = await axiosClient.get<{
            totalBalance: number
            balances: Array<{
                currency: string
                amount: number
                usdValue: number
            }>
        }>(API_USER_BALANCE)
        return response.data
    },

    async getSettings() {
        const response = await axiosClient.get<UserSettings>(API_USER_SETTINGS)
        return response.data
    },

    async updateSettings(settings: Partial<UserSettings>) {
        const response = await axiosClient.put<UserSettings>(API_USER_SETTINGS, settings)
        return response.data
    }
}