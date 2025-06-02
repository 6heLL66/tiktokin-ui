import { useQuery } from "@tanstack/react-query";
import { TokenService } from "@/api/tiktokin.ts";

export const useTokensList = () => {
    const tokensListQuery = useQuery({
        queryKey: ["tokens"],
        queryFn: () => TokenService.tokenListTokensGet(),
    });

    return {
        query: tokensListQuery,
        tokens: tokensListQuery.data,
    };
};