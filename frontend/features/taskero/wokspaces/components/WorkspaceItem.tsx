import Image from "next/image";
import { FiArrowRight, FiSettings, FiUsers } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import WorkspaceSettings from "./WorkspaceSettings";
import Tooltip from "@/components/Tooltip";

export default function WorkspaceItem({
  title,
  description,
  members,
  projects,
  ownersAvatar,
}: {
  title: string;
  description?: string;
  members: number;
  projects: number;
  ownersAvatar: string[];
}) {
  const [workspaceSettings, setWorkspaceSettings] = useState(false);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm group flex flex-col hover:border-violet-500/60 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6 pb-3 h-full">
        <div className="flex justify-between items-center gap-5">
          {/* Workspace Icon */}
          <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 flex items-center justify-center font-bold text-lg">
            {title[0].toUpperCase()}
          </div>

          {/* Settings */}
          <Tooltip message="Manage Members">
            <FiSettings
              onClick={() => setWorkspaceSettings(true)}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
            />
          </Tooltip>
        </div>

        {/* Title */}
        <p className="font-semibold tracking-tight text-xl group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {title}
        </p>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 h-10">
            {description}
          </p>
        )}

        {/* Members + Projects */}
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <p className="flex items-center gap-1.5">
            <FiUsers />
            {members || 0} members
          </p>
          <p className="flex items-center gap-1.5">
            <LuFolderKanban />
            {projects || 0} projects
          </p>
        </div>

        {/* Owners */}
        <div className="space-y-2 mt-auto">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Owners
          </span>

          <div className="pl-1 flex -space-x-2 overflow-hidden py-1">
            {ownersAvatar.slice(0, 2).map((owner) => (
              <Image
                key={owner}
                src={owner}
                alt="Owner Avatar"
                width={8}
                height={8}
                className="overflow-hidden rounded-full h-8 w-8 ring-2 ring-violet-500 border border-white dark:border-gray-800"
              />
            ))}
            {ownersAvatar.length > 2 && (
              <span className="overflow-hidden rounded-full h-8 w-8 ring-2 ring-violet-500 border border-white dark:border-gray-800 bg-gray-200 text-xs flex items-center justify-center text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                +{ownersAvatar.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center p-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
        <button className="w-full px-4 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700 dark:hover:bg-violet-500 transition-colors shadow-sm flex items-center justify-center gap-4">
          Open Workspace <FiArrowRight />
        </button>
      </div>
      <AnimatePresence>
        {workspaceSettings && (
          <WorkspaceSettings
            closeSettings={() => setWorkspaceSettings(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
