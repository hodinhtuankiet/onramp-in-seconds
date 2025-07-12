import React, { useState, useEffect } from "react"
import { useLazorKitWallet } from "../../hooks"
import { Navigation, FeaturePills, PurchaseForm, PurchaseModal, DebugInfo } from "../"

interface UserData {
  username: string
  publicKey: string
  account: any
  authenticationType: string
  balance: number
}

interface LandingPageProps {
  onWalletConnected: (userData: UserData) => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onWalletConnected }) => {
  const [usdcAmount, setUsdcAmount] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  const {
    smartWalletPubkey,
    isConnected,
    isConnecting,
    isLoading,
    error: walletError,
    account,
    reconnect
  } = useLazorKitWallet()

  // Try to reconnect on app load
  useEffect(() => {
    const tryReconnect = async () => {
      try {
        console.log('🔄 Attempting to reconnect with stored credentials...')
        const reconnectedAccount = await reconnect()
        console.log('✅ Reconnected successfully:', reconnectedAccount)

        // Convert to UserData format
        const userData: UserData = {
          username: reconnectedAccount.credentialId || `User_${Math.random().toString(36).substr(2, 6)}`,
          publicKey: reconnectedAccount.smartWallet,
          account: reconnectedAccount,
          authenticationType: "passkey",
          balance: 0, // Will be updated when user makes purchases
        }

        setCurrentUser(userData)
        onWalletConnected(userData)
      } catch (error: any) {
        console.log('ℹ️ No existing wallet connection found')
        if (error.message?.includes('NO_STORED_CREDENTIALS')) {
          console.log('👋 First time user - wallet will be created on purchase')
        }
      }
    }

    tryReconnect()
  }, [])

  const handleBuyUSDC = async () => {
    if (!usdcAmount || Number.parseFloat(usdcAmount) <= 0) {
      setError("Please enter a valid amount")
      return
    }
    setError("")
    console.log('🚀 Starting Buy USDC process with Lazorkit integration...')
    setShowPurchaseModal(true)
  }

  const handlePurchaseComplete = (userData: UserData) => {
    setShowPurchaseModal(false)
    setCurrentUser(userData)
    onWalletConnected(userData)

    console.log('🎉 Purchase completed successfully!')
    console.log('✅ Wallet created with Lazorkit SDK')
    console.log('🔐 Passkey authentication enabled')
    console.log('🏦 Smart wallet deployed on Solana blockchain')
    console.log(`💰 ${userData.balance} USDC purchased`)
    console.log(`📱 Wallet address: ${userData.publicKey}`)
  }

  const handleQuickAmount = (quickAmount: number) => {
    setUsdcAmount(quickAmount.toString())
    setError("")
  }

  const isProcessing = isConnecting || isLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <Navigation
        isConnected={isConnected || !!currentUser}
        balance={currentUser?.balance}
        username={currentUser?.username}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12 lg:py-16">
          <div className="text-center mb-6 sm:mb-12">
            <div className="space-y-3 sm:space-y-6 mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="block text-white">Buy USDC</span>
                <span className="text-blue-400 block text-2xl sm:text-4xl lg:text-5xl xl:text-6xl mt-1 sm:mt-2">
                  Instantly & Secure
                </span>
              </h1>
            </div>

            <FeaturePills />
          </div>

          {/* Purchase Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl"></div>
                <PurchaseForm
                  usdcAmount={usdcAmount}
                  setUsdcAmount={setUsdcAmount}
                  error={error}
                  walletError={walletError}
                  isProcessing={isProcessing}
                  onBuyUSDC={handleBuyUSDC}
                  onQuickAmount={handleQuickAmount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Modal with Lazorkit Integration */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        amount={usdcAmount}
        onComplete={handlePurchaseComplete}
      />

      {/* Debug Info */}
      <DebugInfo
        isProcessing={isProcessing}
        isConnected={isConnected || !!currentUser}
        usdcAmount={usdcAmount}
        smartWalletPubkey={smartWalletPubkey}
      />
    </div>
  )
}

export default LandingPage