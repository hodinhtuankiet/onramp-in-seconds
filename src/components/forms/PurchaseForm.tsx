import React from "react"
import { Wallet, ArrowRight, Fingerprint, QrCode } from "lucide-react"

interface PurchaseFormProps {
    usdcAmount: string
    setUsdcAmount: (amount: string) => void
    error: string | null
    walletError: any
    isProcessing: boolean
    onBuyUSDC: () => void
    onQuickAmount: (amount: number) => void
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
    usdcAmount,
    setUsdcAmount,
    error,
    walletError,
    isProcessing,
    onBuyUSDC,
    onQuickAmount,
}) => {
    const quickAmounts = [25, 50, 100, 500]

    return (
        <div className="relative bg-gray-900/90 border border-gray-700/50 rounded-xl p-3 sm:p-4 md:p-6 backdrop-blur-xl shadow-2xl">
            <div className="space-y-3 sm:space-y-4">
                {/* Header - Responsive */}
                <div className="text-center">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Get Started</h2>
                    <div className="text-xs text-gray-400 mt-1 hidden sm:block">Create your digital wallet in 30 seconds</div>
                </div>

                {/* Error Message - Responsive */}
                {(error || walletError) && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 sm:p-3 text-red-400 text-xs">
                        <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                            <span className="text-xs sm:text-sm">{error || walletError?.message}</span>
                        </div>
                    </div>
                )}

                <div className="space-y-2.5 sm:space-y-3">
                    {/* USDC Amount Input - Fixed Responsive */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 sm:mb-2">
                            How much digital money do you want?
                        </label>
                        <div className="bg-black/50 border border-gray-600/50 rounded-lg p-2.5 sm:p-3 hover:border-gray-500/50 transition-colors">
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Dollar sign - Responsive */}
                                <span className="text-gray-400 text-base sm:text-lg font-bold flex-shrink-0">$</span>

                                {/* Input field - Responsive */}
                                <input
                                    type="number"
                                    placeholder="100"
                                    value={usdcAmount}
                                    onChange={(e) => setUsdcAmount(e.target.value)}
                                    className="bg-transparent text-base sm:text-lg font-bold text-white outline-none flex-1 placeholder-gray-500 min-w-0"
                                    disabled={isProcessing}
                                    inputMode="decimal"
                                />

                                {/* USDC Badge - Mobile Responsive */}
                                <div className="flex items-center space-x-1 sm:space-x-1.5 bg-blue-900/50 border border-blue-500/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex-shrink-0">
                                    <img
                                        src="/usdc.png"
                                        alt="USD"
                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const span = target.nextElementSibling as HTMLElement;
                                            if (span) span.textContent = '💵';
                                        }}
                                    />
                                    <span className="text-sm hidden">💵</span>
                                    <span className="font-semibold text-blue-300 text-xs whitespace-nowrap">USDC</span>
                                </div>
                            </div>
                        </div>
                        {/* Description - Mobile Responsive */}
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            1 USDC = $1 USD <span className="hidden sm:inline">(it's digital dollars that work like cash)</span>
                        </p>
                    </div>

                    {/* Quick Amount Buttons - Responsive Grid */}
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                        {quickAmounts.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => onQuickAmount(amount)}
                                disabled={isProcessing}
                                className="bg-gray-800/60 hover:bg-gray-700/80 border border-gray-600/50 hover:border-gray-500/50 text-white py-1.5 sm:py-2 px-1 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    {/* Buy Button - Mobile Responsive */}
                    <button
                        onClick={onBuyUSDC}
                        disabled={isProcessing || !usdcAmount}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                                <span className="text-xs sm:text-sm">Processing...</span>
                            </>
                        ) : (
                            <>
                                <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-sm">
                                    Buy ${usdcAmount || "0"} <span className="hidden sm:inline">USDC</span>
                                </span>
                                <ArrowRight className="w-3 h-3" />
                            </>
                        )}
                    </button>

                    {/* Why Choose Us - Mobile Responsive */}
                    <div className="text-center space-y-1 pt-1 sm:pt-2">
                        <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                                <Fingerprint className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                                <span className="text-xs">No Passwords</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center space-x-1">
                                <QrCode className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />
                                <span className="text-xs">Instant Setup</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed px-2 sm:px-0">
                            <span className="sm:hidden">Your first crypto wallet • Made simple</span>
                            <span className="hidden sm:inline">Just use your face to login • No complicated passwords</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}