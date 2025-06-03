import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SlippageStore {
  slippage: number
  setSlippage: (value: number) => void
}

export const useSlippage = create<SlippageStore>()(
  persist(
    (set) => ({
      slippage: 0.5,
      setSlippage: (value: number) => set({ slippage: value }),
    }),
    {
      name: 'slippage-storage',
    }
  )
)
