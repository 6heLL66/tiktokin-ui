import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useQuery } from "@tanstack/react-query"
import { useAnchor } from "./useAnchor";
import { useMemo } from "react";

export const useConfig = () => {
    const {data: {tiktokinProgram}} = useAnchor();
    
    const query = useQuery({
        queryKey: ["config"],
        queryFn: () => {
            const [configPda] = PublicKey.findProgramAddressSync(
              [Buffer.from('global-config')],
              tiktokinProgram.programId
            );
            return tiktokinProgram?.account.config.fetch(configPda);
        }
    })

    const curveLimit = useMemo(() => {
        return new BigNumber(query.data?.curveLimit ?? 0).dividedBy(LAMPORTS_PER_SOL);
    }, [query.data]);

    return {query, config: query.data, curveLimit};
}