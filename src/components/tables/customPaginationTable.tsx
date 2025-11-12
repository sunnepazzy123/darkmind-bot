"use client";

import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import CustomTable from "./customTable";


interface TableProps {
  tableHeaders: string[];
  tableData: Record<string, any>[];
  rowsPerPage?: number;
  emptyDataMsg?: string;
}

export default function PaginatedTable({
  tableHeaders,
  tableData,
  rowsPerPage = 10,
  emptyDataMsg
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // compute total pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // slice data for current page
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return tableData.slice(start, start + rowsPerPage);
  }, [currentPage, tableData, rowsPerPage]);

  return (
    <div className="space-y-6">
      <CustomTable tableHeaders={tableHeaders} tableData={paginatedData} emptyDataMsg={emptyDataMsg} />
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
