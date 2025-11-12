"use client";

import React, { useEffect, useState } from "react";

interface LogLine {
  timestamp: string;
  symbol: string;
  price: number;
}

const PriceLog = () => {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);

  // Simulate fetching or streaming logs
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/stream"); // SSE endpoint

    eventSource.onmessage = (e) => {
      // Parse log line: "2025-11-11 22:13:25.028947 | BTCUSDT | Price: 100654"
      const parts = e.data.split("|").map((p) => p.trim());
      if (parts.length === 3) {
        const timestamp = parts[0];
        const symbol = parts[1];
        const price = parseFloat(parts[2].replace("Price: ", ""));
        setLogs((prev) => [...prev, { timestamp, symbol, price }]);
        setPrevPrice(price);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setLogs((prev) => [...prev, { timestamp: "", symbol: "INFO", price: 0 }]);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="bg-black text-white p-4 h-96 overflow-auto font-mono rounded-lg">
      {logs.map((line, idx) => {
        let color = "text-white";
        if (prevPrice !== null) {
          if (line.price > prevPrice) color = "text-green-400";
          else if (line.price < prevPrice) color = "text-red-400";
        }
        return (
          <div key={idx} className={color}>
            {line.timestamp} | {line.symbol} | Price: {line.price}
          </div>
        );
      })}
    </div>
  );
};

export default PriceLog;
