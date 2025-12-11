import { Metadata } from "next";
import { apiGet } from "@/requests";
import { getAuthToken } from "@/requests/utils";
import UsersComp from "./components";


export const metadata: Metadata = {
  title: "Next.js Users Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Users Page TailAdmin Dashboard Template",
};


export default async function Users() {
  const token = await getAuthToken()
  const users = await apiGet("/users", { token })
      const tableHeaders = ["email", "firstName", "lastName", "provider", "createdAt"]
  return <UsersComp data={users} tableHeaders={tableHeaders} />;
}
