"use client";

import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/UserSection/thunks/logout";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());
    if (logout.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message);
      router.replace("/auth/login");
    } else {
      toast.error(resultAction.payload as string);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="bg-red-500 rounded-lg p-2 text-white font-extrabold hover:bg-red-700 transition-colors duration-300"
      >
        {loading ? "Logout..." : "Logout"}
      </button>
    </div>
  );
}
