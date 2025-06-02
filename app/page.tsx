import { TokensList } from "@/components/TokensList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b1e] to-[#141517] p-8 pb-20 sm:p-20">
      <TokensList />
    </div>
  );
}
