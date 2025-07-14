import React from "react"
import { CheckCircle2, XCircle, DollarSign, Wallet, Sparkles } from "lucide-react"

interface DebugInfoProps {
    isProcessing: boolean
    isConnected: boolean
    usdcAmount: string
    smartWalletPubkey: any
}

export const DebugInfo: React.FC<DebugInfoProps> = ({
    isProcessing,
    isConnected,
    usdcAmount,
    smartWalletPubkey,
}) => {
    if (!import.meta.env.DEV) return null

    return (
        <section className="py-8 bg-gradient-to-b from-gray-900/30 to-gray-900/80 border-t border-gray-700/50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-gray-600/40 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">

                    {/* Beautiful Header */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                            <h3 className="text-xl font-bold text-white">
                                Your Status
                            </h3>
                            <Sparkles className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-sm text-gray-300">
                            Here's what's happening right now
                        </p>
                    </div>

                    {/* Enhanced Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                        {/* Account Status Card */}
                        <div className={`relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:scale-105 ${isConnected
                            ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 shadow-lg shadow-green-500/10'
                            : 'bg-gradient-to-br from-gray-700/40 to-gray-800/60 border border-gray-600/40 shadow-lg'
                            }`}>
                            {/* Subtle background pattern */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"></div>

                            <div className="relative flex items-center space-x-4">
                                <div className={`p-3 rounded-full ${isConnected
                                    ? 'bg-green-500/20 border border-green-400/30'
                                    : 'bg-gray-600/30 border border-gray-500/30'
                                    }`}>
                                    {isConnected ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-lg">
                                        {isConnected ? "Account Ready" : "Account Not Ready"}
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        {isConnected ? "You can buy digital money" : "Create account to start"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Amount Card */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-5 shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"></div>

                            <div className="relative flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-blue-500/20 border border-blue-400/30">
                                    <DollarSign className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-lg">
                                        ${usdcAmount || "0"} USD
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        Amount you want to buy
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Digital Wallet Section */}
                    {isConnected && smartWalletPubkey && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-500/15 to-emerald-600/10 border border-green-500/30 rounded-xl p-6 shadow-xl shadow-green-500/10 mb-6 transition-all duration-300 hover:shadow-green-500/20">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 animate-pulse"></div>

                            <div className="relative flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-green-500/20 border border-green-400/40">
                                    <Wallet className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-green-300 font-bold text-lg mb-2 flex items-center space-x-2">
                                        <span>🎉 Your Digital Wallet is Ready!</span>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="text-sm text-green-100/90 mb-4 leading-relaxed">
                                        Think of this like your digital bank account - it holds your digital money safely.
                                    </div>

                                    {/* Enhanced Wallet ID Display */}
                                    <div className="bg-gradient-to-r from-green-900/40 to-green-800/30 border border-green-500/30 rounded-lg p-4 mb-4">
                                        <div className="text-xs text-green-400 mb-2 font-medium">Your Wallet ID:</div>
                                        <div className="font-mono text-sm text-green-200 break-all bg-green-900/20 rounded p-2 border border-green-500/20">
                                            {smartWalletPubkey.toString().slice(0, 12)}...{smartWalletPubkey.toString().slice(-8)}
                                        </div>
                                    </div>

                                    {/* Enhanced Feature Pills */}
                                    <div className="flex flex-wrap gap-3">
                                        <div className="flex items-center space-x-2 bg-green-500/10 border border-green-400/20 rounded-full px-3 py-1.5">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-300 font-medium">Protected by Face ID</span>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-green-500/10 border border-green-400/20 rounded-full px-3 py-1.5">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-green-300 font-medium">Ready to receive money</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Beginner Section */}
                    {!isConnected && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/15 to-purple-600/10 border border-blue-500/30 rounded-xl p-6 shadow-xl shadow-blue-500/10 mb-6 transition-all duration-300 hover:shadow-blue-500/20">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse"></div>

                            <div className="relative text-center">
                                <div className="text-blue-300 font-bold text-lg mb-3 flex items-center justify-center space-x-2">
                                    <span>🚀 Getting Started is Easy!</span>
                                    <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                                </div>
                                <div className="text-sm text-blue-100/90 mb-4 leading-relaxed max-w-md mx-auto">
                                    We'll create a secure digital wallet for you - it's like opening a bank account but for digital money.
                                </div>

                                {/* Enhanced Feature Pills */}
                                <div className="flex flex-wrap justify-center gap-3">
                                    <div className="flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2">
                                        <span className="text-xs text-blue-300 font-medium">✨ No passwords to remember</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2">
                                        <span className="text-xs text-blue-300 font-medium">🔒 Secured with Face ID</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2">
                                        <span className="text-xs text-blue-300 font-medium">⚡ Ready in seconds</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Processing Indicator */}
                    {isProcessing && (
                        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500/15 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 shadow-xl shadow-yellow-500/10 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-500/5 animate-pulse"></div>

                            <div className="relative flex items-center justify-center space-x-4">
                                <div className="flex space-x-1.5">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
                                </div>
                                <div className="text-yellow-300 font-semibold text-lg">
                                    Setting up your account...
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}