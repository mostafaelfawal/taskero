import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function DangerZoneSection() {
  return (
    <section className="p-6 border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 rounded-xl shadow dark:shadow-lg">
      <div className="mb-6">
        <h2 className="text-red-500 dark:text-red-400 text-lg font-semibold">
          Danger Zone
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Irreversible actions for your account.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold dark:text-white">
            Delete Account
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Permanently remove your account and all data.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors disabled:opacity-50 font-semibold px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white min-w-38"
          onClick={() => toast.warn("Delete account flow not implemented")}
        >
          <FiTrash2 />
          Delete Account
        </button>
      </div>
    </section>
  );
}
