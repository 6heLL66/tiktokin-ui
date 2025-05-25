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
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-[#2D2D2D] bg-[#121212] hover:border-white/20 transition-all">
              <div className="h-40 relative overflow-hidden bg-[#1D1D1D]">
                <div className="absolute bottom-4 left-4 bg-[#121212]/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/90">
                  Featured
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#1D1D1D] border border-[#2D2D2D]"></div>
                  <div>
                    <h3 className="font-medium text-[15px] text-white/90">Token Name {i}</h3>
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
          ))}
        </section>
      </main>
    </div>
  );
}
