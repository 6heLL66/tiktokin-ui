import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useAnchor } from "./useAnchor";

export function useAnchorBatch<T = any>(
  accountType: string,
  addresses: PublicKey[],
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  }
) {
  const { data: { tiktokinProgram } } = useAnchor();
  const [data, setData] = useState<(T | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async () => {
    if (!tiktokinProgram || !addresses.length || options?.enabled === false) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const accountsData = await (tiktokinProgram.account as any)[accountType].fetchMultiple(addresses);
      setData(accountsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch accounts'));
      console.error(`Failed to fetch ${accountType} accounts:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
    
    let interval: NodeJS.Timeout | undefined;
    if (options?.refetchInterval) {
      interval = setInterval(fetchAccounts, options.refetchInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tiktokinProgram, addresses.map(a => a.toString()).join(','), options?.enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchAccounts
  };
}

export function useAnchorBatchNullable<T = any>(
  accountType: string,
  addresses: (PublicKey | null)[],
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  }
) {
  const validAddresses = addresses.filter((addr): addr is PublicKey => addr !== null);
  
  return useAnchorBatch<T>(accountType, validAddresses, options);
} 