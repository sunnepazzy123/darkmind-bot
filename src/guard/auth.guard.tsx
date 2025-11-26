"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (!token) {
      router.replace("/signin");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) return null;
  return <>{children}</>;
}