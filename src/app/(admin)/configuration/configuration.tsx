"use client";
import React from "react";
import PaginatedTable from "@/components/tables/customPaginationTable";
import { apiGet, apiPost } from "@/requests";
import { useConfigStore } from "@/store/config.store";
import { StrategyConfig } from "@/interfaces/configs.interface";

interface ICategoryCard {
    configs: StrategyConfig[]
}

export default function ConfigurationCard({ configs }: ICategoryCard) {

       const { setBotStatus } =  useConfigStore((state) => state)

        const onStartBot = async (data: any) => {
        try {
            await apiPost('/binance-trading/start-multi-bot', [data]);
            const botStatus = await apiGet(`/binance-trading/status`);
            setBotStatus(botStatus)
            alert(`Bot started successfully for ${data.symbol}!`);
        } catch (error) {
            console.error("Error starting bot:", error);
            alert("Failed to start bot");
        }
    };


    const tableHeaders = ["symbol", "quote", "buyThreshold", "sellThreshold", "quantity", "stopLoss", "takeProfit", "maxVolatility", "window", "cooldownSeconds",]
    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Stream Params
                    </h4>
                </div>
            </div>
            <PaginatedTable tableHeaders={tableHeaders} tableData={configs} rowsPerPage={5} onActionClick={onStartBot} actionButtonNames={["start bot"]} />
        </div>
    );
}
