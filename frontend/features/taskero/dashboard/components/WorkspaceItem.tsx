import { FiUsers } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { motion } from "framer-motion";

export default function WorkspaceItem({
  name,
  updatedAt,
  members,
  projects,
}: {
  name: string;
  updatedAt: string;
  members: string[];
  projects: string[];
}) {
  const formatDate = (strDate: string) =>
    new Intl.DateTimeFormat("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(strDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 shadow group hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-colors cursor-pointer p-6"
    >
      <h2 className="tracking-tight text-base font-medium truncate transition-colors text-black dark:text-white group-hover:text-violet-500 dark:group-hover:text-violet-400">
        {name}
      </h2>

      <p className="text-xs mt-1.5 text-slate-500 dark:text-slate-400">
        Last active {formatDate(updatedAt)} ago
      </p>

      <div className="mt-2 flex justify-between items-center text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1">
          <FiUsers />
          <span>{members.length}</span>
        </div>

        <div className="flex items-center gap-1">
          <LuFolderKanban />
          <span>{projects.length}</span>
        </div>
      </div>
    </motion.div>
  );
}
