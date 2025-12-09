"use client";

import { AppDispatch } from "@/store/store";
import { getUserData } from "@/store/UserSection/thunks/getUserData";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userData = await dispatch(getUserData());
      if (getUserData.fulfilled.match(userData)) {
        router.replace("/taskero/dashboard");
      } else {
        router.replace("/auth/login");
      }
    };
    getUser();
  }, []);

  return <>{children}</>;
}
