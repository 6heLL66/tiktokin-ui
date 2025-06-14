'use client'

import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1011] to-[#1A1B1E] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        <div className="mb-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#14F195] hover:text-[#13E085] transition-colors duration-200 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#14F195] to-[#13E085] bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Please read these terms carefully before using our decentralized application and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1B1E]/80 backdrop-blur-sm border border-[#2A2B2E]/60 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 lg:p-8 space-y-8">
              
              <div className="border-b border-[#2A2B2E]/40 pb-6">
                <p className="text-[#9CA3AF] text-sm mb-4">Last updated: June 2025</p>
                <p className="text-white leading-relaxed">
                  These Terms of Service ("Terms") govern your use of TikTokin, a decentralized application built on the Solana blockchain. By accessing or using our platform, you agree to be bound by these terms.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  Acceptance of Terms
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6">
                  <p className="text-[#9CA3AF] leading-relaxed mb-4">
                    By accessing TikTokin, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our platform.
                  </p>
                  <div className="bg-[#14F195]/10 border border-[#14F195]/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#14F195] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-[#14F195]">
                        <strong>Important:</strong> You must be at least 18 years old to use this platform and legally capable of entering into binding agreements.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  Platform Description
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6 space-y-4">
                  <p className="text-[#9CA3AF] leading-relaxed">
                    TikTokin is a decentralized application that enables users to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
                        Token Trading
                      </h3>
                      <p className="text-sm text-[#9CA3AF]">Buy and sell tokens through automated market makers</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
                        Content Integration
                      </h3>
                      <p className="text-sm text-[#9CA3AF]">Connect TikTok content with blockchain tokens</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
                        Wallet Integration
                      </h3>
                      <p className="text-sm text-[#9CA3AF]">Connect Solana wallets for seamless transactions</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#14F195] rounded-full"></div>
                        Liquidity Provision
                      </h3>
                      <p className="text-sm text-[#9CA3AF]">Participate in automated market making pools</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  User Responsibilities
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6">
                  <p className="text-[#9CA3AF] leading-relaxed mb-4">
                    As a user of TikTokin, you agree to:
                  </p>
                  <ul className="space-y-3 text-[#9CA3AF]">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use the platform only for lawful purposes and in accordance with these Terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Maintain the security of your wallet and private keys</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Not attempt to manipulate prices or engage in fraudulent activities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Comply with all applicable laws and regulations in your jurisdiction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Not interfere with the platform's operation or security measures</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  Risks and Disclaimers
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6 space-y-4">
                  <div className="bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h3 className="text-[#FF6B6B] font-medium mb-2">High Risk Warning</h3>
                        <p className="text-sm text-[#FF6B6B]">
                          Trading digital assets involves substantial risk and may result in complete loss of funds. Only invest what you can afford to lose.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Market Volatility</h3>
                      <p className="text-sm text-[#9CA3AF]">Token prices can fluctuate rapidly and unpredictably</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Smart Contract Risk</h3>
                      <p className="text-sm text-[#9CA3AF]">Blockchain technology carries inherent technical risks</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Regulatory Risk</h3>
                      <p className="text-sm text-[#9CA3AF]">Cryptocurrency regulations may change and affect platform operation</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Irreversible Transactions</h3>
                      <p className="text-sm text-[#9CA3AF]">Blockchain transactions cannot be reversed once confirmed</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  Limitation of Liability
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6">
                  <p className="text-[#9CA3AF] leading-relaxed mb-4">
                    To the maximum extent permitted by law, TikTokin and its developers shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from:
                  </p>
                  <ul className="space-y-2 text-[#9CA3AF] text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Use or inability to use the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Loss of funds, tokens, or digital assets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Smart contract vulnerabilities or failures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Third-party actions or service interruptions</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  Modifications and Termination
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Terms Updates</h3>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the platform constitutes acceptance of updated Terms.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Service Availability</h3>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      We may modify, suspend, or discontinue the platform at any time without prior notice. We are not liable for any modification, suspension, or discontinuation of services.
                    </p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 