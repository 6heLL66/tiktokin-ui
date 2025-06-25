import { WalletConnect } from "@/app/solana/WalletProvider/ui";

export default function Header() {
  return (
    <header className="h-16 fixed top-0 right-0 left-0 lg:left-[288px] z-100000 flex items-center justify-between lg:justify-end px-4 lg:px-6 bg-gradient-to-r from-[#1a1b1e] to-[#2a2b2e] border-b border-[#2A2A2A] backdrop-blur-sm shadow-lg">
      <div className="flex lg:hidden">
        <button className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
        <WalletConnect />
      </div>
    </header>
  );
} 