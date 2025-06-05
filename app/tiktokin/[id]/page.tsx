'use client'

import { FC, useState } from 'react'
import {PriceChart} from '@/app/components/PriceChart'
import { useAnchor } from '@/features/useAnchor'
import { useTokensList } from '@/features/useTokensList'
import { MoonLoader } from 'react-spinners'
import { useParams } from 'next/navigation'
import { BN } from '@coral-xyz/anchor'
import BigNumber from "bignumber.js";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { useBalance } from '@/features/useBalance'
import { SlippageModal } from '@/app/components/SlippageModal'
import { useToken } from '@/features/useToken'
import { useSlippage } from '@/features/useSlippage'
import { WalletConnect } from '@/app/solana/WalletProvider/ui'
import { getAssociatedTokenAddressSync, NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getMinAmountOut, solExchangeToTokenBuy } from '@/shared/utils'
import { useQuery } from '@tanstack/react-query'
import { TokenService } from '@/shared/api/tiktokin.ts'

const CP_SWAP_PROGRAM_ID = new PublicKey('CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW');

function getPoolState(
  ammConfig: PublicKey,
  token0Mint: PublicKey,
  token1Mint: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool", "utf8"),
      ammConfig.toBuffer(),
      token0Mint.toBuffer(),
      token1Mint.toBuffer()
    ],
    CP_SWAP_PROGRAM_ID
  )[0];
}

function getLpMint(poolId: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("pool_lp_mint", "utf8"),
      poolId.toBuffer()
    ],
    CP_SWAP_PROGRAM_ID
  )[0];
}

const TiktokinPage: FC = () => {
  const { data: {tiktokinProgram, connection, provider} } = useAnchor();

  const wallet = useWallet();
  const { id } = useParams();
  const {slippage} = useSlippage();
  const { data: token } = useQuery({
    queryKey: ["token", id],
    queryFn: () => TokenService.tokenRetrieveTokensTokenIdGet(Number(id), `2022-12-27 08:26:49`, `2025-12-27 08:26:49`, 1),
  });

  const {balance} = useBalance();

  const [amount, setAmount] = useState(0);
  const [isSlippageModalOpen, setIsSlippageModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')

  const {tokenInfo} = useToken(token?.address);

  const handleBuy = async() => {
    if (!token || Number.isNaN(amount) || !wallet.publicKey) return;

    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('global-config')],
      tiktokinProgram.programId
    );

    const [curvePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('bonding-curve'), new PublicKey(token.address).toBuffer()],
      tiktokinProgram.programId
    );

    const configAccount = await tiktokinProgram.account.config.fetch(configPda);
    const curveAccount = await tiktokinProgram.account.bondingCurve.fetch(curvePda);

    const lamportsAmount = new BigNumber(amount.toString()).multipliedBy(LAMPORTS_PER_SOL);
    const tokensAmount = solExchangeToTokenBuy(new BN(curveAccount.virtualSolReserves), new BN(curveAccount.virtualTokenReserves), new BN(lamportsAmount.toNumber()));
    console.log(curveAccount.virtualSolReserves.toString(), curveAccount.virtualTokenReserves.toString(), tokensAmount.toString())

    const tx = await tiktokinProgram?.methods.swap(new BN(lamportsAmount.toNumber()), new BN(0), getMinAmountOut(tokensAmount, slippage, configAccount.buyFeePercent))
      .accounts({
        feeRecipient: configAccount.feeRecipient,
        tokenMint: new PublicKey(token.address),
        user: wallet.publicKey,
      })
      .transaction();

    tx.feePayer = wallet.publicKey;

    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signature = await provider?.sendAndConfirm(tx);

    console.log(signature);
  }

  const handleSell = async() => {
    if (!token || Number.isNaN(amount) || !wallet.publicKey) return;

    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('global-config')],
      tiktokinProgram.programId
    );

    const configAccount = await tiktokinProgram.account.config.fetch(configPda);
    const lamportsAmount = new BigNumber(amount.toString()).multipliedBy(LAMPORTS_PER_SOL);

    const tx = await tiktokinProgram?.methods.swap(new BN(lamportsAmount.toNumber()), new BN(1), new BN(0))
      .accounts({
        feeRecipient: configAccount.feeRecipient,
        tokenMint: new PublicKey(token.address),
        user: wallet.publicKey,
      })
      .rpc({skipPreflight: true});

    console.log(tx);
  }

  const migrate = async () => {
    if (!token || !wallet.publicKey) return;

    const ammConfig = new PublicKey('9zSzfkYy6awexsHvmggeH36pfVUdDGyCcwmjT3AQPBj6');
    const token0Mint = NATIVE_MINT;
    const token1Mint = new PublicKey(token.address);

    const [curvePda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("bonding-curve"),
        token1Mint.toBuffer()
      ],
      tiktokinProgram.programId
    );

    const [liquidityPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("liquidity"),
        token1Mint.toBuffer()
      ],
      tiktokinProgram.programId
    );

    const poolState = getPoolState(ammConfig, token0Mint, token1Mint);
    const lpMint = getLpMint(poolState);
    
    const creatorToken0Ata = getAssociatedTokenAddressSync(token0Mint, wallet.publicKey);
    const creatorToken1Ata = getAssociatedTokenAddressSync(token1Mint, wallet.publicKey);
    const creatorLpTokenAta = getAssociatedTokenAddressSync(lpMint, wallet.publicKey, false);

    const liquidityTokenAta = getAssociatedTokenAddressSync(token1Mint, liquidityPda, true);

    // const ix = await createAssociatedTokenAccountInstruction(wallet.publicKey, creatorToken0, curvePda, token0Mint);

    // const tx = new Transaction().add(ix);

    // const signature = await wallet.sendTransaction(tx, connection);

    // console.log(signature);

    tiktokinProgram?.methods.migrate(new BN(Date.now()))
      .accounts({
        creator: wallet.publicKey,
        liquidityTokenAta,
        token0Mint: token0Mint,
        token1Mint: token1Mint,
        creatorToken0: creatorToken0Ata,
        creatorToken1: creatorToken1Ata,
        creatorLpToken: creatorLpTokenAta,
        token1Program: TOKEN_PROGRAM_ID,
        token0Program: TOKEN_PROGRAM_ID,
        ammConfig: ammConfig,
      })
      // .preInstructions([ix])
      .rpc({skipPreflight: true}).catch((err) => {
        console.log(err);
      });
  }

  const launch = async () => {
    if (!token || !wallet.publicKey) return;

    const tokenKp = Keypair.generate();
    const metadataProgramId = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        metadataProgramId.toBuffer(),
        tokenKp.publicKey.toBuffer(),
      ],
      metadataProgramId
    );

    const tx = await tiktokinProgram?.methods.launch('token_test', 'TTTT', "https://www.google.com")
      .accounts({
        creator: wallet.publicKey,
        tokenMint: tokenKp.publicKey,
        tokenMetadataAccount: metadataPDA,
      })
      .signers([tokenKp])
      .rpc({skipPreflight: true});

    console.log(tx);
  } 

  if (!token) {
    return <div className='flex justify-center items-center h-screen bg-[#1A1B1E]'><MoonLoader color='#14F195' size={50} /></div>
  }

  return (
    <div className="min-h-screen bg-[#0F1011] text-white p-4">
      <div className="max-w-8xl mx-auto space-y-4">

        <button onClick={() => migrate()}>Migrate</button>
        <button onClick={() => launch()}>Launch</button>
        
        {/* Token Info Header */}
        <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <img className="h-12 w-12 rounded-full bg-[#2A2B2E] border border-[#3A3B3E]" src={token.uri} alt={token.name} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{token.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#2A2B2E] text-xs text-[#707070]">
                  ${token.symbol}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#707070]">
                <div>Volume: $123.4K</div>
                <div>Market Cap: $13.4K</div>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-lg font-bold text-[#14F195]">$0.0000</div>
              <div className="text-xs text-[#14F195]">+12.34%</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Video Player */}
            <div className="aspect-[9/16] max-w-[300px] mx-auto bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-[#707070]">TikTok Video Player</span>
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Price Chart</h2>
                <div className="flex gap-1">
                  {['1H', '24H', '7D', '1M', 'ALL'].map((period) => (
                    <button key={period} className="px-2 py-1 rounded-md bg-[#2A2B2E] text-xs hover:bg-[#3A3B3E]">
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <PriceChart data={[]} />
            </div>

            {/* Chat Section */}
            <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Community Chat</h2>
                <div className="flex items-center gap-1.5 text-xs text-[#707070]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                  <span>1,234 online</span>
                </div>
              </div>
              <div className="h-[300px] bg-[#0F1011] border border-[#2A2B2E] rounded-md mb-3 p-3" />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-[#0F1011] border border-[#2A2B2E] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#9945FF]"
                />
                <button className="px-4 py-2 bg-[#9945FF] rounded-md text-sm font-medium hover:bg-[#8935FF]">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="w-[280px] shrink-0">
            <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4 sticky top-20">
              <div className="flex items-center gap-2 mb-4">
                <button 
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'buy' 
                      ? 'bg-[#14F195] text-black' 
                      : 'bg-[#2A2B2E] text-white hover:bg-[#3A3B3E]'
                  }`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setActiveTab('sell')}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'sell' 
                      ? 'bg-[#9945FF] text-white' 
                      : 'bg-[#2A2B2E] text-white hover:bg-[#3A3B3E]'
                  }`}
                >
                  Sell
                </button>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsSlippageModalOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-[#2A2B2E] rounded-md text-sm hover:bg-[#3A3B3E] transition-colors"
                >
                  <span className="text-[#707070]">Slippage Tolerance</span>
                  <span>{slippage}%</span>
                </button>

                <div className="p-3 rounded-md bg-[#0F1011] border border-[#2A2B2E]">
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-[#707070]">Balance</span>
                    <span>{activeTab === 'buy' ? `${balance.toNumber().toFixed(6)} SOL` : `${tokenInfo?.balance} ${token.symbol}`}</span>
                  </div>

                  <div>
                    <label className="block text-xs text-[#707070] mb-1.5">Amount</label>
                    <div className="relative">
                      <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-[#1A1B1E] border border-[#2A2B2E] rounded-md pl-3 pr-24 py-2 text-sm focus:outline-none focus:border-[#9945FF]"
                        placeholder="0.00"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#2A2B2E] px-2 py-1 rounded">
                        <img src={activeTab === 'buy' ? "https://statics.solscan.io/solscan-img/solana_icon.svg" : token.uri} alt="token" className="w-4 h-4 rounded-full" />
                        <span className="text-sm">{activeTab === 'buy' ? 'SOL' : token.symbol}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-1 mt-2">
                      {activeTab === 'buy' ? (
                        <>
                          <button 
                            onClick={() => setAmount(0.1)}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            0.1 SOL
                          </button>
                          <button 
                            onClick={() => setAmount(0.5)}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            0.5 SOL
                          </button>
                          <button 
                            onClick={() => setAmount(1)}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            1 SOL
                          </button>
                          <button 
                            onClick={() => setAmount(balance.toNumber())}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            MAX
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => setAmount(Number(tokenInfo?.balance) * 0.25)}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            25%
                          </button>
                          <button 
                            onClick={() => setAmount(Number(tokenInfo?.balance) * 0.5)}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            50%
                          </button>
                          <button 
                            onClick={() => setAmount(Number(tokenInfo?.balance) * 0.75)}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            75%
                          </button>
                          <button 
                            onClick={() => setAmount(Number(tokenInfo?.balance))}
                            className="px-1 py-1 bg-[#2A2B2E] rounded text-[11px] hover:bg-[#3A3B3E] transition-colors cursor-pointer"
                          >
                            MAX
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {wallet.publicKey ? <button 
                  className={`w-full py-2 rounded-md text-sm font-medium ${
                    activeTab === 'buy'
                      ? 'bg-[#14F195] text-black hover:bg-[#13E085]'
                      : 'bg-[#9945FF] text-white hover:bg-[#8935FF]'
                  }`}
                  onClick={activeTab === 'buy' ? handleBuy : handleSell}
                >
                  {activeTab === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
                </button> : <div className='flex justify-center items-center h-full'><WalletConnect /></div>}

                <div className="text-center text-xs text-[#707070]">
                  1 SOL = 1000 {token.symbol}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <SlippageModal
        isOpen={isSlippageModalOpen}
        onClose={() => setIsSlippageModalOpen(false)}
      />
    </div>
  )
}

export default TiktokinPage
