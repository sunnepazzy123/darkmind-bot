"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/requests";
import { useUserStore } from "@/store/user.store";
import { ACCESS_TOKEN } from "@/constants";

type Props = { children: React.ReactNode };

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const { setUser } = useUserStore(state => state)

  useEffect(() => {
    const checkAuth = async () => {
      const token =
        localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        router.replace("/signin");
        return;
      }

      try {
        const profile = await apiGet("/users/profile/", { token });
        setUser(profile)
      } catch (err) {
        router.replace("/signin");
        return;
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checking) return null;
  return <>{children}</>;
}