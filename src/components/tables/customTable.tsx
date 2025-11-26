import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";
import { formatCellValue } from "@/utils";


interface ICustomTable {
  tableData: Record<string, any>[];
  tableHeaders: string[];
  emptyDataMsg?: string;
  onActionClick?: (row: Record<string, any>) => void;
  actionButtonNames?: string[]
}

export default function CustomTable({
  tableData,
  tableHeaders,
  emptyDataMsg,
  onActionClick,
  actionButtonNames = []
}: ICustomTable) {
  const hasData = tableData && tableData.length > 0;

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-60 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          {emptyDataMsg ? emptyDataMsg : `No data available`}
        </p>
      </div>
    );
  }
  let extendedHeaders = [...tableHeaders];

  if (Array.isArray(actionButtonNames) && actionButtonNames.length > 0) {
    extendedHeaders = [...tableHeaders, "Action"];
  }

  



  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {extendedHeaders.map((header) => (
                  <TableCell
                    key={header}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((data) => (
                <TableRow key={data.id || Math.random()}>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                    >
                      {formatCellValue(data[header], header)}
                    </TableCell>
                  ))}
                  {onActionClick && (
                    <TableCell className="px-4 py-3">
                      <Button
                        className="text-theme-xs"
                        onClick={() => onActionClick(data)}
                      >
                        {actionButtonNames[0] ? actionButtonNames[0] : "Action"}
                      </Button>
                    </TableCell>
                  )}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
