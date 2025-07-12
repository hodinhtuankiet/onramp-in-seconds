import React from "react"
import { Monitor, Activity, Wallet, DollarSign, CheckCircle2, XCircle, Loader2, User } from "lucide-react"

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

    const statusItems = [
        {
            icon: Activity,
            label: "System Status",
            value: isProcessing ? "Working..." : "Ready",
            description: isProcessing ? "Setting up your wallet" : "System is ready to use",
            color: isProcessing ? "text-yellow-400" : "text-green-400",
            bgColor: isProcessing ? "bg-yellow-500/10" : "bg-green-500/10",
            borderColor: isProcessing ? "border-yellow-500/20" : "border-green-500/20",
            statusIcon: isProcessing ? Loader2 : CheckCircle2,
            animate: isProcessing
        },
        {
            icon: User,
            label: "Your Account",
            value: isConnected ? "Ready to Use" : "Not Set Up",
            description: isConnected ? "Your digital wallet is active" : "No digital wallet yet",
            color: isConnected ? "text-green-400" : "text-gray-400",
            bgColor: isConnected ? "bg-green-500/10" : "bg-gray-500/10",
            borderColor: isConnected ? "border-green-500/20" : "border-gray-500/20",
            statusIcon: isConnected ? CheckCircle2 : XCircle,
            animate: false
        },
        {
            icon: DollarSign,
            label: "Purchase Amount",
            value: `$${usdcAmount || "0"}`,
            description: "Amount of digital money you want",
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            statusIcon: DollarSign,
            animate: false
        }
    ]

    const formatWalletAddress = (address: string) => {
        if (address.length <= 20) return address
        return `${address.slice(0, 8)}...${address.slice(-8)}`
    }

    return (
        <section className="py-6 sm:py-8 bg-gradient-to-b from-gray-800/20 to-gray-900/30 border-t border-gray-700/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-3 sm:px-6">
                <div className="bg-gray-900/60 border border-gray-700/30 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                        <h3 className="text-sm sm:text-base font-bold text-white">
                            System Status
                        </h3>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>

                    {/* Status Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {statusItems.map((item, index) => (
                            <div
                                key={index}
                                className={`${item.bgColor} border ${item.borderColor} rounded-xl p-3 sm:p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                        <span className="text-xs font-semibold text-gray-200">{item.label}</span>
                                    </div>
                                    <item.statusIcon
                                        className={`w-3 h-3 ${item.color} ${item.animate ? 'animate-spin' : ''}`}
                                    />
                                </div>
                                <div className={`text-sm font-bold ${item.color} mb-1`}>
                                    {item.value}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Your Digital Wallet Section */}
                    <div className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <Wallet className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-semibold text-gray-200">Your Digital Wallet</span>
                            {smartWalletPubkey && (
                                <div className="flex items-center space-x-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-green-400" />
                                    <span className="text-xs text-green-400 font-medium">Active</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700/30 rounded-lg p-2 sm:p-3">
                            {smartWalletPubkey ? (
                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="text-xs text-gray-400">Wallet ID:</div>
                                        <div className="font-mono text-xs text-blue-300 bg-gray-800/50 rounded px-2 py-1 break-all">
                                            {formatWalletAddress(smartWalletPubkey.toString())}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                            <span>Secured with Face ID</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                            <span>Ready for payments</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <XCircle className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                                    <div className="text-sm text-gray-400 font-medium">No Digital Wallet Yet</div>
                                    <div className="text-xs text-gray-500 mt-1">Click "Get Started" to create your wallet</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-700/30">
                        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                                <span>System Information</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                                <span>Live Status Updates</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}