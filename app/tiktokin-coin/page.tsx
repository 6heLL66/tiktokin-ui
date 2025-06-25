export default function TIKCoinPage() {
  return (
    <div className="min-h-screen bg-black p-2 sm:p-8 pb-20 lg:p-16 relative overflow-hidden">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="space-y-12 sm:space-y-16 py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-6 text-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-4 left-1/4 w-4 h-4 bg-pink-400 rounded-full opacity-25 animate-ping"></div>
              
              <h1 className="relative text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                $TIK
              </h1>
              
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              The revolutionary token powering the future of social media trading on Solana
            </p>
            <div className="flex items-center justify-center gap-2 text-pink-500">
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
              <span className="text-sm font-medium">Launching on pump.fun</span>
            </div>
          </div>

          <div className="grid gap-8 sm:gap-12">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 lg:p-12 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/25">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Why $TIK?</h2>
                </div>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  $TIK is the native token of the TIK platform - the first-ever social media trading ecosystem 
                  that automatically creates tokens from TikTok content. As the platform grows, so does the value of $TIK, 
                  making it the perfect investment for the future of Web3 social trading.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="rounded-xl sm:rounded-2xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/25">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Platform Growth</h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Every new token created on TikTokIn increases the platform's value and utility, directly benefiting $TIK holders
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/25">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Revenue Sharing</h3>
                <p className="text-sm sm:text-base text-gray-400">
                  $TIK holders receive a share of all trading fees generated across the entire TIK ecosystem
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-500 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/25">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Community Driven</h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Join thousands of creators and traders in the fastest-growing social trading community on Solana
                </p>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-gray-900/50 border border-gray-800 p-6 sm:p-8 lg:p-12 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-pink-500/5 rounded-full -translate-y-20 -translate-x-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/5 rounded-full translate-y-16 translate-x-16"></div>
              
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/25">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Launch Details</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Pump.fun Launch</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4">
                    $TIK will be launched on <span className="font-bold text-pink-500">pump.fun</span> - the premier token launch platform on Solana, 
                    ensuring maximum visibility and trading volume from day one.
                  </p>
                  <div className="flex items-center gap-2 text-pink-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Early Access Opportunity</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Tokenomics</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4">
                    Strategic token distribution with locked liquidity, ensuring long-term stability and growth potential for all holders.
                  </p>
                  <div className="flex items-center gap-2 text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Sustainable Growth</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6 sm:space-y-8">
              <div className="relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-pink-500 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Don't Miss the Launch!
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Join the revolution and be part of the future of social media trading. $TIK is launching on pump.fun - 
                your gateway to the next big thing in Web3.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://pump.fun" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative px-10 py-5 bg-pink-500 text-white font-bold text-lg rounded-2xl hover:bg-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-105 transform overflow-hidden border-2 border-pink-400 hover:border-pink-300"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                  <div className="relative flex items-center gap-3">
                    <span>Launch on pump.fun</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
                <a 
                  href="/" 
                  className="group relative px-10 py-5 bg-gray-900/50 border border-gray-700 text-white font-bold text-lg rounded-2xl hover:bg-gray-800/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform overflow-hidden"
                >
                  <div className="relative flex items-center gap-3">
                    <span>Explore Platform</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
