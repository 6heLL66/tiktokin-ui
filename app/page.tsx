import { TokenCard } from "./components/TokenCard"

export default function Home() {
  return (
    <div className="grid bg-[#1a1b1e] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col w-full max-w-8xl gap-12">
        <section className="w-full space-y-8">
          <h1 className="text-3xl font-medium text-white/90">
            Discover Tokens
          </h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full px-6 py-4 bg-[#121212] rounded-2xl border border-[#2D2D2D] focus:border-white/20 outline-none transition-all text-white/90 text-sm"
            />
          </div>
          
          <div className="flex gap-4 items-center flex-wrap">
            <h2 className="text-[15px] font-medium text-white/90">Sort by:</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2.5 rounded-xl bg-[#121212] hover:bg-[#1D1D1D] border border-[#2D2D2D] hover:border-white/20 transition-all text-white/80 text-sm">
                Market Cap
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-[#121212] hover:bg-[#1D1D1D] border border-[#2D2D2D] hover:border-white/20 transition-all text-white/80 text-sm">
                Last Trade
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-[#121212] hover:bg-[#1D1D1D] border border-[#2D2D2D] hover:border-white/20 transition-all text-white/80 text-sm">
                Creation Time
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <TokenCard key={i} index={i} />
          ))}
        </section>
      </main>
    </div>
  );
}
