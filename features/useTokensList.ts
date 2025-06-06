import { useQuery } from "@tanstack/react-query";
import { Paginated_TokenDto_, TokenDto, TokenService } from "@/shared/api/tiktokin.ts";
import { useEffect, useRef, useState } from "react";

const LIMIT = 40

export const useTokensList = () => {
    const [searchTerm, setSearnTerm] = useState("");
    const [tokens, setTokens] = useState<Paginated_TokenDto_['items']>([]);
    const [isLoading, setIsLoading] = useState(false);

    const flag = useRef(false);

    const tokensListQuery = useQuery({
        queryKey: ["tokens", searchTerm],
        queryFn: async () => {
            const res = await TokenService.tokenListTokensGet(searchTerm ?? null, '-id', LIMIT)
            setTokens(res.items)
            return res
        },
    });

    useEffect(() => {
        let eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/stream`);
        
        eventSource.addEventListener('new_token', (event) => {
            const data = JSON.parse(event.data) as TokenDto;

            setTokens((prev) => [data, ...prev])
        });

        eventSource.onerror = () => {
            console.log('Connection error, reconnecting...');
            setTimeout(() => {
                eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/stream`);
            }, 1000);
        };
    }, [])

    const loadMore = async () => {
        if (flag.current) return;
        try {
            flag.current = true;
            setIsLoading(true);
            const res = await TokenService.tokenListTokensGet(searchTerm ?? null, '-id', LIMIT, tokens.length)
            setTokens([...tokens, ...res.items])
            setIsLoading(false);
            flag.current = false;
        } catch {
            setIsLoading(false);
            flag.current = false;
        }
    }

    return {
        query: tokensListQuery,
        tokens,
        loadMore,
        setSearnTerm,
        isLoading,
    };
};