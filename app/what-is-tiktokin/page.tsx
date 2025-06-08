export default function WhatIsTikTokin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b1e] to-[#141517] p-2 sm:p-8 pb-20 lg:p-16">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="space-y-12 sm:space-y-16 py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-6 text-center">
            <h1 className="text-white/80 text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent leading-tight">
              What is TikTokin?
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              Revolutionary platform for creating tokens based on TikTok content on the Solana network
            </p>
          </div>

          <div className="grid gap-8 sm:gap-12">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-30"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Core Concept</h2>
                </div>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  TikTokin is a unique token on the Solana blockchain that is created automatically through TikTok comments. 
                  When a user comments on a video with a specific tag containing the token name and symbol, 
                  the system automatically generates a new token and links it to that TikTok video.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Token Creation</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Comment on TikTok videos with a special tag containing the token name and symbol for automatic creation
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Automatic Linking</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Token is automatically linked to the TikTok video and becomes available for viewing and trading
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Trading Platform</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Trade tokens on the platform using the pump.fun principle with profit opportunities
                </p>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-white/20 p-6 sm:p-8 lg:p-12 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Reward System</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">For Token Creators</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4">
                    Token creator receives <span className="font-bold text-primary-300">50% of all trading fees</span> from their token
                  </p>
                  <div className="flex items-center gap-2 text-green-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Passive Income</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">For Traders</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4">
                    Trade tokens like on pump.fun with opportunities to profit from content popularity growth
                  </p>
                  <div className="flex items-center gap-2 text-blue-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Active Trading</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Ready to start?
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
                Join the Web3 revolution and start creating tokens based on your favorite TikTok content
              </p>
              <div className="flex justify-center">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg rounded-2xl hover:from-primary-400 hover:to-secondary-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 hover:scale-105 transform overflow-hidden border-2 border-white/20 hover:border-white/40">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-3">
                    <span>Explore Tokens</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
