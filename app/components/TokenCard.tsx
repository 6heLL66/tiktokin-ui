'use client'
import { useRouter } from "next/navigation";

export const TokenCard = ({ index }: { index: number }) => {
  const router = useRouter();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#2D2D2D] bg-[#121212] hover:border-white/20 transition-all" onClick={() => router.push(`/tiktokin/${index}`)}>
      <div className="h-40 relative overflow-hidden bg-[#1D1D1D]">
        <div className="absolute bottom-4 left-4 bg-[#121212]/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90">
          Featured
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-[#1D1D1D] border border-[#2D2D2D]"></div>
          <div>
            <h3 className="font-medium text-[15px] text-white/90">Token Name {index}</h3>
            <p className="text-sm text-[#666666]">$SYMBOL</p>
          </div>
        </div>
        
        <p className="text-sm text-[#999999] line-clamp-2">
          A revolutionary DeFi token bringing innovative solutions to the blockchain space.
        </p>
        
        <div className="mt-4 pt-4 border-t border-[#2D2D2D] flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-[#666666]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
            Active
          </div>
          <span className="font-mono text-xs text-[#666666]">0x1234...5678</span>
        </div>
      </div>
    </div>
  )
} 