import ErrorCard from "@/components/ecommerce/errorCode";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { apiGet } from "@/requests";
import { getAuthToken } from "@/requests/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function Profile() {
  let profile: any = null;
  let error: string | null = null;
  const token = await getAuthToken();


  try {
    profile = await apiGet("/users/profile", { token });
  } catch (err: any) {
    console.error("Failed to load profile:", err);
    error = err?.message || "Failed to load profile";
  }

  if (error) return <ErrorCard message={error} />;

  if (!profile) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 lg:p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={profile} />
          <UserInfoCard user={profile} />
        </div>
      </div>
    </div>
  );
}
