import { useState, useCallback } from 'react'
import { paymentApi } from '@/core/api'

export const usePayment = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const buyUSDC = useCallback(async (amount: number, walletId: string) => {
        try {
            setLoading(true)
            setError(null)

            const result = await paymentApi.buyUSDC({
                amount,
                walletId,
                paymentMethod: 'qr',
                currency: 'USD'
            })

            return result
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const generateQR = useCallback(async (amount: number, walletId: string) => {
        try {
            setLoading(true)
            setError(null)

            const result = await paymentApi.generateQRCode({
                amount,
                currency: 'USD',
                walletId,
                expiresIn: 600 // 10 minutes
            })

            return result
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        buyUSDC,
        generateQR,
        loading,
        error,
        clearError: () => setError(null)
    }
}