'use client'

import { formatValue } from '@/shared/utils';
import { createChart, CandlestickSeries, ColorType, CandlestickData, DeepPartial, ChartOptions } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface PriceChartProps {
  data: CandlestickData[];
  isCap?: boolean;
}

export function PriceChart({ data, isCap }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions: DeepPartial<ChartOptions> = {
      layout: {
        textColor: 'rgba(255, 255, 255, 0.8)',
        background: { 
          type: ColorType.Solid, 
          color: 'transparent' 
        }
      },
      localization: {
        priceFormatter: (price: number) => {
          if (isCap) {
            if (price >= 1e12) {
              return `$${(price / 1e12).toFixed(1)}T`;
            }
            if (price >= 1e9) {
              return `$${(price / 1e9).toFixed(1)}B`;
            }
            if (price >= 1e6) {
              return `$${(price / 1e6).toFixed(1)}M`;
            }
            if (price >= 1e3) {
              return `$${(price / 1e3).toFixed(1)}K`;
            }
            return `$${price.toFixed(0)}`;
          }
          
          if (price < 0.001) {
            const priceStr = price.toString();
            const match = priceStr.match(/^0\.0*(\d+)/);
            if (match) {
              const afterDecimal = priceStr.split('.')[1];
              const leadingZeros = afterDecimal.match(/^0*/)?.[0].length || 0;
              
              if (leadingZeros > 15) {
                return `$${price.toExponential(2)}`;
              }
              
              const significantDigits = afterDecimal.substring(leadingZeros).substring(0, 3);
              
              const subscriptMap: { [key: string]: string } = {
                '0': '0', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
                '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
              };
              
              const subscriptZeros = leadingZeros.toString()
                .split('')
                .map(digit => subscriptMap[digit])
                .join('');
              
              return `$0.0₍${subscriptZeros}₎${significantDigits}`;
            }
            return `$${price.toFixed(8).replace(/\.?0+$/, '')}`;
          }
          if (price < 0.01) {
            return `$${price.toFixed(6).replace(/\.?0+$/, '')}`;
          }
          return `$${price.toFixed(2)}`;
        },
      },
      grid: {
        vertLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.05)',
          visible: true,
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
        secondsVisible: true,
        barSpacing: 8,
        minBarSpacing: 4,
        maxBarSpacing: 10,
        rightOffset: 5,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        autoScale: false,
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
      wickDownColor: '#ef4444',
      priceFormat: {
        type: 'price',
        minMove: isCap ? 1 : 0.0000000000001,
        precision: isCap ? 0 : 12,
      },
    });

    candlestickSeries.setData(data);

    console.log(data);
    
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