import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

export interface TokenInfo {
  decimals: number
  balance: number
  address: string
}

export const useToken = (mintAddress?: string) => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenInfo = async () => {
    if (!mintAddress || !publicKey) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const mint = new PublicKey(mintAddress)
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint }
      )

      const balance = tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0

      const mintInfo = await connection.getParsedAccountInfo(mint)
      const decimals = (mintInfo.value?.data as any)?.parsed?.info?.decimals || 0
      
      setTokenInfo({
        decimals,
        balance,
        address: mintAddress
      })

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token info')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenInfo()
  }, [connection, mintAddress, publicKey])

  return { tokenInfo, isLoading, error, fetchTokenInfo }
}
