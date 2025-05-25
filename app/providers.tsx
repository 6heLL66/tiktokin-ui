'use client'

import { WalletProvider } from "./solana/WalletProvider/provider"

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <WalletProvider>{children}</WalletProvider>
}
