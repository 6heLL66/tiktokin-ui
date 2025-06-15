'use client'

import { FC, useEffect, useMemo, useState } from 'react'
import {PriceChart} from '@/app/components/PriceChart'
import { useAnchor } from '@/features/useAnchor'
import { ClipLoader, MoonLoader } from 'react-spinners'
import { useParams } from 'next/navigation'
import { BN } from '@coral-xyz/anchor'
import BigNumber from "bignumber.js";
import { ComputeBudgetProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useBalance } from '@/features/useBalance'
import { SlippageModal } from '@/app/components/SlippageModal'
import { useToken } from '@/features/useToken'
import { useSlippage } from '@/features/useSlippage'
import { WalletConnect } from '@/app/solana/WalletProvider/ui'
import { createCloseAccountInstruction, getAccount, getAssociatedTokenAddressSync, NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { fetchRpcPoolInfo, formatValue, getMinAmountOut, solExchangeToTokenBuy, tokenExchangeToSolBuy } from '@/shared/utils'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { TokenService } from '@/shared/api/tiktokin.ts'
import { Time } from 'lightweight-charts'
import useSolPrice from '@/features/useSolPrice'
import { useTokenReserves } from '@/features/useTokenReserves'
import numeral from 'numeral'
import { intervals } from './constants'
import { useChartSettings } from '@/features/useChartInterval'
import { useConfig } from '@/features/useConfig'
import { ToastProvider, toastService } from './toasts'

const CP_SWAP_PROGRAM_ID = new PublicKey('CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW');
const ammConfig = new PublicKey('9zSzfkYy6awexsHvmggeH36pfVUdDGyCcwmjT3AQPBj6');

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
  const { data: {tiktokinProgram} } = useAnchor();

  const [loading, setLoading] = useState(false);

  const { chartInterval, setChartInterval, chartType, setChartType } = useChartSettings();

  const wallet = useWallet();
  const { id } = useParams();
  const {slippage} = useSlippage();
  const { data: token } = useQuery({
    queryKey: ["token", id, chartInterval],
    queryFn: () => TokenService.tokenRetrieveTokensTokenIdGet(Number(id), new Date(0).toISOString(), new Date(Date.now()).toISOString(), chartInterval),
    placeholderData: keepPreviousData,
    refetchInterval: 60000,
});

  const {data: tiktokData} = useQuery({
    queryKey: ['tiktok', token?.video_url],
    queryFn: () => {
        return fetch(`https://www.tiktok.com/oembed/?format=json&url=${token?.video_url}`).then(res => res.json())
    },
})

  const {balance, updateBalance} = useBalance();
  const {config, curveLimit} = useConfig();

  const [amount, setAmount] = useState(0);
  const [isSlippageModalOpen, setIsSlippageModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')

  const {tokenInfo, fetchTokenInfo} = useToken(token?.address);
  const { marketCap, chartRealTimeData, reserves } = useTokenReserves(token?.address);

  // useEffect(() => {
  //   if (!token || !wallet.publicKey) return;

  //   fetchRpcPoolInfo(getPoolState(ammConfig, NATIVE_MINT, new PublicKey(token.address)).toBase58(), {
  //     owner: wallet.publicKey,
  //     connection,
  //     cluster: 'devnet'
  //   })
  // }, [token, wallet])

  const handleBuy = async() => {
    if (!token || Number.isNaN(amount) || !wallet.publicKey || !config?.feeRecipient) return;

    setLoading(true)

    const toastId = toastService.createLoadingToast('buy')

    try {
      const [curvePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('bonding-curve'), new PublicKey(token.address).toBuffer()],
        tiktokinProgram.programId
      );

      const curveAccount = await tiktokinProgram.account.bondingCurve.fetch(curvePda);

      console.log(curveAccount.virtualSolReserves.toString(), curveAccount.virtualTokenReserves.toString())

      const lamportsAmount = new BigNumber(amount.toFixed(9)).multipliedBy(LAMPORTS_PER_SOL);
      const tokensAmount = solExchangeToTokenBuy(new BN(curveAccount.virtualSolReserves), new BN(curveAccount.virtualTokenReserves), new BN(lamportsAmount.toString()));

      toastService.updateToConfirming(toastId)

      await tiktokinProgram?.methods.swap(new BN(lamportsAmount.toString()), new BN(0), getMinAmountOut(tokensAmount, new BN(slippage), new BN(config.buyFeePercent)))
        .accounts({
          feeRecipient: config?.feeRecipient!,
          tokenMint: new PublicKey(token.address),
          user: wallet.publicKey,
        })
        .rpc()
        .finally(() => {
          setLoading(false)
        });

      updateBalance()
      fetchTokenInfo()
      
      toastService.updateToSuccess(toastId, new BigNumber(tokensAmount.toString()).dividedBy(LAMPORTS_PER_SOL).toNumber(), token.symbol, 'buy')
    } catch (error) {
      console.log(error)
      setLoading(false)
      toastService.updateToError(toastId, 'buy')
    }
  }

  const handleSell = async() => {
    if (!token || Number.isNaN(amount) || !wallet.publicKey || !config?.feeRecipient) return;

    setLoading(true)

    const toastId = toastService.createLoadingToast('sell')

    try {
      const [curvePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('bonding-curve'), new PublicKey(token.address).toBuffer()],
        tiktokinProgram.programId
      );

      const curveAccount = await tiktokinProgram.account.bondingCurve.fetch(curvePda);

      const tokensAmount = new BigNumber(amount.toFixed(9)).multipliedBy(LAMPORTS_PER_SOL);

      const lamportsAmount = tokenExchangeToSolBuy(curveAccount.virtualSolReserves, curveAccount.virtualTokenReserves, new BN(tokensAmount.toString()));

      const userWsolAta = getAssociatedTokenAddressSync(NATIVE_MINT, wallet.publicKey);
      const unwrapSolIx = createCloseAccountInstruction(userWsolAta, wallet.publicKey, wallet.publicKey);

      toastService.updateToConfirming(toastId)

      await tiktokinProgram?.methods.swap(new BN(tokensAmount.toString()), new BN(1), getMinAmountOut(new BN(lamportsAmount.toString()), new BN(slippage), new BN(config.sellFeePercent)))
        .accounts({
          feeRecipient: config?.feeRecipient,
          tokenMint: new PublicKey(token.address),
          user: wallet.publicKey,
        })
        .postInstructions([unwrapSolIx])
        .rpc()
        .finally(() => {
          setLoading(false)
        });

      updateBalance()
      fetchTokenInfo()
      
      toastService.updateToSuccess(toastId, new BigNumber(tokensAmount.toString()).dividedBy(LAMPORTS_PER_SOL).toNumber(), token.symbol, 'sell')
    } catch (error) {
      console.log(error)
      setLoading(false)
      toastService.updateToError(toastId, 'sell')
    }
  }

  const migrate = async () => {
    if (!token || !wallet.publicKey) return;

   
    const token0Mint = NATIVE_MINT;
    const token1Mint = new PublicKey(token.address);

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
      .preInstructions([ComputeBudgetProgram.setComputeUnitLimit({ units: 250_000 })])
      .rpc({skipPreflight: true}).catch((err) => {
        console.log(err);
      });
  }

  const { price: solPrice } = useSolPrice()

  const chartData = useMemo(() => {
    let prev: string;
    if (chartType === 'marketcap') {
      return [...(token?.snapshots ?? []), ...(chartRealTimeData ?? [])].map((snapshot) => {
        let open = prev;
        prev = snapshot.close;
        return {
          open: new BigNumber(Number(open || snapshot.open)).multipliedBy(reserves?.realTokenReserves ?? 0).multipliedBy(solPrice).dividedBy(LAMPORTS_PER_SOL).toNumber(),
          close: new BigNumber(Number(snapshot.close)).multipliedBy(reserves?.realTokenReserves ?? 0).multipliedBy(solPrice).dividedBy(LAMPORTS_PER_SOL).toNumber(),
          high: new BigNumber(Number(snapshot.high)).multipliedBy(reserves?.realTokenReserves ?? 0).multipliedBy(solPrice).dividedBy(LAMPORTS_PER_SOL).toNumber(),
          low: new BigNumber(Number(snapshot.low)).multipliedBy(reserves?.realTokenReserves ?? 0).multipliedBy(solPrice).dividedBy(LAMPORTS_PER_SOL).toNumber(),
          time: (new Date(snapshot.created_at).getTime() / 1000 - new Date().getTimezoneOffset() * 60) as Time
        }
      })
    }
    return [...(token?.snapshots ?? []), ...(chartRealTimeData ?? [])].map((snapshot, index) => {
      let open = prev
      prev = snapshot.close;
      return {
        open: new BigNumber(Number(open || snapshot.open)).multipliedBy(solPrice).toNumber(),
        close: new BigNumber(Number(snapshot.close)).multipliedBy(solPrice).toNumber(),
        high: new BigNumber(Number(snapshot.high)).multipliedBy(solPrice).toNumber(),
        low: new BigNumber(Number(snapshot.low)).multipliedBy(solPrice).toNumber(),
        time: (new Date(snapshot.created_at).getTime() / 1000 - new Date().getTimezoneOffset() * 60) as Time
      }
    })
  }, [token, chartRealTimeData])

  if (!token) {
    return <div className='flex justify-center items-center h-screen bg-[#1A1B1E]'><MoonLoader color='#14F195' size={50} /></div>
  }

  const progressPercentage = Math.min((marketCap / curveLimit.multipliedBy(solPrice).toNumber()) * 100, 100);
  const isReadyForMigration = marketCap >= curveLimit.multipliedBy(solPrice).toNumber() && curveLimit.toNumber() > 0;
  const isMigrated = token.is_completed;
  const poolId = getPoolState(ammConfig, NATIVE_MINT, new PublicKey(token.address)).toBase58()
  const raydiumUrl = `https://raydium.io/clmm/create-position/?pool_id=${poolId}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1011] to-[#1A1B1E] text-white">
      <ToastProvider />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        <div className="bg-[#1A1B1E]/80 backdrop-blur-sm border border-[#2A2B2E]/60 rounded-xl p-4 lg:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-[#2A2B2E] border-2 border-[#3A3B3E] object-cover" 
                  src={token.uri} 
                  alt={token.name}
                  loading="lazy"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#14F195] rounded-full border-2 border-[#1A1B1E]"></div>
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
                    {token.name}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2A2B2E]/80 text-[#14F195] border border-[#14F195]/20">
                    ${token.symbol.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 text-sm text-[#9CA3AF] mt-1">
                  <span className="flex items-center gap-1">
                    <span className="text-[#14F195]">●</span>
                    Market Cap: ${numeral(marketCap).format('0,0.00')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 mt-6 lg:mt-8">
          <div className="xl:col-span-8 space-y-6">
            <div className="relative aspect-[9/16] sm:aspect-[16/10] lg:aspect-[16/9] max-h-[70vh] bg-[#1A1B1E]/80 backdrop-blur-sm border border-[#2A2B2E]/60 rounded-xl overflow-hidden shadow-xl">
              {tiktokData && (
                <iframe
                  src={`https://www.tiktok.com/player/v1/${tiktokData?.embed_product_id}?fullscreen_button=1&rel=0&autoplay=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${token.name} TikTok Video`}
                />
              )}
            </div>

            <div className="bg-[#1A1B1E]/80 backdrop-blur-sm border border-[#2A2B2E]/60 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-[#2A2B2E]/60">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-white">Price Chart</h2>
                    
                    <div className="flex bg-[#2A2B2E]/60 rounded-lg p-1">
                      <button 
                        onClick={() => setChartType('price')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                          chartType === 'price' 
                            ? 'bg-[#14F195] text-black shadow-sm' 
                            : 'text-[#9CA3AF] hover:text-white hover:bg-[#3A3B3E]/60'
                        }`}
                      >
                        Price
                      </button>
                      <button 
                        onClick={() => setChartType('marketcap')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                          chartType === 'marketcap' 
                            ? 'bg-[#14F195] text-black shadow-sm' 
                            : 'text-[#9CA3AF] hover:text-white hover:bg-[#3A3B3E]/60'
                        }`}
                      >
                        Market Cap
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {intervals.map(({label, value}) => (
                      <button 
                        key={value} 
                        onClick={() => setChartInterval(value)} 
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          chartInterval === value 
                            ? 'bg-[#14F195] text-black shadow-sm' 
                            : 'bg-[#2A2B2E]/60 text-[#9CA3AF] hover:text-white hover:bg-[#3A3B3E]/60'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-[480px] p-4">
                <PriceChart data={chartData} isCap={chartType === 'marketcap'} />
              </div>
            </div>
          </div>

          <div className="xl:col-span-4">
            <div className="sticky top-24 bg-[#1A1B1E]/80 backdrop-blur-sm border border-[#2A2B2E]/60 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 lg:p-6">
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <button 
                    onClick={() => {
                      setActiveTab('buy')
                      setAmount(0)
                    }}
                    disabled={loading}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeTab === 'buy' 
                        ? 'bg-gradient-to-r from-[#14F195] to-[#13E085] text-black shadow-lg transform scale-[1.02]' 
                        : 'bg-[#2A2B2E]/60 text-white hover:bg-[#3A3B3E]/60 hover:scale-[1.01]'
                    }`}
                  >
                    Buy
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('sell')
                      setAmount(0)
                    }}
                    disabled={loading}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeTab === 'sell' 
                        ? 'bg-[#FF6B6B] text-white shadow-lg transform scale-[1.02]' 
                        : 'bg-[#2A2B2E]/60 text-white hover:bg-[#3A3B3E]/60 hover:scale-[1.01]'
                    }`}
                  >
                    Sell
                  </button>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => setIsSlippageModalOpen(true)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#2A2B2E]/60 rounded-xl text-sm hover:bg-[#3A3B3E]/60 transition-all duration-200 group"
                  >
                    <span className="text-[#9CA3AF] group-hover:text-white transition-colors">
                      Slippage Tolerance
                    </span>
                    <span className="text-white font-medium bg-[#14F195]/10 px-2 py-1 rounded-lg">
                      {slippage}%
                    </span>
                  </button>

                  <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-4 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#9CA3AF]">Available Balance</span>
                      <span className="text-white font-semibold text-right">
                        {activeTab === 'buy' 
                          ? `${balance.toNumber().toFixed(5)} SOL` 
                          : `${formatValue(tokenInfo?.balance || 0)} ${token.symbol.toUpperCase()}`
                        }
                      </span>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#9CA3AF]">
                        Amount
                      </label>
                      <div className="relative">
                        <input 
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full bg-[#1A1B1E]/80 border border-[#2A2B2E]/60 rounded-xl pl-4 pr-20 py-3 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#14F195]/50 focus:border-[#14F195]/50 transition-all duration-200"
                          placeholder="0.00"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#2A2B2E]/80 px-2 py-1 rounded-lg">
                          <img 
                            src={activeTab === 'buy' ? "https://statics.solscan.io/solscan-img/solana_icon.svg" : token.uri} 
                            alt="token" 
                            className="w-4 h-4 rounded-full" 
                          />
                          <span className="text-sm font-medium text-white">
                            {activeTab === 'buy' ? 'SOL' : token.symbol.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-2">
                        {activeTab === 'buy' ? (
                          <>
                            <button 
                              onClick={() => setAmount(0.1)}
                              className="px-3 py-2 bg-[#2A2B2E]/60 rounded-lg text-xs font-medium text-white hover:bg-[#3A3B3E]/60 transition-all duration-200 hover:scale-105"
                            >
                              0.1 SOL
                            </button>
                            <button 
                              onClick={() => setAmount(0.5)}
                              className="px-3 py-2 bg-[#2A2B2E]/60 rounded-lg text-xs font-medium text-white hover:bg-[#3A3B3E]/60 transition-all duration-200 hover:scale-105"
                            >
                              0.5 SOL
                            </button>
                            <button 
                              onClick={() => setAmount(1)}
                              className="px-3 py-2 bg-[#2A2B2E]/60 rounded-lg text-xs font-medium text-white hover:bg-[#3A3B3E]/60 transition-all duration-200 hover:scale-105"
                            >
                              1 SOL
                            </button>
                            <button 
                              onClick={() => setAmount(balance.toNumber())}
                              className="px-3 py-2 bg-[#14F195]/20 border border-[#14F195]/40 rounded-lg text-xs font-medium text-[#14F195] hover:bg-[#14F195]/30 transition-all duration-200 hover:scale-105"
                            >
                              MAX
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => setAmount(+new BigNumber(tokenInfo?.balance ?? 0).multipliedBy(0.25).toNumber().toFixed(9))}
                              className="px-3 py-2 bg-[#2A2B2E]/60 rounded-lg text-xs font-medium text-white hover:bg-[#3A3B3E]/60 transition-all duration-200 hover:scale-105"
                            >
                              25%
                            </button>
                            <button 
                              onClick={() => setAmount(+new BigNumber(tokenInfo?.balance ?? 0).multipliedBy(0.5).toNumber().toFixed(9))}
                              className="px-3 py-2 bg-[#2A2B2E]/60 rounded-lg text-xs font-medium text-white hover:bg-[#3A3B3E]/60 transition-all duration-200 hover:scale-105"
                            >
                              50%
                            </button>
                            <button 
                              onClick={() => setAmount(+new BigNumber(tokenInfo?.balance ?? 0).multipliedBy(0.75).toNumber().toFixed(9))}
                              className="px-3 py-2 bg-[#2A2B2E]/60 rounded-lg text-xs font-medium text-white hover:bg-[#3A3B3E]/60 transition-all duration-200 hover:scale-105"
                            >
                              75%
                            </button>
                            <button 
                              onClick={() => setAmount(+new BigNumber(tokenInfo?.balance ?? 0).toNumber().toFixed(9))}
                              className="px-3 py-2 bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 rounded-lg text-xs font-medium text-[#FF6B6B] hover:bg-[#FF6B6B]/30 transition-all duration-200 hover:scale-105"
                            >
                              MAX
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {wallet.publicKey ? (
                    <button 
                      onClick={activeTab === 'buy' ? handleBuy : handleSell}
                      disabled={loading || isReadyForMigration}
                      className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        activeTab === 'buy'
                          ? 'bg-gradient-to-r from-[#14F195] to-[#13E085] text-black hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]'
                          : 'bg-[#FF6B6B] text-white hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]'
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <ClipLoader color={activeTab === 'buy' ? '#000000' : '#ffffff'} size={16} />
                          Processing...
                        </div>
                      ) : (
                        `${activeTab === 'buy' ? 'Buy' : 'Sell'} ${token.symbol.toUpperCase()}`
                      )}
                    </button>
                  ) : (
                    <div className="flex justify-center py-4">
                      <WalletConnect />
                    </div>
                  )}

                  <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-4 space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">Raydium Migration</h3>
                      <span className="text-xs text-[#9CA3AF]">
                        ${numeral(marketCap).format('0,0')} / ${numeral(curveLimit.multipliedBy(solPrice).toNumber()).format('0,0')}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="w-full bg-[#1A1B1E]/80 rounded-full h-3 overflow-hidden border border-[#2A2B2E]/40">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            isReadyForMigration 
                              ? 'bg-gradient-to-r from-[#14F195] to-[#13E085]' 
                              : 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#9CA3AF]">
                          {progressPercentage.toFixed(1)}% complete
                        </span>
                        <span className={`font-medium ${
                          isReadyForMigration ? 'text-[#14F195]' : 'text-[#3B82F6]'
                        }`}>
                          {isReadyForMigration ? 'Completed!' : 'In Progress'}
                        </span>
                      </div>
                    </div>

                    {isReadyForMigration && !isMigrated && (
                      <div className="text-sm text-[#9CA3AF] bg-[#2A2B2E]/40 p-3 rounded-lg border border-[#3A3B3E]/40">
                        Token will be migrated to Raydium within 10 minutes
                      </div>
                    )}

                    {isMigrated && (
                      <div className="space-y-3">
                        <div className="text-sm text-[#9CA3AF] bg-[#2A2B2E]/40 p-3 rounded-lg border border-[#3A3B3E]/40">
                          Token has been successfully migrated to Raydium
                        </div>
                        <button 
                          onClick={() => window.open(raydiumUrl, '_blank')}
                          className="w-full py-3 bg-gradient-to-r from-[#9945FF] to-[#7B2CBF] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                        >
                          View on Raydium
                        </button>
                      </div>
                    )}
                  </div>
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
