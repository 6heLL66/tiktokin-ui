'use client'
import { TokenDto } from "@/shared/api/tiktokin.ts";
import { IconCopy } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const TokenCard = ({ token }: { token: TokenDto, index: number }) => {
  const router = useRouter();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#2D2D2D] bg-[#121212] hover:border-white/20 transition-all" onClick={() => router.push(`/tiktokin/${token.address}`)}>
      <div className="h-40 relative overflow-hidden bg-[#1D1D1D]">
        <div className="absolute bottom-4 left-4 bg-[#121212]/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90">
          Featured
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <img className="h-10 w-10 rounded-full bg-[#1D1D1D] border border-[#2D2D2D]" src={token.uri} alt={token.name} width={40} height={40} />
          <div>
            <h3 className="font-medium text-[15px] text-white/90">{token.name}</h3>
            <p className="text-sm text-[#666666]">${token.symbol}</p>
          </div>
        </div>
        
        <p className="text-sm text-[#999999] line-clamp-2">
         {token.name} description
        </p>
        
        <div className="mt-4 pt-4 border-t border-[#2D2D2D] flex justify-between items-center">
          <span className="font-mono text-xs text-[#666666]">{token.address.slice(0, 6)}...{token.address.slice(-8)}</span>
          <button className="text-xs text-[#666666]" onClick={() => navigator.clipboard.writeText(token.address)}><IconCopy className="w-4 h-4 cursor-pointer hover:brightness-145" /></button>
        </div>
      </div>
    </div>
  )
} 