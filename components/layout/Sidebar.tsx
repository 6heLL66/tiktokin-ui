'use client'
import Link from "next/link";
import { IconHome, IconCoin, IconBrandDiscord, IconBrandTwitter, IconBrandTiktok, IconInfoCircle, IconQuestionMark, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-2 left-4 z-50 p-3 bg-[#1a1b1e] border border-zinc-800/50 rounded-xl text-zinc-400 hover:text-zinc-100 transition-all duration-200 shadow-lg shadow-black/20"
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        w-72 lg:w-72 md:w-20 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40
        bg-[#1a1b1e] border-r border-zinc-800/50 shadow-xl shadow-black/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 md:p-4">
          <div className="flex items-center gap-4 mb-12 px-2 md:justify-center lg:justify-start">
            <div className="w-14 h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white shadow-lg shadow-black/20 ring-1 ring-white/5 relative overflow-hidden before:absolute before:inset-[1px] before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:z-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 md:w-6 md:h-6 lg:w-8 lg:h-8">
                  <path d="M6 8H26V12H6V8Z" fill="rgba(255,255,255,0.9)"/>
                  <path d="M14 14H18V24H14V14Z" fill="rgba(255,255,255,0.9)"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col md:hidden lg:flex">
              <span className="text-2xl lg:text-2xl font-bold text-zinc-100">
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
              { href: "/how-to-create", icon: IconInfoCircle, label: "How to create " },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 md:gap-0 lg:gap-4 px-4 md:px-2 lg:px-4 py-3.5 md:py-4 lg:py-3.5 text-zinc-400 hover:text-zinc-100 rounded-xl transition-all duration-200 group hover:bg-white/[0.02] relative md:justify-center lg:justify-start"
              >
                <item.icon 
                  size={22} 
                  className="group-hover:scale-110 transition-transform duration-200 group-hover:text-zinc-200 md:mx-auto lg:mx-0" 
                  stroke={1.5}
                />
                <span className="font-medium tracking-wide md:hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 md:p-4 border-t border-zinc-800/50 bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="flex items-center justify-center gap-8 md:gap-4 lg:gap-8 md:flex-col lg:flex-row">
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
    </>
  );
} 