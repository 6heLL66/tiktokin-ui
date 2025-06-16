import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

export const IS_DEV = process.env.NEXT_PUBLIC_IS_DEV === 'true';

export const DEVNET_TIKTOKIN_PROGRAM_ID = "DveezyD6efYCAmGa5SUAZiLaVFZZvxazKFs4yVzwydqB";
export const MAINNET_TIKTOKIN_PROGRAM_ID = "8JRBjuStqqkTCS7jZxS5kb6CWtjPhGTCBHUgjLBroFbx";

export const TIKTOKIN_PROGRAM_ID = IS_DEV ? DEVNET_TIKTOKIN_PROGRAM_ID : MAINNET_TIKTOKIN_PROGRAM_ID;

export const TIKTOKIN_PROGRAM = new PublicKey(TIKTOKIN_PROGRAM_ID);


const DEVNET_CP_SWAP_PROGRAM_ID = new PublicKey('CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW');
const DEVNET_ammConfig = new PublicKey('9zSzfkYy6awexsHvmggeH36pfVUdDGyCcwmjT3AQPBj6');

const MAINNET_CP_SWAP_PROGRAM_ID = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
const MAINNET_ammConfig = new PublicKey('5quBtoiQqxF9Jv6KYKctB59NT3gtJD2Y65kdnB1Uev3h');

export const CP_SWAP_PROGRAM_ID = IS_DEV ? DEVNET_CP_SWAP_PROGRAM_ID : MAINNET_CP_SWAP_PROGRAM_ID;
export const ammConfig = IS_DEV ? DEVNET_ammConfig : MAINNET_ammConfig;

export const network = IS_DEV ? clusterApiUrl(WalletAdapterNetwork.Devnet) : 'https://mainnet.helius-rpc.com/?api-key=54e197b2-a718-4484-9393-3f5dc2752e5c';