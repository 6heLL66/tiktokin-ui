'use client'
import { useTiktok } from "@/features/useTiktok";
import { TokenDto } from "@/shared/api/tiktokin.ts";
import { IconCopy } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const TokenCard = ({ token }: { token: TokenDto, index: number }) => {
  const router = useRouter();
  const data = useTiktok(token.video_url ?? undefined)

  const [showTiktok, setShowTiktok] = useState(false);

  return (
    <div className="group cursor-pointer max-w-80 relative overflow-hidden rounded-2xl border border-[#2D2D2D] bg-[#121212] hover:border-white/20 transition-all" onClick={() => router.push(`/tiktokin/${token.address}`)}>
      <div className="h-60 relative bg-[#1D1D1D]" onMouseEnter={() => setShowTiktok(true)} onMouseLeave={() => setShowTiktok(false)}>
        {
          token.video_url && data && (
            // <div dangerouslySetInnerHTML={{ __html: data?.html ?? '' }} className="w-full h-full" />
            <>
            <img
              src={data.thumbnail_url}
              alt="thumbnail"
              className="w-full h-full absolute top-0 left-0"
              style={{ opacity: showTiktok ? 0 : 1 }}
            />

            <iframe
              src={`https://www.tiktok.com/player/v1/${data.embed_product_id}?music_info=0&description=0&controls=0&volume_control=0&loop=1&closed_caption=0&native_context_menu=0&timestamp=0&fullscreen_button=0&rel=0&autoplay=1`}
              className="w-full h-full absolute top-0 left-0"
              style={{ opacity: showTiktok ? 1 : 0 }}
              title="test"
            ></iframe>
            </>
          )
        }
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <img className="h-10 w-10 rounded-full bg-[#1D1D1D] border border-[#2D2D2D]" src={token.uri} alt={token.name} width={40} height={40} />
          <div>
            <h3 className="font-medium text-[15px] text-white/90">{token.name}</h3>
            <p className="text-sm text-[#666666]">${token.symbol.toUpperCase()}</p>
          </div>
        </div>
        
        <p className="text-sm text-[#999999] line-clamp-2">
         {data?.title}
        </p>
        
        <div className="mt-4 pt-4 border-t border-[#2D2D2D] flex justify-between items-center">
          <span className="font-mono text-xs text-[#666666]">{token.address.slice(0, 6)}...{token.address.slice(-8)}</span>
          <button className="text-xs text-[#666666]" onClick={() => navigator.clipboard.writeText(token.address)}><IconCopy className="w-4 h-4 cursor-pointer hover:brightness-145" /></button>
        </div>
      </div>
    </div>
  )
} 