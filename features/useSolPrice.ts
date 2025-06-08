import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function getSolanaPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const data = await response.json();
    const price = data.solana.usd;
    return price;
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

export const useSolPrice = () => {
  const query = useQuery({
    queryKey: ["solPrice"],
    queryFn: getSolanaPrice,
  });

  useEffect(() => {
    if (query.data) {
      setInterval(query.refetch, 60000);
    }
  }, []);

  return {
    query,
    price: query.data ?? 0,
  };
};

export default useSolPrice;
