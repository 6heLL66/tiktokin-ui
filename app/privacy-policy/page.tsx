'use client'

import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1B1E]/80 backdrop-blur-sm border border-[#2A2B2E]/60 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 lg:p-8 space-y-8">
              
              <div className="border-b border-[#2A2B2E]/40 pb-6">
                <p className="text-[#9CA3AF] text-sm mb-4">Last updated: December 2024</p>
                <p className="text-white leading-relaxed">
                  This Privacy Policy describes how TikTokin ("we," "our," or "us") collects, uses, and shares your personal information when you use our decentralized application and services.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Information We Collect
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Wallet Information</h3>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      We collect your public wallet address when you connect your Solana wallet to interact with our platform. This information is necessary for transaction processing and token trading.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Usage Data</h3>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      We may collect information about how you use our application, including transaction history, trading patterns, and interaction with smart contracts.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Technical Information</h3>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      We collect technical data such as IP addresses, browser type, and device information to improve our services and ensure security.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  How We Use Your Information
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6">
                  <ul className="space-y-3 text-[#9CA3AF]">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>To process transactions and facilitate token trading on the Solana blockchain</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>To provide and improve our decentralized application services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>To ensure security and prevent fraudulent activities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>To analyze usage patterns and optimize user experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#14F195] rounded-full mt-2 flex-shrink-0"></div>
                      <span>To comply with legal obligations and regulatory requirements</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  Data Sharing and Disclosure
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6 space-y-4">
                  <p className="text-[#9CA3AF] leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Service Providers</h3>
                      <p className="text-sm text-[#9CA3AF]">Trusted third-party services that help us operate our platform</p>
                    </div>
                    <div className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Legal Requirements</h3>
                      <p className="text-sm text-[#9CA3AF]">When required by law or to protect our rights and users</p>
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
                  Data Security
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6">
                  <p className="text-[#9CA3AF] leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your information, including:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { title: 'Encryption', desc: 'Data encrypted in transit and at rest' },
                      { title: 'Access Control', desc: 'Limited access to authorized personnel' },
                      { title: 'Regular Audits', desc: 'Continuous security monitoring and testing' }
                    ].map((item, index) => (
                      <div key={index} className="bg-[#1A1B1E]/60 border border-[#2A2B2E]/40 rounded-lg p-4 text-center">
                        <h3 className="text-white font-medium mb-2">{item.title}</h3>
                        <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#14F195] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  Contact Us
                </h2>
                <div className="bg-[#0F1011]/60 border border-[#2A2B2E]/40 rounded-xl p-6">
                  <p className="text-[#9CA3AF] leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 bg-[#14F195]/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#14F195]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span>privacy@tiktokin.app</span>
                    </div>
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