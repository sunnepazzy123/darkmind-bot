"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PaginatedTable from "@/components/tables/customPaginationTable";

import React from "react";


interface IUsersComp {
    data: Record<string, any>[]
    tableHeaders: string[]
}

export default function UsersComp({ data, tableHeaders }: IUsersComp) {

    return (
        <div>
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6">
                <ComponentCard title="">
                    <PaginatedTable tableHeaders={tableHeaders} tableData={data} rowsPerPage={5} />
                </ComponentCard>
            </div>
        </div>
    );
}
