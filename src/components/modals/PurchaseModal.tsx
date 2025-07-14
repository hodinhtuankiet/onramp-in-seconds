import React, { useState, useEffect } from "react"
import {
  X,
  Fingerprint,
  Loader2,
  DollarSign,
  Clock,
  CheckCircle,
  Shield
} from "lucide-react"
import { useWallet } from '@lazorkit/wallet'

interface UserData {
  username: string
  publicKey: string
  account: any
  authenticationType: string
  balance: number
}

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  onComplete: (userData: UserData) => void
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  amount,
  onComplete,
}) => {
  const [step, setStep] = useState<"passkey" | "qr" | "confirming" | "success">("passkey")
  const [countdown, setCountdown] = useState<number>(5)
  const [passkeyProgress, setPasskeyProgress] = useState<number>(0)
  const [passkeyData, setPasskeyData] = useState<any>(null)
  const [smartWalletData, setSmartWalletData] = useState<any>(null)
  const [isCreatingPasskey, setIsCreatingPasskey] = useState<boolean>(false)
  const [isCreatingWallet, setIsCreatingWallet] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  // Use Lazorkit's useWallet hook directly
  let walletHook: any = null
  let hasWalletError = false

  try {
    walletHook = useWallet()
  } catch (error) {
    hasWalletError = true
  }

  // Extract methods from wallet hook
  const createPasskeyOnly = walletHook?.createPasskeyOnly
  const createSmartWalletOnly = walletHook?.createSmartWalletOnly
  const disconnect = walletHook?.disconnect

  const handleClose = async () => {
    if ((isCreatingPasskey || isCreatingWallet) && (step === "passkey" || step === "confirming")) {
      try {
        if (disconnect) await disconnect()
      } catch (error) {
        // Silent disconnect
      }
    }
    setIsCreatingPasskey(false)
    setIsCreatingWallet(false)
    setError("")
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setStep("passkey")
      setCountdown(5)
      setPasskeyProgress(0)
      setPasskeyData(null)
      setSmartWalletData(null)
      setIsCreatingPasskey(false)
      setIsCreatingWallet(false)
      setError("")
      return
    }

    startPasskeyCreation()
  }, [isOpen])

  const startPasskeyCreation = async () => {
    if (hasWalletError) {
      setError('Lazorkit SDK not available')
      return
    }

    setIsCreatingPasskey(true)
    setError("")

    try {
      await createPasskeyStep()
      proceedToQRCode()
    } catch (error: any) {
      setError(error.message || 'Passkey creation failed')
      setIsCreatingPasskey(false)
    }
  }

  const createPasskeyStep = async () => {
    setStep("passkey")
    setPasskeyProgress(0)
    setError("")

    if (!createPasskeyOnly) {
      throw new Error('createPasskeyOnly method not found')
    }

    const progressInterval = setInterval(() => {
      setPasskeyProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 15
      })
    }, 300)

    try {
      const passkeyResponse = await createPasskeyOnly()
      console.log("Passkey created 2:", passkeyResponse)
      clearInterval(progressInterval)
      setPasskeyProgress(100)

      setPasskeyData(passkeyResponse)
      await new Promise(resolve => setTimeout(resolve, 1500))
    } catch (error: any) {
      clearInterval(progressInterval)
      throw new Error(`Passkey creation failed: ${error.message}`)
    }
  }

  const proceedToQRCode = () => {
    setIsCreatingPasskey(false)
    setStep("qr")

    // ❌ Remove setTimeout call to createSmartWalletAfterPayment
    // Auto-proceed to payment confirmation after 3 seconds
    setTimeout(() => {
      setStep("confirming")
      setCountdown(8)
    }, 8000)
  }

  // ✅ Update the useEffect to handle the timing better
  useEffect(() => {
    if (step === "confirming" && passkeyData && !isCreatingWallet && !smartWalletData && !error) {
      // Add small delay to ensure step transition is complete
      const timer = setTimeout(() => {
        createSmartWalletAfterPayment()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [step, passkeyData, isCreatingWallet, smartWalletData, error])

  const createSmartWalletAfterPayment = async () => {
    console.log('createSmartWalletAfterPayment called, passkeyData:', passkeyData)

    if (!passkeyData) {
      setError('No passkey data available')
      return
    }

    setIsCreatingWallet(true)

    try {
      if (!createSmartWalletOnly) {
        throw new Error('createSmartWalletOnly method not found')
      }
      // ✅ Pass only publicKey as parameter
      const smartWalletResult = await createSmartWalletOnly(passkeyData)
      console.log("data smart wallet ", smartWalletResult)
      setSmartWalletData(smartWalletResult)
      setIsCreatingWallet(false)

    } catch (error: any) {
      setError(`Smart wallet creation failed: ${error.message}`)
      setIsCreatingWallet(false)
    }
  }

  // Handle smart wallet creation when step changes to confirming
  useEffect(() => {
    if (step === "confirming" && passkeyData && !isCreatingWallet && !smartWalletData && !error) {
      createSmartWalletAfterPayment()
    }
  }, [step, passkeyData, isCreatingWallet, smartWalletData, error])

  useEffect(() => {
    if (step === "confirming" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (step === "confirming" && countdown === 0) {
      if (smartWalletData) {
        setStep("success")
        setTimeout(() => {
          const finalWalletAddress = smartWalletData?.smartWalletAddress ||
            smartWalletData?.address ||
            smartWalletData?.walletAddress ||
            smartWalletData?.account?.smartWallet

          const userData: UserData = {
            username: `User_${Math.random().toString(36).substr(2, 6)}`,
            publicKey: finalWalletAddress,
            account: {
              username: "lazorkit_user",
              smartWallet: finalWalletAddress,
              credentialId: passkeyData?.credentialId,
              authenticationType: "passkey",
              passkeyPublicKey: passkeyData?.publickey || passkeyData?.publicKey,
              smartWalletData: smartWalletData
            },
            authenticationType: "passkey",
            balance: Number.parseFloat(amount) || 0,
          }

          onComplete(userData)
        }, 3000)
      }
    }
  }, [step, countdown, amount, onComplete, passkeyData, smartWalletData, isCreatingWallet, error])

  if (!isOpen) return null

  const getStepTitle = () => {
    switch (step) {
      case "passkey": return "Creating Your Passkey"
      case "qr": return "Scan to Pay"
      case "confirming": return "Processing Payment"
      case "success": return "Payment Successful"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md mx-auto shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">{getStepTitle()}</h3>
          {(step !== "confirming" && step !== "success") && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {/* Display SDK error if available */}
          {hasWalletError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <div className="text-sm text-red-400 text-center">
                ❌ Lazorkit SDK not available
              </div>
            </div>
          )}

          {step === "passkey" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full flex items-center justify-center border border-blue-500/30 relative">
                <Fingerprint className="w-8 h-8 text-blue-400 animate-pulse" />
                <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700" />
                  <circle
                    cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-blue-400 transition-all duration-300"
                    strokeDasharray={`${passkeyProgress * 1.76} 176`}
                  />
                </svg>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Creating Your Passkey</h4>
                <p className="text-gray-400 text-sm">
                  Setting up secure Face ID authentication with Lazorkit
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-blue-400 text-sm font-medium">
                      Creating secure passkey...
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${passkeyProgress > 20 ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
                      <span className="text-blue-300">Generating cryptographic keys</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${passkeyProgress > 50 ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
                      <span className="text-green-300">Setting up biometric authentication</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${passkeyProgress > 80 ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`}></div>
                      <span className="text-purple-300">Securing your digital identity</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${passkeyProgress}%` }}
                    ></div>
                  </div>

                  <div className="text-center text-xs text-gray-400">
                    {passkeyProgress}% Complete
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="text-xs text-red-400 text-center">
                    ❌ {error}
                  </div>
                </div>
              )}

              <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
                <div className="text-xs text-gray-400 space-y-1">
                  <div className="font-medium text-gray-300 flex items-center justify-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Powered by Lazorkit</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "qr" && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Scan QR to Pay</h4>
                <p className="text-gray-400 text-sm">
                  Use your banking app to scan and pay <span className="text-blue-400 font-semibold">${amount} USD</span>
                </p>
              </div>

              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="w-48 h-48 bg-white rounded-xl relative overflow-hidden border border-gray-200">
                    <img
                      src="/QR.png"
                      alt="Payment QR Code"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const fallback = target.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />

                    <div className="absolute inset-0 p-3 hidden items-center justify-center bg-white">
                      <div className="w-full h-full relative">
                        <div className="grid grid-cols-21 grid-rows-21 gap-0 w-full h-full">
                          {Array.from({ length: 441 }, (_, i) => {
                            const row = Math.floor(i / 21)
                            const col = i % 21
                            const isTopLeft = row < 7 && col < 7
                            const isTopRight = row < 7 && col > 13
                            const isBottomLeft = row > 13 && col < 7
                            const isData = (row + col + Math.sin(row * 0.5) * Math.cos(col * 0.7)) % 2.1 > 1.0
                            const isTimingH = row === 6 && col % 2 === 0
                            const isTimingV = col === 6 && row % 2 === 0
                            const shouldFill = isTopLeft || isTopRight || isBottomLeft || isData || isTimingH || isTimingV

                            return (
                              <div
                                key={i}
                                className={`aspect-square ${shouldFill ? 'bg-black' : 'bg-white'}`}
                              />
                            )
                          })}
                        </div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-md flex items-center justify-center border-2 border-black">
                          <DollarSign className="w-5 h-5 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-blue-300">${amount} USD</span>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-4">
                <p className="text-gray-300 text-sm">
                  Open your banking app and scan this QR code to complete the payment
                </p>
              </div>
            </div>
          )}

          {step === "confirming" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 relative">
                <Clock className="w-8 h-8 text-blue-400" />
                <div className="absolute inset-0 border-2 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Processing Payment</h4>
                <p className="text-gray-400 text-sm">Confirming your ${amount} USD payment...</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
                <div className="relative">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <div className="text-sm text-blue-300 font-medium">
                    {isCreatingWallet ? "Creating your smart wallet..." : "Processing transaction..."}
                  </div>
                  <div className="mt-3 w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full animate-pulse"></div>
                  </div>

                  {/* Smart wallet creation status */}
                  {isCreatingWallet && (
                    <div className="mt-3 text-xs text-purple-300">
                      🏦 Deploying your wallet on Solana blockchain...
                    </div>
                  )}
                  {/* 
                  {smartWalletData && (
                    <div className="mt-3 text-xs text-green-300">
                      ✅ Smart wallet ready
                    </div>
                  )} */}

                  {/* Error display */}
                  {error && (
                    <div className="mt-3 text-xs text-red-300">
                      ❌ {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-green-400">Payment Confirmed! 🎉</h4>
                <p className="text-gray-400 text-sm">Your ${amount} USDC has been successfully purchased</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-green-300 text-sm space-y-1">
                  <div><span className="font-semibold">Amount:</span> ${amount} USDC</div>
                  <div><span className="font-semibold">Status:</span> Confirmed</div>
                  {smartWalletData && (
                    <div><span className="font-semibold">Wallet:</span> Created</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                <span className="text-green-400 text-sm">Setting up your dashboard...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}