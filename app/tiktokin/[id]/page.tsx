import { FC } from 'react'
import {PriceChart} from '@/app/components/PriceChart'

const TiktokinPage: FC = () => {
  return (
    <div className="min-h-screen bg-[#0F1011] text-white p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        
        {/* Token Info Header */}
        <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#2A2B2E] border border-[#3A3B3E]" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Token Name</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#2A2B2E] text-xs text-[#707070]">
                  $SYMBOL
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#707070]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                  <span>Active</span>
                </div>
                <div>Vol: $123.4K</div>
                <div>MC: $13.4K</div>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-lg font-bold text-[#14F195]">$0.0000</div>
              <div className="text-xs text-[#14F195]">+12.34%</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Video Player */}
            <div className="aspect-[9/16] max-w-[300px] mx-auto bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-sm text-[#707070]">TikTok Video Player</span>
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Price Chart</h2>
                <div className="flex gap-1">
                  {['1H', '24H', '7D', '1M', 'ALL'].map((period) => (
                    <button key={period} className="px-2 py-1 rounded-md bg-[#2A2B2E] text-xs hover:bg-[#3A3B3E]">
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <PriceChart data={[{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }, { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 }, { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }]} />
            </div>

            {/* Chat Section */}
            <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold">Community Chat</h2>
                <div className="flex items-center gap-1.5 text-xs text-[#707070]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                  <span>1,234 online</span>
                </div>
              </div>
              <div className="h-[300px] bg-[#0F1011] border border-[#2A2B2E] rounded-md mb-3 p-3" />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-[#0F1011] border border-[#2A2B2E] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#9945FF]"
                />
                <button className="px-4 py-2 bg-[#9945FF] rounded-md text-sm font-medium hover:bg-[#8935FF]">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="w-[280px] shrink-0">
            <div className="bg-[#1A1B1E] border border-[#2A2B2E] rounded-lg p-4 sticky top-20">
              <h2 className="text-sm font-bold mb-3">Trade</h2>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-[#0F1011] border border-[#2A2B2E]">
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-[#707070]">Balance</span>
                    <span>1,234.56 USDC</span>
                  </div>
                  <div>
                    <label className="block text-xs text-[#707070] mb-1.5">Amount</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#1A1B1E] border border-[#2A2B2E] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#9945FF]"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button className="w-full py-2 bg-[#14F195] text-black rounded-md text-sm font-medium hover:bg-[#13E085]">
                  Buy Token
                </button>
                <button className="w-full py-2 bg-[#9945FF] rounded-md text-sm font-medium hover:bg-[#8935FF]">
                  Sell Token
                </button>
                <div className="text-center text-xs text-[#707070]">
                  1 USDC = 1000 TOKEN
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default TiktokinPage
