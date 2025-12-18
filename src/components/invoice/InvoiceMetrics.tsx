import { IOrder } from "@/interfaces/configs.interface";
import { calculatePnlBySymbol, roundToDecimal } from "@/utils";
import Link from "next/link";
import React from "react";

interface IInvoiceMetrics {
  orders: IOrder[];
}

export default function InvoiceMetrics({ orders }: IInvoiceMetrics) {
  const result = calculatePnlBySymbol(orders);
  const totals = Object.values(result.symbols).reduce((acc, curr) => {
    acc.totalBuyQty += curr.totalBuyQty;
    acc.totalSellQty += curr.totalSellQty;
    return acc;
  }, { totalBuyQty: 0, totalSellQty: 0 });

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white/90">
            Overview
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-y-0 dark:divide-gray-800 dark:border-gray-800">
        <div className="border-b p-5 sm:border-r lg:border-b-0">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
            TotalRealizedPnl
          </p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">${roundToDecimal(result.totalRealizedPnl)}</h3>
        </div>
        <div className="border-b p-5 lg:border-b-0">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
            Total Buy Quantity
          </p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">{roundToDecimal(totals.totalBuyQty)}</h3>
        </div>
        <div className="border-b p-5 sm:border-r sm:border-b-0">
          <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
            Total Sell Quantity
          </p>
          <h3 className="text-3xl text-gray-800 dark:text-white/90">{roundToDecimal(totals.totalSellQty)}</h3>
        </div>
      </div>
    </div>
  );
}
