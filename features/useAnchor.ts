'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useEffect, useRef } from "react";
import { clusterApiUrl, Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Tiktokin } from "@/types";
import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { getAccount } from "@solana/spl-token";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

interface AnchorData {
    tiktokinProgram: Program<Tiktokin>;
    provider: AnchorProvider;
    connection: Connection;
}

const TIKTOKIN_PROGRAM_ID = new PublicKey("EEW2zzHxLCJhTeDx6RXnifvY26ump5M1gmUQarTqJj1L");

export const useAnchor = () => {
    const wallet = useWallet();
    const data = useRef<AnchorData>({} as AnchorData);

    useEffect(() => {
        const initAnchor = async () => {
            if (!wallet.publicKey || !wallet) return;
            
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            const provider = new AnchorProvider(
                connection,
                wallet as any,
                { commitment: 'confirmed' }
            );

            try {
                const idl = await Program.fetchIdl(TIKTOKIN_PROGRAM_ID, provider);
                const tiktokinProgram = new Program<Tiktokin>(idl, provider);
                
                data.current = {
                    tiktokinProgram,
                    provider,
                    connection
                };
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
          await getAccount(data.current.connection, tokenAddress, 'confirmed', programId);
        } catch (e) {
          return createAssociatedTokenAccountInstruction(payer, mint, owner, programId);
        }
        return false;
    }

    return {data: data.current, checkAndGetCreateAssociatedTokenAccountIx};
};