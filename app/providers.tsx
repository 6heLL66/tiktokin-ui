'use client'

import { OpenAPI } from "@/shared/api/tiktokin.ts";
import { WalletProvider } from "./solana/WalletProvider/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        },
    },
});

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <QueryClientProvider client={queryClient}>
        <WalletProvider>{children}</WalletProvider>
    </QueryClientProvider>
}
