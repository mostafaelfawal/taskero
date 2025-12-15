import { motion } from "framer-motion";

export default function WorkspaceItemLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm
                group flex flex-col hover:border-violet-500/60 hover:shadow-md
                transition-all duration-300 bg-white dark:bg-gray-800
                overflow-hidden p-5 animate-pulse space-y-5"
    >
      <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-900/40" />
      <div className="h-2 w-1/2 bg-violet-100 dark:bg-violet-900/40 rounded" />
      <div className="space-y-1">
        <div className="h-1 w-3/4 bg-slate-300 dark:bg-slate-600/40 rounded" />
        <div className="h-1 w-3/4 bg-slate-300 dark:bg-slate-600/40 rounded" />
        <div className="h-1 w-1/2 bg-slate-300 dark:bg-slate-600/40 rounded" />
      </div>
      <div className="flex -space-x-2">
        <div className="overflow-hidden rounded-full h-8 w-8 ring-2 ring-violet-100 dark:ring-violet-900/40 bg-violet-200 dark:bg-violet-900/10" />
        <div className="overflow-hidden rounded-full h-8 w-8 ring-2 ring-violet-100 dark:ring-violet-900/40 bg-violet-200 dark:bg-violet-900/10" />
        <div className="overflow-hidden rounded-full h-8 w-8 ring-2 ring-violet-100 dark:ring-violet-900/40 bg-violet-200 dark:bg-violet-900/10" />
      </div>
    </motion.div>
  );
}
