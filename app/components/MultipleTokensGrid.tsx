import { useMultipleTokenReservesAnchor } from "@/features/useMultipleTokenReservesAnchor";
import BigNumber from "bignumber.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useSolPrice from "@/features/useSolPrice";

interface MultipleTokensGridProps {
  tokenAddresses: string[];
}

export const MultipleTokensGrid = ({ tokenAddresses }: MultipleTokensGridProps) => {
  const { reserves, loading } = useMultipleTokenReservesAnchor(tokenAddresses);
  const { price: solPrice } = useSolPrice();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {reserves.map((reserve, index) => {
        const price = reserve.account ? 
          new BigNumber(reserve.account.virtualSolReserves.toString())
            .div(reserve.account.realTokenReserves.toString())
            .multipliedBy(new BigNumber(solPrice))
            .toNumber() : 0;

        const marketCap = reserve.account ?
          new BigNumber(price)
            .multipliedBy(new BigNumber(reserve.account.realTokenReserves.toString()))
            .dividedBy(new BigNumber(LAMPORTS_PER_SOL))
            .toNumber() : 0;

        return (
          <div 
            key={reserve.address} 
            className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Token #{index + 1}</h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {reserve.address.slice(0, 8)}...{reserve.address.slice(-8)}
                  </p>
                </div>
              </div>
              {reserve.account?.isCompleted && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Completed
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900">
                  ${price.toFixed(6)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Market Cap:</span>
                <span className="font-semibold text-gray-900">
                  ${marketCap.toLocaleString()}
                </span>
              </div>

              {reserve.account && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SOL Reserves:</span>
                    <span className="font-medium text-gray-700">
                      {new BigNumber(reserve.account.virtualSolReserves.toString())
                        .dividedBy(LAMPORTS_PER_SOL)
                        .toFixed(2)} SOL
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Token Reserves:</span>
                    <span className="font-medium text-gray-700">
                      {new BigNumber(reserve.account.realTokenReserves.toString())
                        .dividedBy(LAMPORTS_PER_SOL)
                        .toFixed(0)}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 