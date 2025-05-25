import Link from "next/link";
import { IconHome, IconCoin, IconBrandDiscord, IconBrandTwitter, IconBrandTiktok, IconInfoCircle, IconQuestionMark } from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 bg-[#1a1b1e] border-r border-zinc-800/50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20 ring-1 ring-violet-400/20">
            TI
          </div>
          <span className="text-2xl font-semibold bg-gradient-to-br from-violet-200 to-violet-400 bg-clip-text text-transparent">
            TikTokIn
          </span>
        </div>
        
        <nav className="space-y-2">
          {[
            { href: "/", icon: IconHome, label: "TikTokins" },
            { href: "/token", icon: IconCoin, label: "TikTokIn Token" },
            { href: "/what-is-tiktokin", icon: IconQuestionMark, label: "What is Tiktokin?" },
            { href: "/how-to-create-tiktokin", icon: IconInfoCircle, label: "How to create " },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3.5 text-zinc-400 hover:text-zinc-100 rounded-xl transition-all duration-200 group hover:bg-zinc-800/50 relative"
            >
              <item.icon 
                size={22} 
                className="group-hover:scale-110 transition-transform duration-200 group-hover:text-violet-400" 
                stroke={1.5}
              />
              <span className="font-medium tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-zinc-800/50">
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