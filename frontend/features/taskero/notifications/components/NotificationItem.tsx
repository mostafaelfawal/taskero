import { FiClock, FiCheck, FiX } from "react-icons/fi";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationBadge } from "./NotificationBadge";
import { NotificationType } from "../types/NotificationType";
import { motion } from "framer-motion";

export function NotificationItem({
  read,
  type,
  message,
  createdAt,
  image,
}: NotificationType) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative flex rounded-lg p-4 border
        ${
          read
            ? "border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-600"
            : "border-violet-300 bg-violet-50 dark:bg-slate-900 dark:border-violet-900"
        }`}
    >
      {!read && (
        <span className="absolute top-2 right-2 size-2 rounded-full bg-violet-500 animate-pulse" />
      )}

      <NotificationIcon type={type} image={image} />

      <div className="ml-3 w-full space-y-2">
        <div className="flex items-center justify-between">
          <h2
            className={`text-sm font-medium ${
              read
                ? "text-slate-600 dark:text-slate-400"
                : "text-slate-800 dark:text-slate-200"
            }`}
          >
            {message}
          </h2>

          <NotificationBadge type={type} />
        </div>

        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <FiClock />
          {createdAt} ago
        </p>

        {type === "invite" && (
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-md px-3 py-1 text-sm bg-violet-500 text-white hover:bg-violet-600">
              <FiCheck /> Accept
            </button>
            <button className="flex items-center gap-2 rounded-md px-3 py-1 text-sm border border-slate-300 dark:border-slate-700">
              <FiX /> Decline
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
