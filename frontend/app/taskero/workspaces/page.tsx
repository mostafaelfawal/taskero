"use client";

import CreateWorkspaceModal from "@/features/taskero/wokspaces/components/CreateWorkspaceModal";
import WorkspaceItem from "@/features/taskero/wokspaces/components/WorkspaceItem";
import { WorkspaceType } from "@/features/taskero/wokspaces/types/WorkspaceType";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import WorkspaceItemLoading from "@/features/taskero/wokspaces/components/WorkspaceItemLoading";

export default function Workspaces() {
  const [createWorkspaceModal, setCreateWorkspaceModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspace/`,
        { withCredentials: true }
      );

      return res.data.workspaces as WorkspaceType[];
    },
  });

  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
          <p className="text-slate-500 mt-1">
            Manage your team environments and collaborators.
          </p>
        </div>

        <button
          onClick={() => setCreateWorkspaceModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors min-h-9 px-4 py-2 gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25 duration-300 w-fit"
        >
          <FiPlus size={20} /> Add Workspace
        </button>
      </div>

      {isError && (
        <p className="my-2 text-red-500">Failed to load workspaces.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <WorkspaceItemLoading />
            <WorkspaceItemLoading />
            <WorkspaceItemLoading />
          </>
        ) : (
          data?.map((w) => (
            <WorkspaceItem
              key={w._id}
              _id={w._id!}
              title={w.name}
              description={w.description}
              members={[...w.members, ...w.owners, ...w.admins].length}
              projects={w.projects.length}
              ownersAvatar={w.owners.map((a) => a.avatar)}
            />
          ))
        )}

        {/* Create Button Card */}
        <div
          onClick={() => setCreateWorkspaceModal(true)}
          className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 dark:border-gray-700 
          rounded-xl p-6 cursor-pointer transition-all duration-300
          hover:border-violet-500/60 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 
          text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"
        >
          <div className="size-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300">
            <FiPlus size={40} />
          </div>

          <span className="font-semibold text-lg transition-colors">
            Create New Workspace
          </span>
        </div>
      </div>
      <AnimatePresence>
        {createWorkspaceModal && (
          <CreateWorkspaceModal
            closeModal={() => setCreateWorkspaceModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
