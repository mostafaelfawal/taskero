import { FiUserPlus } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

export default function InviteBox() {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <FiUserPlus size={16} className="text-violet-600" />
        Invite New Members
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdOutlineMailOutline
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />
          <input
            type="text"
            placeholder="Enter email address"
            className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-10 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          />
        </div>

        <select className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition">
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>

        <button className="h-10 px-5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm transition shadow-sm">
          Send Invite
        </button>
      </div>
    </div>
  );
}
