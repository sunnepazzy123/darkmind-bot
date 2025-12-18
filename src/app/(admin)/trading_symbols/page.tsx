import { Metadata } from "next";
import { apiGet } from "@/requests";
import { getAuthToken } from "@/requests/utils";
import TradingSymbolsComp from "./components";
import { tradingSymbolsTableHeaders } from "@/constants";


export const metadata: Metadata = {
  title: "Next.js Users Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Users Page TailAdmin Dashboard Template",
};


export default async function TradingSymbols() {
  const token = await getAuthToken()
  const orders = await apiGet("/orders", { token })

  return <TradingSymbolsComp data={orders} tableHeaders={tradingSymbolsTableHeaders} />;
}
