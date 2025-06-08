import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const useBalance = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(new BN(0));
  const {connection} = useConnection();

  const updateBalance = async () => {
    if (!publicKey || !connection) {
      setBalance(new BN(0));
      return
    };
    const balance = await connection.getBalance(publicKey);
    
    const balanceBN = new BigNumber(balance).div(new BigNumber(LAMPORTS_PER_SOL));
    
    setBalance(balanceBN);
  }

   useEffect(() => {
    updateBalance();
  }, [publicKey, connection]);

  return {balance, updateBalance};
};

