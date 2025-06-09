'use client'

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useEffect, useState } from "react";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Tiktokin } from "@/types";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { getAccount } from "@solana/spl-token";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
interface AnchorData {
    tiktokinProgram: Program<Tiktokin>;
    provider: AnchorProvider;
    connection: Connection;
}

const TIKTOKIN_PROGRAM_ID = new PublicKey("DveezyD6efYCAmGa5SUAZiLaVFZZvxazKFs4yVzwydqB");

export const useAnchor = () => {
    const wallet = useWallet();
    const [data, setData] = useState<AnchorData>({} as AnchorData);
    const {connection} = useConnection();

    useEffect(() => {
        const initAnchor = async () => {
            if (!wallet.publicKey || !wallet) return;
            
            const provider = new AnchorProvider(
                connection,
                wallet as any,
                { commitment: 'confirmed' }
            );

            try {
                const idl = await Program.fetchIdl(TIKTOKIN_PROGRAM_ID, provider);
                const tiktokinProgram = new Program<Tiktokin>(idl, provider);
                
                setData({
                    tiktokinProgram,
                    provider,
                    connection
                });
            } catch (error) {
                console.error("Failed to initialize Anchor:", error);
            }
        };

        initAnchor();
    }, [wallet.publicKey, wallet]);

    async function checkAndGetCreateAssociatedTokenAccountIx(
        payer: PublicKey,
        mint: PublicKey,
        owner: PublicKey = payer,
        programId: PublicKey,
      ):  Promise<TransactionInstruction | false> {
        const tokenAddress = getAssociatedTokenAddressSync(mint, owner, true, programId);
        try {
          await getAccount(data.connection, tokenAddress, 'confirmed', programId);
        } catch (e) {
          return createAssociatedTokenAccountInstruction(payer, mint, owner, programId);
        }
        return false;
    }

    return {data, checkAndGetCreateAssociatedTokenAccountIx};
};