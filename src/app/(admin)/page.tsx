"use client";
import React, { useEffect, useState } from "react";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import { apiGet } from "@/requests";
import PriceLog from "@/components/terminal";
import ComponentCard from "@/components/common/ComponentCard";
import PaginatedTable from "@/components/tables/customPaginationTable";
import { useConfigStore } from "@/store/config.store";

export default function Ecommerce() {
  const [recentPrices, setRecentPrices] = useState<any[]>([]);
  const [account, setAccount] = useState<any[]>([]);
  const [symbol, setSymbol] = useState("BTC")
const [loading, setLoading] = useState(true);
const setConfig = useConfigStore((state) => state.setConfig)

  const tradeTableHeaders = ["timestamp", "symbol", "side", "price", "quantity", "result"]

  useEffect(() => {
    const fetchRecentPrices = async () => {
      try {
        const dataPromise = apiGet("/bot/get_recent_prices?symbol=BTCUSDT&n=100");
        const accountPromise = apiGet(`/binance/get_account/${symbol}`);
        const [data, dataAccount] = await Promise.all([dataPromise, accountPromise])

        setRecentPrices(data);
        setAccount(dataAccount)
        setConfig({environment: dataAccount.environment})
      } catch (err) {
        console.error("Failed to fetching:", err);
    } finally {
      setLoading(false);
    }

    };

    fetchRecentPrices();
  }, []);

  return (

    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
      {loading ? (
        <div className="flex items-center justify-center h-40 text-gray-400 dark:text-gray-500">
          Loading metrics...
        </div>
      ) : (
        <EcommerceMetrics account={account} symbol={symbol} />
      )}
        {/* <MonthlySalesChart /> */}
        <MonthlyTarget />

      </div>

      <div className="col-span-12 xl:col-span-5">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Live Logs</h2>
        <PriceLog />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}

        <ComponentCard title="Bot Trade">
          <PaginatedTable tableHeaders={tradeTableHeaders} tableData={[]} rowsPerPage={5} emptyDataMsg="No Trade" />
        </ComponentCard>

      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders recent_prices={recentPrices} />
      </div>
    </div>
  );
}
