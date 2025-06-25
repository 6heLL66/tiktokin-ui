import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useRef, useState } from "react";
import BigNumber from "bignumber.js";
import { useAnchor } from "./useAnchor";
import useSolPrice from "./useSolPrice";
import { groupSnapshotsByInterval } from "@/shared/utils";
import { useChartSettings } from "./useChartInterval";

export const useTokenReserves = (tokenAddress?: string) => {
  const { data: {tiktokinProgram} } = useAnchor();
  const [chartSnapshots, setChartSnapshots] = useState<{price: number, created_at: string}[]>([]);
  const { chartInterval, setChartInterval } = useChartSettings();

  const isMounted = useRef(false);

  const { price: solPrice } = useSolPrice();

  const [reserves, setReserves] = useState<{
    realSolReserves: BN;
    realTokenReserves: BN;
    virtualSolReserves: BN;
    virtualTokenReserves: BN;
    tokenTotalSupply: BN;
    isCompleted: boolean;
  }>();
  const subscribtion = useRef<any>(null);
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

  const subscribeToCurve = async () => {
    if (!tiktokinProgram || !tokenAddress) return;

    const [curvePda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("bonding-curve"),
        new PublicKey(tokenAddress).toBuffer()
      ],
      tiktokinProgram.programId
    );

    subscribtion.current = await tiktokinProgram.provider.connection.onAccountChange(curvePda, (account) => {
      const decoded = tiktokinProgram.account.bondingCurve.coder.accounts.decode(
        "bondingCurve",
        account.data
      );

      setReserves(decoded)
    });
  }

  const price = useMemo(() => {
    if (!reserves) return 0;
    return new BigNumber(reserves.virtualSolReserves.toString()).div(reserves.realTokenReserves.toString()).multipliedBy(new BigNumber(solPrice)).toNumber();
  }, [reserves, solPrice]);

  const marketCap = useMemo(() => {
    if (!reserves) return 0;
    return new BigNumber(price).multipliedBy(new BigNumber(reserves.realTokenReserves)).dividedBy(new BigNumber(LAMPORTS_PER_SOL)).toNumber();
  }, [reserves, price]);

  useEffect(() => {
    if (!price) return;

    setChartSnapshots(prev => [...prev, {
      price: new BigNumber(price).dividedBy(solPrice).toNumber(),
      created_at: new Date().toISOString()
    }])
  }, [reserves])

  useEffect(() => {
    if (!tokenAddress) return;
    fetchReserves();
    subscribeToCurve();

    return () => {
      if (subscribtion.current) {
        tiktokinProgram.provider.connection.removeAccountChangeListener(subscribtion.current);
      }
    }
  }, [tiktokinProgram, tokenAddress]);

  return {
    reserves,
    price,
    marketCap,
    fetchReserves,
    chartInterval,
    setChartInterval,
    chartRealTimeData: groupSnapshotsByInterval(chartSnapshots, chartInterval)
  };
}
