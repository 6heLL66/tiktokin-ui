import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useAnchor } from "./useAnchor";

interface TokenReserves {
  address: string;
  realSolReserves: BN;
  realTokenReserves: BN;
  virtualSolReserves: BN;
  virtualTokenReserves: BN;
  tokenTotalSupply: BN;
  isCompleted: boolean;
}

export const useMultipleTokenReserves = (tokenAddresses: string[]) => {
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

      const accountInfos = await tiktokinProgram.provider.connection.getMultipleAccountsInfo(curvePdas);
      
      const reservesData: TokenReserves[] = [];
      
      for (let i = 0; i < accountInfos.length; i++) {
        const accountInfo = accountInfos[i];
        if (accountInfo) {
          try {
            const decoded = tiktokinProgram.account.bondingCurve.coder.accounts.decode(
              "bondingCurve",
              accountInfo.data
            );
            
            reservesData.push({
              address: tokenAddresses[i],
              ...decoded
            });
          } catch (error) {
            console.error(`Failed to decode account ${tokenAddresses[i]}:`, error);
          }
        }
      }
      
      setReserves(reservesData);
    } catch (error) {
      console.error("Failed to fetch multiple reserves:", error);
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