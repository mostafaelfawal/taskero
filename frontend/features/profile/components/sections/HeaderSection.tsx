import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/UserSection/thunks/logout";
import { useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function HeaderSection() {
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());
    if (logout.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message);
      router.replace("/auth/login");
    } else {
      const errMsg = resultAction.payload as string;
      toast.error(errMsg);
    }
  };

  return (
    <section className="mb-9 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
      <div>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">
          Account Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1">
          Manage your personal information and preferences.
        </p>
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-fit inline-flex items-center gap-2 font-semibold border border-gray-600 dark:border-slate-400 text-gray-600 dark:text-slate-300 hover:text-red-400 hover:border-red-400 dark:hover:text-red-400 dark:hover:border-red-400 disabled:opacity-80 transition-colors px-4 py-2 rounded-lg"
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin" />
        ) : (
          <>
            <GoSignOut /> Sign Out
          </>
        )}
      </button>
    </section>
  );
}
