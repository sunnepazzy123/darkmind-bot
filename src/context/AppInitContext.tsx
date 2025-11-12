"use client";

import { apiGet } from "@/requests";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

const AppInit = ({ children }: { children: React.ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiGet("/users/profile");
        if (user) setUser(user);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);

  return <>{children}</>;
};

export default AppInit;
