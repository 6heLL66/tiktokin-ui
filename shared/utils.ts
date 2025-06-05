import { BN } from "@coral-xyz/anchor";

export const solExchangeToTokenBuy = (solReserve: BN, tokenReserve: BN, amount: BN) => {
    return amount.mul(tokenReserve).div(solReserve.add(amount));
}

export const solExchangeToTokenSell = (solReserve: BN, tokenReserve: BN, amount: BN) => {
    return amount.mul(tokenReserve).div(solReserve.sub(amount));
}

export const getMinAmountOut = (amount: BN, slippage: BN, fee: BN) => {
    return amount.div(slippage).div(fee);
}