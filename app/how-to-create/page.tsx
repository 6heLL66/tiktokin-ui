import Link from "next/link";

export default function HowToCreate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b1e] to-[#141517] p-2 sm:p-8 pb-20 lg:p-16">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="space-y-12 sm:space-y-16 py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-6 text-center">
            <h1 className="text-white/80 text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent leading-tight">
              How to Create TikTokens
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              Step-by-step guide to creating blockchain tokens from TikTok content
            </p>
          </div>

          <div className="grid gap-8 sm:gap-12">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-30"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Getting Started</h2>
                </div>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  Creating TikTokens is a simple 3-step process that allows you to tokenize any TikTok video content. 
                  Follow our guide to transform viral content into tradeable blockchain tokens and start earning passive income.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 21h13L17 4m-5 6v6m-4-3v3" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Step 1: Choose TikTok</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Find an engaging TikTok video and comment with our template: @tiktokinsol {"{token_name}"} + {"{symbol}"}
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Step 2: Find Token</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Visit our platform and search for your newly created token by name or symbol
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Step 3: Connect Account</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Authorize through TikTok to verify ownership and start earning 50% trading commissions
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
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Token Template</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Comment Format</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4">
                    Use this exact template when commenting on TikTok videos to create tokens automatically
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-green-400 border border-green-500/30">
                    @tiktokin {"{token_name}"} {"{symbol}"}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Example Usage</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4">
                    Here's how your comment should look when creating a token for a dance video
                  </p>
                  <div className="bg-blue-500/10 rounded-lg p-4 font-mono text-blue-300 border border-blue-500/30">
                    @tiktokinsol ViralDance + DANCE
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-white/20 p-6 sm:p-8 lg:p-12 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Platform Limitations</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Daily Creation Limit</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4">
                    Each account can create maximum <span className="font-bold text-red-300">3 tokens per day</span> to maintain quality and prevent spam
                  </p>
                  <div className="flex items-center gap-2 text-red-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Quality Control</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Content Exclusivity</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-4">
                    Each TikTok video can only have <span className="font-bold text-orange-300">one associated token</span> to ensure value
                  </p>
                  <div className="flex items-center gap-2 text-orange-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Value Protection</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Ready to start?
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
                Begin creating tokens from your favorite TikTok content and start earning passive income
              </p>
              <div className="flex justify-center">
                <Link href="https://tiktok.com" target="_blank">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg rounded-2xl hover:from-primary-400 hover:to-secondary-400 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 hover:scale-105 transform overflow-hidden border-2 border-white/20 hover:border-white/40">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-3">
                    <span>Create Your First Token</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
