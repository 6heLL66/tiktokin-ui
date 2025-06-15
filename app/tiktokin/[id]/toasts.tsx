import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { formatValue } from '@/shared/utils'

export const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastStyle={{
        background: "#1A1B1E",
        border: "1px solid #2A2B2E",
        borderRadius: "12px",
        minWidth: "320px",
        padding: "12px 16px",
        marginBottom: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    />
  )
}

const createLoadingToast = (type: 'buy' | 'sell') => {
  return toast.loading(
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse"></div>
        <span className="text-sm font-medium">Preparing {type === 'buy' ? 'Buy' : 'Sell'} Transaction</span>
      </div>
      <div className="mt-2 pl-4">
        <div className="text-xs text-[#9CA3AF]">
          Initializing transaction parameters...
        </div>
        <div className="mt-1.5 w-full h-0.5 bg-[#2A2B2E] rounded-full overflow-hidden">
          <div className="h-full bg-[#14F195] rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>,
    {
      position: "bottom-left",
      theme: "dark",
    }
  )
}

const updateToConfirming = (toastId: string | number) => {
  toast.update(toastId, {
    render: (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></div>
          <span className="text-sm font-medium">Confirming Transaction</span>
        </div>
        <div className="mt-2 pl-4">
          <div className="text-xs text-[#9CA3AF]">
            Waiting for blockchain confirmation...
          </div>
          <div className="mt-1.5 w-full h-0.5 bg-[#2A2B2E] rounded-full overflow-hidden">
            <div className="h-full bg-[#3B82F6] rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    ),
    type: "info",
    isLoading: true,
  })
}

const updateToSuccess = (toastId: string | number, amount: number, symbol: string, type: 'buy' | 'sell') => {
  toast.update(toastId, {
    render: (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#14F195]"></div>
          <span className="text-sm font-medium">Transaction Successful</span>
        </div>
        <div className="mt-2 pl-4">
          <div className="text-xs text-[#9CA3AF]">
            You {type === 'buy' ? 'bought' : 'sold'} <span className="text-white font-medium">{formatValue(amount)} {symbol.toUpperCase()}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6B7280]">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Transaction completed successfully</span>
          </div>
        </div>
      </div>
    ),
    type: "success",
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
  })
}

const updateToError = (toastId: string | number, type: 'buy' | 'sell') => {
  toast.update(toastId, {
    render: (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"></div>
          <span className="text-sm font-medium">Transaction Failed</span>
        </div>
        <div className="mt-2 pl-4">
          <div className="text-xs text-[#9CA3AF]">
            Failed to {type === 'buy' ? 'buy' : 'sell'} tokens. Please try again.
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6B7280]">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>An error occurred during the transaction</span>
          </div>
        </div>
      </div>
    ),
    type: "error",
    isLoading: false,
    autoClose: 5000,
    closeButton: true,
  })
}

export const toastService = {
  createLoadingToast,
  updateToConfirming,
  updateToSuccess,
  updateToError,
} 