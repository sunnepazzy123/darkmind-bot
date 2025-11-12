"use client";
import React from "react";
import { StrategyConfig } from "./page";
import PaginatedTable from "@/components/tables/customPaginationTable";

interface ICategoryCard {
    configs: StrategyConfig[]
}

export default function ConfigurationCard({ configs }: ICategoryCard) {
    const tableHeaders = ["symbol", "base", "buy_threshold", "buy_quantity", "window", "cooldown_seconds", "stop_loss", "take_profit", "max_volatility"]
    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Stream Params
                    </h4>
                </div>
            </div>
            <PaginatedTable tableHeaders={tableHeaders} tableData={configs} rowsPerPage={5} />
        </div>
    );
}
