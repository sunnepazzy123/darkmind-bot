"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/requests";
import { useUserStore } from "@/store/user.store";

type Props = { children: React.ReactNode };

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const { setUser } = useUserStore(state => state)

  useEffect(() => {
    const checkAuth = async () => {
      const token =
        localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

      if (!token) {
        router.replace("/signin");
        return;
      }

      try {
        const prrofile = await apiGet("/users/profile/", { token });
        setUser(prrofile)
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