import { BN } from "@coral-xyz/anchor";
import numeral from "numeral";
import { Cluster, Raydium } from "@raydium-io/raydium-sdk-v2";
import { TokenSnapshotDto } from "./api/tiktokin.ts/models/TokenSnapshotDto";
import { Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

export const solExchangeToTokenBuy = (solReserve: BN, tokenReserve: BN, amount: BN) => {
    console.log(amount.toString(), solReserve.toString(), tokenReserve.toString())
    return amount.mul(tokenReserve).div(solReserve.add(amount));
}

export const tokenExchangeToSolBuy = (solReserve: BN, tokenReserve: BN, amount: BN) => {
    return amount.mul(solReserve).div(tokenReserve.add(amount));
}

export const getMinAmountOut = (amount: BN, slippage: BN, fee: BN) => {
    // Apply fee: amount * (1 - fee/100) where fee is in percentage
    const feeMultiplier = new BN(100).sub(fee);
    const amountAfterFee = amount.mul(feeMultiplier).divRound(new BN(100));
    
    // Apply slippage: amountAfterFee * (1 - slippage/100) where slippage is in percentage
    const slippageMultiplier = new BN(100).sub(slippage);
    const minAmountOut = amountAfterFee.mul(slippageMultiplier).divRound(new BN(100));
    
    return minAmountOut;
}

export const formatValue = (value: number, format: string = '0,0.00') => {
    if (value >= 1000000) {
      return `${numeral(value / 1000000).format(format)}M`;
    } else if (value >= 1000) {
      return `${numeral(value / 1000).format(format)}K`;
    }
    return `${numeral(value).format(format)}`;
  };

export const groupSnapshotsByInterval = (
  snapshots: { price: number; created_at: string }[],
  interval: number
): TokenSnapshotDto[] => {
  if (snapshots.length === 0) return [];

  const sortedSnapshots = [...snapshots].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const groups: { [key: number]: { price: number; created_at: string }[] } = {};

  sortedSnapshots.forEach((snapshot) => {
    const timestamp = new Date(snapshot.created_at).getTime();
    const intervalKey = Math.floor(timestamp / (interval * 1000)) * (interval * 1000);
    
    if (!groups[intervalKey]) {
      groups[intervalKey] = [];
    }
    groups[intervalKey].push(snapshot);
  });

  return Object.entries(groups).map(([intervalKey, groupSnapshots]) => {
    const prices = groupSnapshots.map(s => s.price);
    const open = groupSnapshots[0].price;
    const close = groupSnapshots[groupSnapshots.length - 1].price;
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const created_at = new Date(parseInt(intervalKey)).toISOString();

    return {
      open: open.toString(),
      close: close.toString(),
      high: high.toString(),
      low: low.toString(),
      created_at,
    };
  }).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
};

export const fetchRpcPoolInfo = async (id: string, options: { owner: PublicKey, connection: Connection, cluster: Cluster }) => {
  const raydium = await Raydium.load({
    owner: options.owner,
    connection: options.connection,
    cluster: options.cluster,
    disableFeatureCheck: true,
    disableLoadToken: true,
    blockhashCommitment: 'finalized',
  })

  const res = await raydium.cpmm.getRpcPoolInfos([id])

  const pool1Info = res[id]

  console.log('SOL-RAY pool price:', pool1Info.poolPrice)
  console.log('cpmm pool infos:', res)
}

