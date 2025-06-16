import React, { useMemo } from 'react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { ConnectionProvider, WalletProvider as WalletProviderBase } from '@solana/wallet-adapter-react';
import { network } from '@/shared/constants';

export const WalletProvider = ({children}: {children: React.ReactNode}) => {
    const endpoint = useMemo(() => network, [network]);

    const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProviderBase wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProviderBase>
        </ConnectionProvider>
    );
};