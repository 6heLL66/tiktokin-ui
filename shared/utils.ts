import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNumber from "bignumber.js";

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