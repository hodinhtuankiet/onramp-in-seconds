import React, { useState, useEffect } from 'react'
import { LandingPage } from './components'
import { LazorkitWrapper } from './providers'
import type { UserData } from './types/user'
import './App.css'

export default function App() {
    const [user, setUser] = useState<UserData | null>(null)

    useEffect(() => {
        const savedUser = localStorage.getItem('lazorkit_user')
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser)
                setUser(userData)
            } catch (error) {
                console.error('Error loading saved user:', error)
                localStorage.removeItem('lazorkit_user')
            }
        }
    }, [])

    const handleWalletConnected = (userData: UserData) => {
        console.log('✅ Wallet created successfully:', userData)
        setUser(userData)
        localStorage.setItem('lazorkit_user', JSON.stringify(userData))
        console.log(`🎉 USDC purchase completed for wallet: ${userData.publicKey.slice(0, 8)}...`)
    }

    return (
        <LazorkitWrapper>
            <div className="App">
                <LandingPage onWalletConnected={handleWalletConnected} />
            </div>
        </LazorkitWrapper>
    )
}