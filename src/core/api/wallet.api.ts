import axiosClient from '@/core/services/axios-client'

const API_WALLET_CREATE = '/wallet/create'
const API_WALLET_CONNECT = '/wallet/connect'
const API_WALLET_DISCONNECT = '/wallet/disconnect'
const API_WALLET_BALANCE = '/wallet/balance'
const API_WALLET_TRANSACTIONS = '/wallet/transactions'

interface CreateWalletParams {
    username: string
    publicKey: string
    authenticationType: 'passkey' | 'biometric'
    deviceInfo?: {
        userAgent: string
        platform: string
    }
}

interface ConnectWalletParams {
    publicKey: string
    signature: string
}

interface WalletResponse {
    id: string
    publicKey: string
    username: string
    balance: number
    isActive: boolean
    createdAt: string
}

interface TransactionResponse {
    id: string
    type: 'buy' | 'sell' | 'send' | 'receive'
    amount: number
    currency: string
    status: 'pending' | 'completed' | 'failed'
    transactionHash?: string
    createdAt: string
}

export const walletApi = {
    async createWallet(params: CreateWalletParams) {
        const response = await axiosClient.post<WalletResponse>(API_WALLET_CREATE, params)
        return response.data
    },

    async connectWallet(params: ConnectWalletParams) {
        const response = await axiosClient.post<WalletResponse>(API_WALLET_CONNECT, params)
        return response.data
    },

    async disconnectWallet(walletId: string) {
        const response = await axiosClient.post(`${API_WALLET_DISCONNECT}/${walletId}`)
        return response.data
    },

    async getWalletBalance(walletId: string) {
        const response = await axiosClient.get<{ balance: number; currency: string }>(`${API_WALLET_BALANCE}/${walletId}`)
        return response.data
    },

    async getWalletTransactions(walletId: string, params?: {
        page?: number
        limit?: number
        type?: string
    }) {
        const response = await axiosClient.get<{
            transactions: TransactionResponse[]
            pagination: {
                page: number
                limit: number
                total: number
                totalPages: number
            }
        }>(`${API_WALLET_TRANSACTIONS}/${walletId}`, { params })
        return response.data
    }
}