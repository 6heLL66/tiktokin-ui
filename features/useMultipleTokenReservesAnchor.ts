import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useAnchor } from "./useAnchor";

interface TokenReserves {
  address: string;
  account: {
    realSolReserves: BN;
    realTokenReserves: BN;
    virtualSolReserves: BN;
    virtualTokenReserves: BN;
    tokenTotalSupply: BN;
    isCompleted: boolean;
  };
  publicKey: PublicKey;
}

export const useMultipleTokenReservesAnchor = (tokenAddresses: string[]) => {
  const { data: { tiktokinProgram } } = useAnchor();
  const [reserves, setReserves] = useState<TokenReserves[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMultipleReserves = async () => {
    if (!tiktokinProgram || !tokenAddresses.length) return;
    
    setLoading(true);
    
    try {
      const curvePdas = tokenAddresses.map(address => {
        const [curvePda] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("bonding-curve"),
            new PublicKey(address).toBuffer()
          ],
          tiktokinProgram.programId
        );
        return curvePda;
      });

      const accounts = await tiktokinProgram.account.bondingCurve.fetchMultiple(curvePdas);
      
      const reservesData: TokenReserves[] = [];
      
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        if (account) {
          reservesData.push({
            address: tokenAddresses[i],
            account,
            publicKey: curvePdas[i]
          });
        }
      }
      
      setReserves(reservesData);
    } catch (error) {
      console.error("Failed to fetch multiple reserves with Anchor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultipleReserves();
  }, [tiktokinProgram, tokenAddresses.join(',')]);

  return {
    reserves,
    loading,
    fetchMultipleReserves
  };
}; 