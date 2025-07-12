import React from 'react'
import { LazorkitProvider } from '@lazorkit/wallet'

interface LazorkitWrapperProps {
  children: React.ReactNode
}

export const LazorkitWrapper: React.FC<LazorkitWrapperProps> = ({ children }) => {
  return (
    <LazorkitProvider
      rpcUrl={import.meta.env.VITE_LAZORKIT_RPC_URL || 'https://api.devnet.solana.com'}
      ipfsUrl={import.meta.env.VITE_LAZORKIT_PORTAL_URL || 'https://portal.lazor.sh'}
      paymasterUrl={import.meta.env.VITE_LAZORKIT_PAYMASTER_URL || 'https://lazorkit-paymaster.onrender.com'}
    >
      {children}
    </LazorkitProvider>
  )
}

export default LazorkitWrapper