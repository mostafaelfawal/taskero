import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function DangerZoneSection() {
  return (
    <section className="p-6 border border-red-200 bg-red-50/50 rounded-xl shadow">
      <div className="mb-6">
        <h2 className="text-red-500 text-lg font-semibold">Danger Zone</h2>
        <p className="text-sm text-slate-500">
          Irreversible actions for your account.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Delete Account</h2>
          <p className="text-sm text-slate-500">
            Permanently remove your account and all data.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors disabled:opacity-50 font-semibold px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
          onClick={() => toast.warn("Delete account flow not implemented")}
        >
          <FiTrash2 />
          Delete Account
        </button>
      </div>
    </section>
  );
}
