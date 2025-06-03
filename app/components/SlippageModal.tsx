'use client'

import { FC } from 'react'
import { useSlippage } from '@/features/useSlippage'

export const SlippageModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { slippage, setSlippage } = useSlippage()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-[#0A0B0E] border-[0.5px] border-[#1A1B1E] rounded-lg w-[360px] shadow-2xl">
        <div className="border-b border-[#1A1B1E] px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-white">Slippage Tolerance</h3>
            <button 
              onClick={onClose}
              className="text-[#404040] hover:text-[#808080] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-4 gap-2">
            {[0.5, 1, 2].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-2.5 rounded border text-sm font-medium transition-colors ${
                  slippage === value 
                    ? 'bg-[#1A1B1E] border-[#2A2B2E] text-white' 
                    : 'border-[#1A1B1E] text-[#808080] hover:border-[#2A2B2E]'
                }`}
              >
                {value}%
              </button>
            ))}

            <div className="relative">
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-transparent border border-[#1A1B1E] rounded text-sm font-medium text-white focus:outline-none focus:border-[#2A2B2E]"
                min="0.1"
                max="100"
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404040] text-sm">%</span>
            </div>
          </div>

          <div className="bg-[#0D0E11] border border-[#1A1B1E] rounded px-4 py-3">
            <div className="text-[13px] leading-5 text-[#808080]">
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </div>
          </div>

          {slippage > 5 && (
            <div className="flex items-start gap-3 bg-[#160B0B] border border-[#2B1515] rounded px-4 py-3">
              <svg className="w-4 h-4 text-[#FF4B4B] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="text-[13px] leading-5 text-[#FF4B4B]">
                High slippage tolerance. Your trade may be front-run.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 