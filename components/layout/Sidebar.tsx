import Link from "next/link";
import { IconHome, IconCoin, IconBrandDiscord, IconBrandTwitter, IconBrandTiktok, IconInfoCircle, IconQuestionMark } from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 bg-[#1a1b1e] border-r border-zinc-800/50 shadow-xl shadow-black/20">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white shadow-lg shadow-black/20 ring-1 ring-white/5 relative overflow-hidden before:absolute before:inset-[1px] before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:z-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path d="M6 8H26V12H6V8Z" fill="rgba(255,255,255,0.9)"/>
                <path d="M14 14H18V24H14V14Z" fill="rgba(255,255,255,0.9)"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-zinc-100">
              TikTokIn
            </span>
            <span className="text-xs text-zinc-500">Web3 Social Platform</span>
          </div>
        </div>
        
        <nav className="space-y-1.5">
          {[
            { href: "/", icon: IconHome, label: "TikTokins" },
            { href: "/token", icon: IconCoin, label: "TikTokIn Token" },
            { href: "/what-is-tiktokin", icon: IconQuestionMark, label: "What is Tiktokin?" },
            { href: "/how-to-create-tiktokin", icon: IconInfoCircle, label: "How to create " },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3.5 text-zinc-400 hover:text-zinc-100 rounded-xl transition-all duration-200 group hover:bg-white/[0.02] relative"
            >
              <item.icon 
                size={22} 
                className="group-hover:scale-110 transition-transform duration-200 group-hover:text-zinc-200" 
                stroke={1.5}
              />
              <span className="font-medium tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-zinc-800/50 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="flex items-center justify-center gap-8">
          {[
            { href: "https://discord.gg/tiktokin", icon: IconBrandDiscord },
            { href: "https://twitter.com/tiktokin", icon: IconBrandTwitter },
            { href: "https://tiktok.com/@tiktokin", icon: IconBrandTiktok },
          ].map((social) => (
            <a
              key={social.href}
              href={social.href}
              className="text-zinc-400 hover:text-zinc-100 transition-all duration-200 hover:scale-110 hover:text-violet-400"
            >
              <social.icon size={24} stroke={1.5} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
} 