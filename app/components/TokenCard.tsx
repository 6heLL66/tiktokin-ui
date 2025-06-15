'use client'
import useSolPrice from "@/features/useSolPrice";
import { useTiktok } from "@/features/useTiktok";
import BigNumber from "bignumber.js";
import { BondingCurveAccount, LIMIT } from "@/features/useTokensList";
import { TokenWithPriceDto } from "@/shared/api/tiktokin.ts";
import { formatValue } from "@/shared/utils";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const TokenCard = ({ token, index, curveAccount }: { token: TokenWithPriceDto, index: number, curveAccount: BondingCurveAccount }) => {
  const { price: solPrice } = useSolPrice()
  const data = useTiktok(token.video_url ?? undefined)
  const [startLoading, setStartLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const router = useRouter()

  const handleMouseEnter = () => {
    setStartLoading(true);
    setShowTiktok(true)
  }

  const handleMouseLeave = () => {
    setShowTiktok(false)
  }

  const [showTiktok, setShowTiktok] = useState(false);

  const marketCap = new BigNumber(token.price).multipliedBy(curveAccount.realTokenReserves).multipliedBy(solPrice).dividedBy(LAMPORTS_PER_SOL).toString()

  return (
    <div 
      className="group cursor-pointer max-w-80 flex flex-col relative overflow-hidden rounded-2xl border border-[#2D2D2D] bg-[#121212] hover:border-white/20 transition-all animate-border-glow"
      onClick={() => {
        router.push(`/tiktokin/${token.id}`);
      }}
      style={{
        animation: 'borderGlow 0.8s ease-out',
        animationDelay: `${((index % LIMIT) || 0) * 0.05}s`,
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0), 0 0 20px rgba(255, 255, 255, 0)',
      }}
    >
      <style jsx>{`
        @keyframes borderGlow {
          0% {
            border-color: #2D2D2D;
            box-shadow: 0 0 0 0px transparent;
            transform: scale(1);
          }
          30% {
            border-color: rgba(255, 215, 0, 0.8);
            box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2);
            transform: scale(1.01);
          }
          70% {
            border-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
            transform: scale(1.005);
          }
          100% {
            border-color: #2D2D2D;
            box-shadow: 0 0 0 0px transparent;
            transform: scale(1);
          }
        }
      `}</style>
      <div className="h-70 relative bg-[#1D1D1D]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {
          token.video_url && data && (
            <>
            <img
              src={data.thumbnail_url}
              alt="thumbnail"
              className="w-full h-full absolute top-0 left-0"
              style={{ opacity: showTiktok || !data.thumbnail_url ? 0 : 1 }}
            />

            {startLoading && <iframe
              src={`https://www.tiktok.com/player/v1/${data.embed_product_id}?music_info=0&description=0&controls=0&volume_control=0&loop=1&closed_caption=0&native_context_menu=0&timestamp=0&fullscreen_button=0&rel=0&autoplay=1`}
              className="w-full h-full absolute top-0 left-0"
              style={{ opacity: showTiktok || !data.thumbnail_url ? 1 : 0 }}
              title="test"
            ></iframe>}
            </>
          )
        }
      </div>
      
      <div className="p-3 flex flex-col justify-between pb-16">
        <div className="flex items-center gap-3 mb-4">
          <img className="h-10 w-10 rounded-full bg-[#1D1D1D] border border-[#2D2D2D]" src={token.uri} alt={token.name} width={40} height={40} />
          <div>
            <h3 className="font-medium text-[15px] text-white/90">{token.name}</h3>
            <p className="text-sm text-[#666666]">${token.symbol.toUpperCase()}</p>
          </div>
        </div>
        
        <p className="text-sm text-[#999999] line-clamp-3">
         {data?.title}

         {' '}@{data?.author_name}
        </p>

        <div className="mt-3 p-1.5 bg-gradient-to-r from-[#1A1A1A] to-[#252525] rounded-lg border border-[#333333] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#888888] uppercase tracking-wide">Market Cap</span>
            <span className="text-sm font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
              {formatValue(Number(marketCap), '$0,0.00')}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-[#2D2D2D] flex justify-between items-center absolute bottom-4 left-4 right-4">
          <span className="font-mono text-xs text-[#666666]">{token.address.slice(0, 6)}...{token.address.slice(-8)}</span>
          <button 
            className="text-xs text-[#666666] transition-all duration-200" 
            onClick={(e) => {
              e.stopPropagation(); 
              navigator.clipboard.writeText(token.address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? (
              <IconCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <IconCopy className="w-4 h-4 cursor-pointer hover:brightness-145" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 