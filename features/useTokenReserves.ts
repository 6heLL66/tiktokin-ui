import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useAnchor } from "./useAnchor";

export const useTokenReserves = (tokenAddress?: string) => {
  const { data: {tiktokinProgram} } = useAnchor();

  const [reserves, setReserves] = useState<{
    realSolReserves: BN;
    realTokenReserves: BN;
    virtualSolReserves: BN;
    virtualTokenReserves: BN;
    tokenTotalSupply: BN;
    isCompleted: boolean;
  }>();

  const fetchReserves = async () => {
    if (!tiktokinProgram || !tokenAddress) return;
    
    const [curvePda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("bonding-curve"),
        new PublicKey(tokenAddress).toBuffer()
      ],
      tiktokinProgram.programId
    );

    const reserves = await tiktokinProgram.account.bondingCurve.fetch(curvePda);
    
    setReserves(reserves);
  }

  useEffect(() => {
    if (!tokenAddress) return;
    fetchReserves();
  }, [tiktokinProgram, tokenAddress]);

  return {
    reserves,
    fetchReserves
  };
}
