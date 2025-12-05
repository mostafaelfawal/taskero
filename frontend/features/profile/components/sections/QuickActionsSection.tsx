import { FiLock, FiUser } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { toast } from "react-toastify";

export default function QuickActionsSection() {
  const quickActions = [
    { icon: <FiUser />, text: "Edit Profile Details" },
    { icon: <FiLock />, text: "Change Password" },
    { icon: <MdLanguage />, text: "Connected Apps" },
  ];
  return (
    <section className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-lg">
      <h2 className="text-lg font-semibold mb-6 dark:text-white">
        Quick Actions
      </h2>

      <div className="space-y-2">
        {quickActions.map((item, i) => (
          <button
            key={i}
            className="rounded-lg border border-gray-600 dark:border-slate-600 w-full flex gap-2 items-center py-2 px-4 font-semibold text-sm text-gray-600 dark:text-slate-300 hover:border-violet-200 dark:hover:border-violet-400 hover:text-violet-500 dark:hover:text-violet-400 transition-all"
            type="button"
            onClick={() => {
              // placeholder for real actions
              toast.info(item.text);
            }}
          >
            {item.icon} {item.text}
          </button>
        ))}
      </div>
    </section>
  );
}
