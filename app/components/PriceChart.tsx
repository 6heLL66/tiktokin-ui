'use client'

import { createChart, CandlestickSeries, ColorType, CandlestickData } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface PriceChartProps {
  data: CandlestickData[];
}

export function PriceChart({ data }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        textColor: 'rgba(255, 255, 255, 0.8)',
        background: { 
          type: ColorType.Solid, 
          color: 'transparent' 
        }
      },
      grid: {
        vertLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1,
          style: 3,
        },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      height: 400,
      width: chartContainerRef.current.clientWidth
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444'
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="w-full rounded-2xl bg-[#121212]/80 p-6 backdrop-blur-sm border border-white/5 shadow-lg">
      <div ref={chartContainerRef} className="rounded-xl overflow-hidden" />
    </div>
  );
} 