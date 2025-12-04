"use client";

import handleLogout from "@/features/main/utils/handleLogout";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: handleLogout,
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/auth/login");
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => console.log(user), []);
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={() => logoutMutation.mutate()}
        className="bg-red-500 rounded-lg p-2 text-white font-extrabold hover:bg-red-700 transition-colors duration-300"
      >
        {logoutMutation.isPending ? "Logout..." : "Logout"}
      </button>
    </div>
  );
}
