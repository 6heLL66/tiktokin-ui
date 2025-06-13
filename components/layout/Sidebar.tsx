'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconCoin, IconBrandTwitter, IconBrandTiktok, IconInfoCircle, IconQuestionMark, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
            <div className="w-15 h-15 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white shadow-lg shadow-black/20 ring-1 ring-white/5 relative overflow-hidden before:absolute before:inset-[1px] before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:z-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent"></div>
              <Image className="absolute inset-0 flex items-center justify-center" src="/logo.jpg" alt="Logo" width={120} height={120} />
            </div>
            <div className="flex flex-col md:hidden lg:flex">
              <span className="text-2xl lg:text-2xl font-bold text-zinc-100">
                TikTokIn
              </span>
              <span className="text-xs text-zinc-500">Create. Earn. Repeat.</span>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            {[
              { href: "/", icon: IconHome, label: "TikTokins" },
              { href: "/tiktokin/11111111", icon: IconCoin, label: "TikTokIn Token" },
              { href: "/what-is-tiktokin", icon: IconQuestionMark, label: "What is Tiktokin?" },
              { href: "/how-to-create", icon: IconInfoCircle, label: "How to create " },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={false}
                  replace={true}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 md:gap-0 lg:gap-4 px-4 md:px-2 lg:px-4 py-3.5 md:py-4 lg:py-3.5 rounded-xl transition-all duration-200 group relative md:justify-center lg:justify-start ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 shadow-lg shadow-violet-500/10' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.02]'
                  }`}
                >
                  <item.icon 
                    size={22} 
                    className={`group-hover:scale-110 transition-transform duration-200 md:mx-auto lg:mx-0 ${
                      isActive ? 'text-violet-400' : 'group-hover:text-zinc-200'
                    }`}
                    stroke={1.5}
                  />
                  <span className={`font-medium tracking-wide md:hidden lg:inline ${
                    isActive ? 'text-white' : ''
                  }`}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 md:p-4 border-t border-zinc-800/50 bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="flex items-center justify-center gap-8 md:gap-4 lg:gap-8 md:flex-col lg:flex-row">
            {[
              { href: "https://x.com/Tiktokinsol", icon: IconBrandTwitter },
              { href: "https://tiktok.com/@tiktokinsol", icon: IconBrandTiktok },
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