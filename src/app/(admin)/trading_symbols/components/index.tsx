"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InvoiceMetrics from "@/components/invoice/InvoiceMetrics";
import PaginatedTable from "@/components/tables/customPaginationTable";
import { IOrder } from "@/interfaces/configs.interface";
import { calculatePnlBySymbol } from "@/utils";


import React from "react";


interface ITradingSymbolsComp {
    data: IOrder[]
    tableHeaders: string[]
}

export default function TradingSymbolsComp({ data, tableHeaders }: ITradingSymbolsComp) {
    const result = calculatePnlBySymbol(data);
    // Convert to array of objects
    const perSymbolArray = Object.entries(result.symbols).map(([symbol, data]) => ({
        symbol,
        ...data
    }));

    return (
        <div>
            <PageBreadcrumb pageTitle="Per-Symbol Details" />
            <InvoiceMetrics orders={data} />
            <div className="space-y-6">
                <ComponentCard title="">
                    <PaginatedTable tableHeaders={tableHeaders} tableData={perSymbolArray} rowsPerPage={5} />
                </ComponentCard>
            </div>
        </div>
    );
}
