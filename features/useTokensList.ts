import { useQuery } from "@tanstack/react-query";
import {
  Paginated_TokenDto_,
  TokenDto,
  TokenService,
} from "@/shared/api/tiktokin.ts";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "./useSocket";

export const LIMIT = 25;

export enum SORT_BY {
  MARKET_CAP = "-price",
  CREATION_TIME = "-id",
}

export const useTokensList = () => {
  const [searchTerm, setSearnTerm] = useState("");
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.CREATION_TIME);
  const [tokens, setTokens] = useState<Paginated_TokenDto_["items"]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const flag = useRef(false);

  useSocket({
    onMessage: (message) => {
      console.log("New message:", message);
      setTokens((prev) => [message.data, ...prev]);
    },
  });

  const tokensListQuery = useQuery({
    queryKey: ["tokens", searchTerm, sortBy],
    queryFn: async () => {
      const res = await TokenService.tokenListTokensGet(
        searchTerm ?? null,
        sortBy,
        LIMIT
      );
      setTokens(res.items);
      return res;
    },
  });

  useEffect(() => {
    let eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/stream`
    );

    eventSource.addEventListener("new_token", (event) => {
      const data = JSON.parse(event.data) as TokenDto;

      setTokens((prev) => [data, ...prev]);
    });

    eventSource.onerror = () => {
      console.log("Connection error, reconnecting...");
      setTimeout(() => {
        eventSource = new EventSource(
          `${process.env.NEXT_PUBLIC_API_URL}/stream`
        );
      }, 1000);
    };
  }, []);

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
  };
};
