"use client";

import React, { useEffect, useState } from "react";
import { apiGet } from "@/requests";

const RecentPrices = ({ symbol = "BTCUSDT", n = 50 }) => {
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPrices = async () => {
      try {
        const data: number[] = await apiGet(`/bot/get_recent_prices?symbol=${symbol}&n=${n}`);
        if (isMounted) setPrices(data);
      } catch (err) {
        console.error("Failed to fetch recent prices", err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // refresh every 5s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [symbol, n]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg max-w-md">
      <h3 className="mb-2 text-lg font-semibold">Recent {symbol} Prices</h3>
      <ul className="space-y-1 font-mono">
        {prices.map((price, idx) => {
          const prevPrice = idx > 0 ? prices[idx - 1] : price;
          const isUp = price > prevPrice;
          const isDown = price < prevPrice;

          return (
            <li
              key={idx}
              className={isUp ? "text-green-400" : isDown ? "text-red-400" : "text-gray-400"}
            >
              {isUp ? "⬆" : isDown ? "⬇" : "→"} {price.toFixed(2)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentPrices;
