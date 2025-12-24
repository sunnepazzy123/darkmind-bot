"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, BoxIconLine, } from "@/icons";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatMoney } from "@/utils";
import Image from "next/image";
import Select from "../form/Select";
import { apiGet } from "@/requests";
import SpinnerThree from "../ui/spinners/SpinnerThree";
import { CryptoTickerRaw } from "@/interfaces/configs.interface";


interface IEcommerceMetrics {
  recentPrices: CryptoTickerRaw[];
}

interface IAccountBalance {
  [key: string]: number;
}

export const EcommerceMetrics = ({ recentPrices }: IEcommerceMetrics) => {
  const options = [
    { value: "BTC", label: "BTC" },
    { value: "ETH", label: "ETH" },
    { value: "BNB", label: "BNB" },
  ];
  const [selectedSymbol, setSelectedSymbol] = React.useState("BTC");
  const [accountBalance, setAccountBalance] = React.useState<IAccountBalance>({});
  const [cryptoTicker, setCryptoTicker] = React.useState<CryptoTickerRaw | null>(null);

  const [loading, setLoading] = useState(true);
  const isUp = cryptoTicker?.changeDirection === "up";

  const handleSelectChange = (value: string) => {
    setSelectedSymbol(value);

    const cryptoTickerFound = findCryptoTicker(recentPrices, value);
    if (cryptoTickerFound) {
      setCryptoTicker(cryptoTickerFound);
    }
  };

  const findCryptoTicker = (
    recentPrices: CryptoTickerRaw[],
    value: string
  ): CryptoTickerRaw | undefined => {
    return recentPrices.find(
      (ticker) => ticker.symbol === `${value}USDT`
    );
  };


  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        const balance = await apiGet(`/accounts/${selectedSymbol}`);
        setAccountBalance(balance);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetching:", err);
      }finally {
        setLoading(false);
      }
    };

    fetchAccountBalances();
  }, [selectedSymbol]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <Image width={40} height={40} src={`./images/brand/cryptos/${selectedSymbol}.svg`} alt={selectedSymbol.toLowerCase()} />
          </div>
          <div>
            <Select
              options={options}
              placeholder="Select Symbol"
              onChange={handleSelectChange}
              defaultValue="BTC"
              className="bg-gray-50 dark:bg-gray-800 w-[120px]"
            />
          </div>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedSymbol}
            </span>
            {loading ? (
              <SpinnerThree />
            ) : (
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {accountBalance[`${selectedSymbol}`]}
              </h4>
            )}
          </div>
          <Badge color={isUp ? "success" : "error"}>
            {isUp ? <TrendingUp /> : <TrendingDown />}
            {cryptoTicker?.change ?? "0.00%"}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              USDT
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatMoney(accountBalance["USDT"])}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            {cryptoTicker ? cryptoTicker.change : "0.00%"}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
