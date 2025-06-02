'use client'
import { TokenCard } from "@/app/components/TokenCard";
import { useTokensList } from "@/features/useTokensList";
import { MoonLoader } from "react-spinners";


export function TokensList() {
    const { query, tokens } = useTokensList();

    return (
        <main className="mx-auto max-w-8xl">
            <section className="space-y-10">
          <div className="flex flex-col gap-4">
            <h1 className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              Discover Tokens
            </h1>
            <p className="text-lg text-white/60">
              Explore and find the most promising tokens in the market
            </p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search tokens..."
              className="w-full rounded-2xl bg-[#121212]/80 px-6 py-5 text-base backdrop-blur-sm
                border border-white/5 hover:border-white/10
                focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/5
                transition-all duration-200 text-white/90"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
              ⌘K
            </div>
          </div>
          
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-[15px] font-medium text-white/90">Sort by:</h2>
              <div className="flex flex-wrap gap-2">
                <button className="rounded-xl bg-white/5 px-5 py-3 text-sm font-medium
                  text-white/80 hover:bg-white/10 hover:text-white
                  border border-white/5 hover:border-white/10
                  transition-all duration-200">
                  Market Cap
                </button>
                <button className="rounded-xl bg-white/5 px-5 py-3 text-sm font-medium
                  text-white/80 hover:bg-white/10 hover:text-white
                  border border-white/5 hover:border-white/10
                  transition-all duration-200">
                  Last Trade
                </button>
                <button className="rounded-xl bg-white/5 px-5 py-3 text-sm font-medium
                  text-white/80 hover:bg-white/10 hover:text-white
                  border border-white/5 hover:border-white/10
                  transition-all duration-200">
                  Creation Time
                </button>
              </div>
            </div>
          </div>
        </section>

        {tokens && !query.isFetching ? <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {tokens.map((token, i) => (
            <TokenCard key={token.address} token={token} index={i} />
          ))}
        </section> : <div className="flex justify-center mt-24 items-center w-full"><MoonLoader color='white' className="mb-48" /></div>}
      </main>
  );
}
