import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChartSettingsStore {
    chartInterval: number
    chartType: 'price' | 'marketcap'
    setChartInterval: (interval: number) => void
    setChartType: (type: 'price' | 'marketcap') => void
}

export const useChartSettings = create<ChartSettingsStore>()(
  persist(
    (set) => ({
      chartInterval: 60,
      chartType: 'price',
      setChartInterval: (interval: number) => set({ chartInterval: interval }),
      setChartType: (type: 'price' | 'marketcap') => set({ chartType: type }),
    }),
    {
      name: 'chart-interval-storage',
    }
  )
)
    