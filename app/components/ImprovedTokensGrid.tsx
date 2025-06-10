import { useBondingCurvesBatchWithPrices } from "@/features/useBondingCurvesBatch";
import useSolPrice from "@/features/useSolPrice";

interface ImprovedTokensGridProps {
  tokenAddresses: string[];
}

export const ImprovedTokensGrid = ({ tokenAddresses }: ImprovedTokensGridProps) => {
  const { price: solPrice } = useSolPrice();
  const { curves, loading, error, refetch } = useBondingCurvesBatchWithPrices(tokenAddresses, solPrice);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0"></div>
        </div>
        <span className="ml-4 text-gray-600 font-medium">Loading tokens...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Failed to load tokens</h3>
              <p className="text-red-600 text-sm">{error.message}</p>
            </div>
          </div>
          <button
            onClick={refetch}
            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!curves.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-400 text-2xl">📊</span>
        </div>
        <h3 className="text-gray-600 font-medium">No tokens found</h3>
        <p className="text-gray-500 text-sm">Try adding some token addresses</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Token Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {curves.length} token{curves.length !== 1 ? 's' : ''} loaded
          </span>
          <button
            onClick={refetch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {curves.map((curve, index) => (
          <div 
            key={curve.address}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {curve.address.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Token #{index + 1}</h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {curve.address.slice(0, 6)}...{curve.address.slice(-4)}
                  </p>
                </div>
              </div>
              {curve.account?.isCompleted && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">Live</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Price</span>
                  <span className="font-bold text-gray-900">
                    ${('price' in curve ? curve.price : 0).toFixed(8)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Market Cap</span>
                  <span className="font-bold text-gray-900">
                    ${('marketCap' in curve ? curve.marketCap : 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {curve.account && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <div className="text-xs font-medium text-blue-600 mb-1">SOL Reserves</div>
                    <div className="text-sm font-bold text-blue-800">
                      {(curve.account.virtualSolReserves.toNumber() / 1e9).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2">
                    <div className="text-xs font-medium text-purple-600 mb-1">Token Supply</div>
                    <div className="text-sm font-bold text-purple-800">
                      {(curve.account.tokenTotalSupply.toNumber() / 1e9).toFixed(0)}M
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm">
                Trade Token
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 