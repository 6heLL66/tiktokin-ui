export function BondingCurve() {
  return (
    <div className="w-full rounded-2xl bg-[#121212]/80 p-6 backdrop-blur-sm border border-white/5 shadow-lg">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white/90">Bonding Curve</h2>
        <div className="relative h-64 w-full">
          <div className="absolute bottom-0 left-0 h-full w-full">
            <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-emerald-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-br-xl rounded-bl-xl bg-emerald-500/10" />
          </div>
          <div className="absolute bottom-0 left-0 h-full w-full">
            <div className="absolute bottom-0 right-0 h-full w-px bg-white/10" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
          </div>
          <div className="absolute bottom-0 left-0 h-full w-full">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,100 Q50,100 50,50 T100,0"
                fill="none"
                stroke="rgb(16 185 129)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>Supply</span>
          <span>Price</span>
        </div>
      </div>
    </div>
  );
} 