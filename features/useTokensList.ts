import { useQuery } from "@tanstack/react-query";
import {
    Paginated_TokenWithPriceDto_,
  TokenService,
  TokenWithPriceDto,
} from "@/shared/api/tiktokin.ts";
import { useRef, useState } from "react";
import { useSocket } from "./useSocket";
import { PublicKey } from "@solana/web3.js";
import { useAnchor } from "./useAnchor";
import { BN } from "@coral-xyz/anchor";

export const LIMIT = 25;

export type BondingCurveAccount = {
    virtualTokenReserves: BN;
    virtualSolReserves: BN;
    realTokenReserves: BN;
    realSolReserves: BN;
    tokenTotalSupply: BN;
    isCompleted: boolean;
    feesCollected: BN;
}

export enum SORT_BY {
  MARKET_CAP = "-price",
  CREATION_TIME = "-id",
}

export const useTokensList = () => {
  const { data: { tiktokinProgram } } = useAnchor()
  const [searchTerm, setSearnTerm] = useState("");
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.CREATION_TIME);
  const [tokens, setTokens] = useState<Paginated_TokenWithPriceDto_["items"]>([]);
  const [curveAccounts, setCurveAccounts] = useState<Record<number, BondingCurveAccount>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const flag = useRef(false);

  useSocket({
    onMessage: (message) => {
      console.log("New message:", message);
      setTokens((prev) => [message.data, ...prev]);
    },
  });

  const fetchAccounts = async (items: TokenWithPriceDto[]) => {
    const curvePdas = items.map(token => {
        const [curvePda] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("bonding-curve"),
            new PublicKey(token.address).toBuffer()
          ],
          tiktokinProgram.programId
        )
        return curvePda
      })

      const accounts = await tiktokinProgram.account.bondingCurve.fetchMultiple(curvePdas);
      setCurveAccounts(accounts.reduce((acc, account, index) => {
        if (!account) return acc
        const tokenId = items[index].id
        return {
            ...acc,
            [tokenId]: account
        }
      }, {} as Record<string, BondingCurveAccount>))
  }

  const tokensListQuery = useQuery({
    queryKey: ["tokens", searchTerm, sortBy],
    queryFn: async () => {
      const res = await TokenService.tokenListTokensGet(
        searchTerm ?? null,
        sortBy,
        LIMIT
      );

      await fetchAccounts(res.items)

      setTokens(res.items);
      return res;
    },
    refetchOnMount: true,
  });

  const loadMore = async () => {
    if (flag.current) return;
    try {
      flag.current = true;
      setIsLoading(true);
      const res = await TokenService.tokenListTokensGet(
        searchTerm ?? null,
        sortBy,
        LIMIT,
        tokens.length
      );
      await fetchAccounts([...tokens, ...res.items])
      setTokens([...tokens, ...res.items]);
      setIsLoading(false);
      flag.current = false;
    } catch {
      setIsLoading(false);
      flag.current = false;
    }
  };

  return {
    query: tokensListQuery,
    tokens,
    loadMore,
    setSearnTerm,
    isLoading,
    sortBy,
    setSortBy,
    curveAccounts,
  };
};
