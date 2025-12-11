import ApiKeyTable from "@/components/api-keys/ApiKeyTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { apiGet } from "@/requests";
import { getAuthToken } from "@/requests/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js API Keys Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js API Keys Page TailAdmin Dashboard Template",
};

export default async function ApiKeysPage() {
  const token = await getAuthToken()
  const apiKeys = await apiGet("/key-vaults", { token })
  return (
    <div>
      <PageBreadcrumb pageTitle="API Keys" />
      <ApiKeyTable apiKeys={apiKeys}   />
    </div>
  );
}
