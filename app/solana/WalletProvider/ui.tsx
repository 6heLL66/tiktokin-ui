'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

export const WalletConnect = () => {
    const { publicKey } = useWallet();

    return (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {!publicKey && <WalletMultiButton style={{
                background: 'linear-gradient(to right, #8B5CF6, #3B82F6)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                height: '44px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
            }}> Connect Wallet </WalletMultiButton>}
           {publicKey && <WalletDisconnectButton style={{
                background: 'linear-gradient(to right, #F43F5E, #EC4899)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                height: '44px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
            }} />}
        </div>
    )
}