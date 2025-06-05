import { useQuery } from "@tanstack/react-query";
import { Paginated_TokenDto_, TokenService } from "@/shared/api/tiktokin.ts";
import { useRef, useState } from "react";

const LIMIT = 40

export const useTokensList = () => {
    const [searchTerm, setSearnTerm] = useState("");
    const [tokens, setTokens] = useState<Paginated_TokenDto_['items']>([]);
    const [isLoading, setIsLoading] = useState(false);

    const flag = useRef(false);

    const tokensListQuery = useQuery({
        queryKey: ["tokens", searchTerm],
        queryFn: async () => {
            const res = await TokenService.tokenListTokensGet(searchTerm, LIMIT)
            setTokens(res.items)
            return res
        },
    });

    const loadMore = async () => {
        if (flag.current) return;
        try {
            flag.current = true;
            setIsLoading(true);
            const res = await TokenService.tokenListTokensGet(searchTerm, LIMIT, tokens.length)
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