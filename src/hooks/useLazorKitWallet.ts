import { useState, useEffect, useCallback } from 'react'

// Lazorkit Types
type WalletAccount = {
    credentialId: string
    passkeyPubkey: number[]
    smartWallet: string
    smartWalletAuthenticator: string
    isConnected: boolean
    timestamp: number
}

type ConnectResponse = {
    publicKey: string
    credentialId: string
    isCreated: boolean
    connectionType: 'create' | 'get'
    timestamp: number
}

// Error codes for wallet operations
const ErrorCode = {
    NOT_CONNECTED: 'NOT_CONNECTED',
    NO_STORED_CREDENTIALS: 'NO_STORED_CREDENTIALS',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    CONNECTION_FAILED: 'CONNECTION_FAILED',
    TRANSACTION_FAILED: 'TRANSACTION_FAILED'
} as const

// Define proper fallback state type
interface FallbackState {
    smartWalletPubkey: string | null
    isConnected: boolean
    isLoading: boolean
    isConnecting: boolean
    isSigning: boolean
    error: Error | null
    account: WalletAccount | null
}

interface WalletHookReturn {
    smartWalletPubkey: any | null
    isConnected: boolean
    isLoading: boolean
    isConnecting: boolean
    isSigning: boolean
    error: Error | null
    account: WalletAccount | null
    passkeyData: ConnectResponse | null
    connect: () => Promise<WalletAccount>
    createPasskeyOnly: () => Promise<ConnectResponse>
    createSmartWalletOnly: (passkeyData: ConnectResponse) => Promise<{ smartWalletAddress: string; account: WalletAccount }>
    reconnect: () => Promise<WalletAccount>
    disconnect: () => Promise<void>
    signTransaction: (transaction: any) => Promise<string>
    signAndSendTransaction: (transaction: any) => Promise<string>
}

export const useLazorKitWallet = (): WalletHookReturn => {
    const [isSDKAvailable, setIsSDKAvailable] = useState<boolean>(false)
    const [isInitializing, setIsInitializing] = useState<boolean>(true)
    const [initError, setInitError] = useState<Error | null>(null)
    const [passkeyData, setPasskeyData] = useState<ConnectResponse | null>(null)
    const [realWalletData, setRealWalletData] = useState<any>(null)

    // Fallback state with proper typing
    const [fallbackState, setFallbackState] = useState<FallbackState>({
        smartWalletPubkey: null,
        isConnected: false,
        isLoading: false,
        isConnecting: false,
        isSigning: false,
        error: null,
        account: null
    })

    // Initialize Lazorkit SDK
    useEffect(() => {
        const initLazorkit = async () => {
            try {
                setIsInitializing(true)
                console.log('🔧 Loading Lazorkit SDK...')

                // Try to import Lazorkit
                const lazorkitModule = await import('@lazorkit/wallet')
                console.log('✅ Lazorkit module loaded:', Object.keys(lazorkitModule))

                // Check if useWallet hook is available
                if (lazorkitModule.useWallet && typeof lazorkitModule.useWallet === 'function') {
                    console.log('✅ useWallet hook found, SDK is properly loaded')

                    // Try to use the hook and store its result
                    try {
                        const walletHookResult = lazorkitModule.useWallet()
                        setRealWalletData(walletHookResult)
                        setIsSDKAvailable(true)
                        setInitError(null)
                        console.log('✅ Real wallet hook initialized successfully')
                    } catch (hookError) {
                        console.error('❌ Error initializing wallet hook:', hookError)
                        setIsSDKAvailable(false)
                        setRealWalletData(null)
                    }
                } else {
                    throw new Error('useWallet hook not found in Lazorkit module')
                }

            } catch (error) {
                console.error('❌ Failed to load Lazorkit SDK:', error)
                console.log('🎭 Falling back to simulation mode')
                setInitError(error as Error)
                setIsSDKAvailable(false)
                setRealWalletData(null)
            } finally {
                setIsInitializing(false)
            }
        }

        initLazorkit()
    }, [])

    // Determine current state (real or fallback)
    const currentState = realWalletData || fallbackState

    // Real wallet functions with fallback
    const connect = useCallback(async (): Promise<WalletAccount> => {
        if (realWalletData?.connect) {
            console.log('🔗 Using real Lazorkit connect...')
            try {
                const result = await realWalletData.connect()
                console.log('✅ Real connection successful:', result)
                return result
            } catch (error) {
                console.error('❌ Real connection failed:', error)
                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating wallet connection...')
        setFallbackState(prev => ({ ...prev, isConnecting: true }))

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay

            const simulatedAccount: WalletAccount = {
                credentialId: `sim_cred_${Date.now()}`,
                passkeyPubkey: Array.from({ length: 32 }, () => Math.floor(Math.random() * 256)),
                smartWallet: `sim_wallet_${Math.random().toString(36).substr(2, 9)}`,
                smartWalletAuthenticator: `sim_auth_${Math.random().toString(36).substr(2, 9)}`,
                isConnected: true,
                timestamp: Date.now()
            }

            setFallbackState(prev => ({
                ...prev,
                account: simulatedAccount,
                smartWalletPubkey: simulatedAccount.smartWallet,
                isConnected: true,
                isConnecting: false
            }))

            console.log('✅ Simulated connection successful:', simulatedAccount)
            return simulatedAccount
        } catch (error) {
            setFallbackState(prev => ({ ...prev, isConnecting: false, error: error as Error }))
            throw error
        }
    }, [realWalletData])

    const createPasskeyOnly = useCallback(async (): Promise<ConnectResponse> => {
        if (realWalletData?.createPasskeyOnly) {
            console.log('🔐 Using real Lazorkit createPasskeyOnly...')
            try {
                const result = await realWalletData.createPasskeyOnly()
                console.log('✅ Real passkey creation successful:', result)
                setPasskeyData(result)
                return result
            } catch (error) {
                console.error('❌ Real passkey creation failed:', error)
                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating passkey creation...')
        setFallbackState(prev => ({ ...prev, isConnecting: true }))

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay

            const simulatedPasskey: ConnectResponse = {
                publicKey: btoa(Array.from({ length: 32 }, () => Math.floor(Math.random() * 256)).toString()),
                credentialId: `sim_passkey_${Date.now()}`,
                isCreated: true,
                connectionType: 'create',
                timestamp: Date.now()
            }

            setPasskeyData(simulatedPasskey)
            setFallbackState(prev => ({ ...prev, isConnecting: false }))

            console.log('✅ Simulated passkey created:', simulatedPasskey)
            return simulatedPasskey
        } catch (error) {
            setFallbackState(prev => ({ ...prev, isConnecting: false, error: error as Error }))
            throw error
        }
    }, [realWalletData])

    const createSmartWalletOnly = useCallback(async (passkeyData: ConnectResponse) => {
        if (realWalletData?.createSmartWalletOnly) {
            console.log('🏦 Using real Lazorkit createSmartWalletOnly...')
            try {
                const result = await realWalletData.createSmartWalletOnly(passkeyData)
                console.log('✅ Real smart wallet creation successful:', result)
                return result
            } catch (error) {
                console.error('❌ Real smart wallet creation failed:', error)
                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating smart wallet creation...')
        setFallbackState(prev => ({ ...prev, isConnecting: true }))

        try {
            await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate delay

            const smartWalletAddress = `sim_smart_${Math.random().toString(36).substr(2, 12)}`
            const account: WalletAccount = {
                credentialId: passkeyData.credentialId,
                passkeyPubkey: Array.from({ length: 32 }, () => Math.floor(Math.random() * 256)),
                smartWallet: smartWalletAddress,
                smartWalletAuthenticator: `sim_auth_${Math.random().toString(36).substr(2, 9)}`,
                isConnected: true,
                timestamp: Date.now()
            }

            const result = { smartWalletAddress, account }

            setFallbackState(prev => ({
                ...prev,
                account,
                smartWalletPubkey: smartWalletAddress,
                isConnected: true,
                isConnecting: false
            }))

            console.log('✅ Simulated smart wallet created:', result)
            return result
        } catch (error) {
            setFallbackState(prev => ({ ...prev, isConnecting: false, error: error as Error }))
            throw error
        }
    }, [realWalletData])

    const reconnect = useCallback(async (): Promise<WalletAccount> => {
        if (realWalletData?.reconnect) {
            console.log('🔄 Using real Lazorkit reconnect...')
            try {
                const result = await realWalletData.reconnect()
                console.log('✅ Real reconnection successful:', result)
                return result
            } catch (error: any) {
                console.error('❌ Real reconnection failed:', error)

                if (error.code === ErrorCode.NO_STORED_CREDENTIALS) {
                    console.log('ℹ️ No stored credentials found')
                } else if (error.code === ErrorCode.INVALID_CREDENTIALS) {
                    console.log('⚠️ Stored credentials are invalid')
                }

                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating reconnect...')
        const error: any = new Error('No stored credentials found')
        error.code = ErrorCode.NO_STORED_CREDENTIALS
        throw error
    }, [realWalletData])

    const disconnect = useCallback(async (): Promise<void> => {
        if (realWalletData?.disconnect) {
            console.log('🔌 Using real Lazorkit disconnect...')
            try {
                await realWalletData.disconnect()
                console.log('✅ Real disconnection successful')
                return
            } catch (error) {
                console.error('❌ Real disconnection failed:', error)
                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating disconnect...')
        setFallbackState(prev => ({
            ...prev,
            account: null,
            smartWalletPubkey: null,
            isConnected: false,
            error: null
        }))
        setPasskeyData(null)
    }, [realWalletData])

    const signTransaction = useCallback(async (transaction: any): Promise<string> => {
        if (realWalletData?.signTransaction) {
            console.log('✍️ Using real Lazorkit signTransaction...')
            try {
                const result = await realWalletData.signTransaction(transaction)
                console.log('✅ Real transaction signing successful:', result)
                return result
            } catch (error) {
                console.error('❌ Real transaction signing failed:', error)
                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating transaction signing...')
        setFallbackState(prev => ({ ...prev, isSigning: true }))

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const signature = `sim_signature_${Math.random().toString(36).substr(2, 20)}`
            setFallbackState(prev => ({ ...prev, isSigning: false }))
            return signature
        } catch (error) {
            setFallbackState(prev => ({ ...prev, isSigning: false, error: error as Error }))
            throw error
        }
    }, [realWalletData])

    const signAndSendTransaction = useCallback(async (transaction: any): Promise<string> => {
        if (realWalletData?.signAndSendTransaction) {
            console.log('📤 Using real Lazorkit signAndSendTransaction...')
            try {
                const result = await realWalletData.signAndSendTransaction(transaction)
                console.log('✅ Real transaction sent successfully:', result)
                return result
            } catch (error) {
                console.error('❌ Real transaction failed:', error)
                throw error
            }
        }

        // Fallback simulation
        console.log('🎭 Simulating transaction send...')
        setFallbackState(prev => ({ ...prev, isSigning: true }))

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const signature = `sim_tx_${Math.random().toString(36).substr(2, 20)}`
            setFallbackState(prev => ({ ...prev, isSigning: false }))
            return signature
        } catch (error) {
            setFallbackState(prev => ({ ...prev, isSigning: false, error: error as Error }))
            throw error
        }
    }, [realWalletData])

    // Log SDK status for debugging
    useEffect(() => {
        if (!isInitializing) {
            console.log('🔍 Wallet Hook Status:', {
                isSDKAvailable,
                hasRealData: !!realWalletData,
                initError: initError?.message,
                usingFallback: !realWalletData
            })
        }
    }, [isSDKAvailable, realWalletData, initError, isInitializing])

    return {
        // State - Use real data if available, fallback to simulation
        smartWalletPubkey: currentState.smartWalletPubkey,
        isConnected: currentState.isConnected,
        isLoading: isInitializing || currentState.isLoading,
        isConnecting: currentState.isConnecting,
        isSigning: currentState.isSigning,
        error: initError || currentState.error,
        account: currentState.account,
        passkeyData,

        // Actions
        connect,
        createPasskeyOnly,
        createSmartWalletOnly,
        reconnect,
        disconnect,
        signTransaction,
        signAndSendTransaction
    }
}