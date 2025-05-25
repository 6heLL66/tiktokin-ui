'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

export const WalletConnect = () => {
    const { publicKey } = useWallet();

    return (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {!publicKey && <WalletMultiButton style={{
                background: '#121212',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                height: '44px',
                transition: 'all 0.3s ease',
                border: '1px solid #2D2D2D',
                cursor: 'pointer'
            }}> Connect Wallet </WalletMultiButton>}
           {publicKey && <WalletDisconnectButton style={{
                background: '#121212',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                height: '44px',
                transition: 'all 0.3s ease',
                border: '1px solid #2D2D2D',
                cursor: 'pointer'
            }}>
                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
            </WalletDisconnectButton>}
        </div>
    )
}