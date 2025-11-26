"use client";
import React from "react";
import { StrategyConfig } from "./page";
import PaginatedTable from "@/components/tables/customPaginationTable";
import { apiGet, apiPost } from "@/requests";
import { useConfigStore } from "@/store/config.store";

interface ICategoryCard {
    configs: StrategyConfig[]
}

export default function ConfigurationCard({ configs }: ICategoryCard) {

       const { setBotStatus } =  useConfigStore((state) => state)

        const onStartBot = async (data: any) => {
        try {
            await apiPost('/bots/start', data);
            const botStatus = await apiGet(`/bots/status/${data.symbol}`);
            setBotStatus(botStatus)
            alert("Bot started successfully!");
        } catch (error) {
            console.error("Error starting bot:", error);
            alert("Failed to start bot");
        }
    };

   
   
    const tableHeaders = ["symbol", "quote", "buy_threshold", "sell_threshold", "quantity", "stop_loss", "take_profit", "max_volatility", "window", "cooldown_seconds",]
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
