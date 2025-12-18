"use client";
import React from "react";
import PaginatedTable from "@/components/tables/customPaginationTable";
import { apiGet, apiPost } from "@/requests";
import { useConfigStore } from "@/store/config.store";
import { StrategyConfig } from "@/interfaces/configs.interface";
import Button from "@/components/ui/button/Button";

interface ICategoryCard {
    configs: StrategyConfig[]
}

export default function ConfigurationCard({ configs }: ICategoryCard) {

    const { setBotStatus } = useConfigStore((state) => state)

    const onStartBot = async () => {
        try {
            await apiPost('/binance-trading/start-multi-bot', configs);
            const botStatus = await apiGet(`/binance-trading/status`);
            setBotStatus(botStatus)
            alert(`Bot started successfully for all configs`);
        } catch (error) {
            console.error("Error starting bot:", error);
            alert("Failed to start bot");
        }
    };

    const onStopBot = async () => {
        try {
            await apiGet('/binance-trading/stop');
            const botStatus = await apiGet(`/binance-trading/status`);
            setBotStatus(botStatus)
            alert(`Bot stop successfully`);
        } catch (error) {
            console.error("Error stopping bot:", error);
            alert("Failed to stop bot");
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
                {configs.length > 0 && (
                    <div className="flex my-2 gap-3">
                        <Button
                            className="text-theme-xs"
                            onClick={() => onStartBot()}
                        >
                            start all
                        </Button>
                        <Button
                            className="text-theme-xs"
                            onClick={() => onStopBot()}
                        >
                            stop
                        </Button>
                    </div>
                )}
            </div>
            <PaginatedTable tableHeaders={tableHeaders} tableData={configs} rowsPerPage={5} onActionClick={() => { }} actionButtonNames={["disable"]} />
        </div>
    );
}
