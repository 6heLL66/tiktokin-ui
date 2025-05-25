import { WalletConnect } from "@/app/solana/WalletProvider/ui";

export default function Header() {
  return (
    <header className="h-16 fixed top-0 right-0 left-[288px] z-10 flex items-center justify-end px-4 bg-[#1a1b1e] border border-[#2A2A2A]">
      <WalletConnect />
    </header>
  );
} 