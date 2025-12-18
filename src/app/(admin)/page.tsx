"use client";
import React, { useEffect, useState } from "react";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import { apiGet } from "@/requests";
import ComponentCard from "@/components/common/ComponentCard";
import PaginatedTable from "@/components/tables/customPaginationTable";
import { useConfigStore } from "@/store/config.store";
import { getUSDTPrices } from "@/utils";
import DividendChart from "@/components/stocks/DividendChart";
import WatchList from "@/components/stocks/WatchList";
import { ordersTableHeaders } from "@/constants";

export default function Ecommerce() {
  const [recentPrices, setRecentPrices] = useState<any[]>([]);
  const [account, setAccount] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [symbol, setSymbol] = useState("BTC")
  const [loading, setLoading] = useState(true);
  const { setBotStatus } = useConfigStore((state) => state)



  useEffect(() => {
    const fetchRecentPrices = async () => {
      try {
        const orderPromise = apiGet("/orders/");
        const botStatusPromise = apiGet(`/binance-trading/status`);
        const accountBalancesPromise = apiGet(`/accounts/BTC/`);

        const [dataRecentPrices, dataOrders, dataBolt, dataAccountBalance] = await Promise.all([getUSDTPrices(), orderPromise, botStatusPromise, accountBalancesPromise, ])

        setOrders(dataOrders)
        setBotStatus(dataBolt)
        setRecentPrices(dataRecentPrices)
        setAccount(dataAccountBalance)
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
        <MonthlyTarget />

      </div>

      <div className="col-span-12 xl:col-span-5">
        <WatchList recentPrices={recentPrices} />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}

        <ComponentCard title="Bot Trade">
          <PaginatedTable tableHeaders={ordersTableHeaders} tableData={orders} rowsPerPage={5} emptyDataMsg="No Trade" />
        </ComponentCard>

      </div>

      <div className="col-span-12 xl:col-span-7">
        <MonthlySalesChart />

      </div>
    </div>
  );
}
