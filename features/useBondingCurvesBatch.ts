import { PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import { useAnchor } from "./useAnchor";
import { useAnchorBatch } from "./useAnchorBatch";
import { BN } from "@coral-xyz/anchor";

interface BondingCurveAccount {
  realSolReserves: BN;
  realTokenReserves: BN;
  virtualSolReserves: BN;
  virtualTokenReserves: BN;
  tokenTotalSupply: BN;
  isCompleted: boolean;
}

export function useBondingCurvesBatch(tokenAddresses: string[]) {
  const { data: { tiktokinProgram } } = useAnchor();

  const curvePdas = useMemo(() => {
    if (!tiktokinProgram || !tokenAddresses.length) return [];
    
    return tokenAddresses.map(address => {
      const [curvePda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("bonding-curve"),
          new PublicKey(address).toBuffer()
        ],
        tiktokinProgram.programId
      );
      return curvePda;
    });
  }, [tiktokinProgram, tokenAddresses.join(',')]);

  const { data, loading, error, refetch } = useAnchorBatch<BondingCurveAccount>(
    'bondingCurve',
    curvePdas
  );

  const processedData = useMemo(() => {
    return data.map((account, index) => ({
      address: tokenAddresses[index],
      account,
      publicKey: curvePdas[index]
    })).filter(item => item.account !== null);
  }, [data, tokenAddresses, curvePdas]);

  return {
    curves: processedData,
    loading,
    error,
    refetch
  };
}

export function useBondingCurvesBatchWithPrices(tokenAddresses: string[], solPrice: number) {
  const { curves, loading, error, refetch } = useBondingCurvesBatch(tokenAddresses);

  const curvesWithPrices = useMemo(() => {
    return curves.map(curve => {
      if (!curve.account) return curve;

      const price = curve.account.virtualSolReserves.toNumber() / 
                   curve.account.realTokenReserves.toNumber() * solPrice;
      
      const marketCap = price * curve.account.realTokenReserves.toNumber() / 1e9;

      return {
        ...curve,
        price,
        marketCap
      };
    });
  }, [curves, solPrice]);

  return {
    curves: curvesWithPrices,
    loading,
    error,
    refetch
  };
} 