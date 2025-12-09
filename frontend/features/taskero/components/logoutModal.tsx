import Modal from "@/components/Modal";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/UserSection/thunks/logout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LogoutModal({
  closeModal,
}: {
  closeModal: VoidFunction;
}) {
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
    <Modal closeModal={closeModal}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
          <FiLogOut
            className="text-violet-600 dark:text-violet-300"
            size={28}
          />
        </div>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Log out of Taskero?
        </h2>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          You're about to log out. You'll need to sign in again to access your
          projects and workspaces.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-slate-600
                     hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors dark:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium 
                     bg-violet-600 hover:bg-violet-700 
                     dark:bg-violet-700 dark:hover:bg-violet-800
                     text-white transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin" />
            ) : (
              <>
                <FiLogOut size={18} />
                Logout
              </>
            )}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
