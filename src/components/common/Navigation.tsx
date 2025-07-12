import React from "react"
import { Zap, CheckCircle, Wallet } from "lucide-react"

interface NavigationProps {
  isConnected: boolean
  balance?: number
  username?: string
}

export const Navigation: React.FC<NavigationProps> = ({ isConnected, balance, username }) => {
  return (
    <nav className="border-b border-gray-800/50 bg-black/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-base sm:text-xl font-bold text-white">Lazian</div>
              <div className="text-xs text-gray-400 hidden sm:block">Your First Crypto Experience</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            {/* Balance Display - Desktop */}
            {isConnected && balance !== undefined && balance > 0 ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                  <Wallet className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-sm text-blue-300 font-semibold">${balance.toFixed(2)} USDC</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Wallet Ready</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                Powered by <span className="text-blue-400 font-semibold">Lazorkit & Gaian</span>
              </div>
            )}

            {/* Simple Ready Status when no balance */}
            {isConnected && (balance === undefined || balance === 0) && (
              <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Ready</span>
              </div>
            )}
          </div>

          {/* Mobile Status */}
          <div className="flex sm:hidden items-center space-x-2">
            {/* Mobile Balance */}
            {isConnected && balance !== undefined && balance > 0 ? (
              <>
                <div className="flex items-center space-x-1 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                  <Wallet className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-300 font-semibold">${balance.toFixed(0)}</span>
                </div>
                <div className="flex items-center space-x-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">✓</span>
                </div>
              </>
            ) : isConnected ? (
              <div className="flex items-center space-x-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">✓</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}