import axiosClient from '@/core/services/axios-client'

const API_LOGIN_URL = '/auth/login'
const API_REGISTER_URL = '/auth/register'
const API_LOGOUT_URL = '/auth/logout'
const API_REFRESH_URL = '/auth/refresh'
const API_VERIFY_URL = '/auth/verify'

interface LoginParams {
    email: string
    password: string
    remember?: boolean
}

interface RegisterParams {
    email: string
    password: string
    username: string
    confirmPassword: string
}

interface AuthResponse {
    user: {
        id: string
        email: string
        username: string
        createdAt: string
    }
    token: string
    refreshToken: string
    expiresIn: number
}

export const authApi = {
    async login(params: LoginParams) {
        const response = await axiosClient.post<AuthResponse>(API_LOGIN_URL, params)
        return response.data
    },

    async register(params: RegisterParams) {
        const response = await axiosClient.post<AuthResponse>(API_REGISTER_URL, params)
        return response.data
    },

    async logout() {
        const response = await axiosClient.post(API_LOGOUT_URL)
        return response.data
    },

    async refreshToken(refreshToken: string) {
        const response = await axiosClient.post<AuthResponse>(API_REFRESH_URL, {
            refreshToken
        })
        return response.data
    },

    async verifyEmail(token: string) {
        const response = await axiosClient.post(API_VERIFY_URL, { token })
        return response.data
    }
}