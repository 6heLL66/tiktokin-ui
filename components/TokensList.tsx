'use client'
import { TokenCard } from "@/app/components/TokenCard";
import { SORT_BY, useTokensList } from "@/features/useTokensList";
import { useEffect, useMemo, useRef, useState } from "react";
import { MoonLoader, PropagateLoader } from "react-spinners";
import { debounce } from "lodash";

export function TokensList() {
    const markerRef = useRef<HTMLDivElement>(null);
    const { query, tokens, isLoading, sortBy, setSortBy, loadMore, setSearnTerm } = useTokensList();;

    const [searchInput, setSearchInput] = useState("");

    const searchDebounce = useMemo(() => debounce((search: string) => setSearnTerm(search), 500), []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);

      searchDebounce(e.target.value);
    }

    useEffect(() => {
        if (!markerRef.current) {
          return;
        }

        const handler = () => {
         
          if (markerRef.current) {
            const rect = markerRef.current?.getBoundingClientRect();

            if (rect.top < 1000 && tokens.length < Number(query.data?.total)) {
              loadMore();
            }
           
          }
        }

        window.addEventListener('scroll', handler);

        return () => {
          window.removeEventListener('scroll', handler);
        }
    }, [tokens, query, markerRef]);

    return (
        <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <section className="space-y-6 sm:space-y-10 py-6 sm:py-8">
          <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
            <h1 className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent leading-tight">
              Discover Tokens
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto sm:mx-0">
              Explore and find the most promising tokens in the market
            </p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search tokens..."
              className="w-full rounded-xl sm:rounded-2xl bg-[#121212]/80 px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base backdrop-blur-sm
                border border-white/5 hover:border-white/10
                focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/5
                transition-all duration-200 text-white/90 placeholder-white/50"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/40">
              {query.isFetching && <MoonLoader color="white" size={16} className="mr-1 sm:mr-2" />}
            </div>
          </div>
          
          <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <h2 className="text-sm sm:text-[15px] font-medium text-white/90 text-center sm:text-left">Sort by:</h2>
              <div className="flex gap-2 sm:gap-2 justify-center sm:justify-start">
                <button 
                  onClick={() => setSortBy(SORT_BY.MARKET_CAP)}
                  className={`flex-1 sm:flex-none rounded-lg sm:rounded-xl px-4 sm:px-5 cursor-pointer py-2.5 sm:py-3 text-xs sm:text-sm font-medium border transition-all duration-200 ${
                    sortBy === SORT_BY.MARKET_CAP 
                      ? 'bg-white/15 text-white border-white/20 shadow-lg' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-white/5 hover:border-white/10'
                  }`}>
                  Market Cap
                </button>
                <button 
                  onClick={() => setSortBy(SORT_BY.CREATION_TIME)}
                  className={`flex-1 sm:flex-none rounded-lg sm:rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 cursor-pointer text-xs sm:text-sm font-medium border transition-all duration-200 ${
                    sortBy === SORT_BY.CREATION_TIME 
                      ? 'bg-white/15 text-white border-white/20 shadow-lg' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-white/5 hover:border-white/10'
                  }`}>
                  Creation Time
                </button>
              </div>
            </div>
          </div>
        </section>

        {tokens && !query.isFetching && <section className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-0 w-full">
          {tokens.map((token, i) => (
            <TokenCard key={token.address} token={token} index={i} />
          ))}
        </section>}

        {tokens && !query.isFetching && <div ref={markerRef} className="opacity-0 h-1">marker</div>}

        {(query.isFetching || isLoading) && <div className="flex justify-center items-center mt-16 sm:mt-24 w-full pb-8"><PropagateLoader color='white' size={8} /></div>}
      </main>
  );
}
