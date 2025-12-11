import { Metadata } from "next";
import { apiGet } from "@/requests";
import { getAuthToken } from "@/requests/utils";
import OrdersComp from "./components";


export const metadata: Metadata = {
  title: "Next.js Users Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Users Page TailAdmin Dashboard Template",
};


export default async function Orders() {
  const token = await getAuthToken()
  const orders = await apiGet("/orders", { token })
  const tradeTableHeaders = ["createdAt", "symbol", "side", "price", "avgPrice", "quantity", "threshold", "percentChange"]

  return <OrdersComp data={orders} tableHeaders={tradeTableHeaders} />;
}
