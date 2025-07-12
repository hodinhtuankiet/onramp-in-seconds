import axiosClient from '@/core/services/axios-client'

const API_PAYMENT_QR = '/payment/qr'
const API_PAYMENT_INITIATE = '/payment/initiate'
const API_PAYMENT_CONFIRM = '/payment/confirm'
const API_PAYMENT_STATUS = '/payment/status'
const API_PAYMENT_HISTORY = '/payment/history'
const API_BUY_USDC = '/payment/buy-usdc'

interface QRCodeParams {
    amount: number
    currency: string
    walletId: string
    expiresIn?: number // seconds
}

interface QRCodeResponse {
    qrCode: string
    paymentId: string
    paymentUrl: string
    expiresAt: string
}

interface BuyUSDCParams {
    amount: number
    walletId: string
    paymentMethod: 'qr' | 'bank_transfer' | 'credit_card'
    currency: 'USD' | 'VND'
}

interface BuyUSDCResponse {
    paymentId: string
    qrCode?: string
    paymentUrl: string
    amount: number
    currency: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    expiresAt: string
}

interface PaymentStatusResponse {
    paymentId: string
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'expired'
    amount: number
    currency: string
    transactionHash?: string
    createdAt: string
    completedAt?: string
    failureReason?: string
}

export const paymentApi = {
    async generateQRCode(params: QRCodeParams) {
        const response = await axiosClient.post<QRCodeResponse>(API_PAYMENT_QR, params)
        return response.data
    },

    async buyUSDC(params: BuyUSDCParams) {
        const response = await axiosClient.post<BuyUSDCResponse>(API_BUY_USDC, params)
        return response.data
    },

    async initiatePayment(params: {
        amount: number
        currency: string
        walletId: string
        paymentMethod: string
    }) {
        const response = await axiosClient.post<BuyUSDCResponse>(API_PAYMENT_INITIATE, params)
        return response.data
    },

    async confirmPayment(paymentId: string, params: {
        transactionHash?: string
        signature?: string
    }) {
        const response = await axiosClient.post(`${API_PAYMENT_CONFIRM}/${paymentId}`, params)
        return response.data
    },

    async getPaymentStatus(paymentId: string) {
        const response = await axiosClient.get<PaymentStatusResponse>(`${API_PAYMENT_STATUS}/${paymentId}`)
        return response.data
    },

    async getPaymentHistory(params?: {
        page?: number
        limit?: number
        status?: string
        fromDate?: string
        toDate?: string
    }) {
        const response = await axiosClient.get<{
            payments: PaymentStatusResponse[]
            pagination: {
                page: number
                limit: number
                total: number
                totalPages: number
            }
        }>(API_PAYMENT_HISTORY, { params })
        return response.data
    }
}