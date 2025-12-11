import { FiUserPlus, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { MdOutlineMailOutline } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import { LuEllipsis } from "react-icons/lu";

export default function WorkspaceSettings({
  closeSettings,
}: {
  closeSettings: VoidFunction;
}) {
  const [workspaceMembers, setWorkspaceMembers] = useState([
    {
      name: "Alex Morgan",
      email: "alex@taskero.com",
      role: "Owner",
      avatar: "/default-avatar.png",
    },
    {
      name: "Jamie Lee",
      email: "jamie@taskero.com",
      role: "Admin",
      avatar: "/default-avatar.png",
    },
    {
      name: "Chris Brown",
      email: "chris@taskero.com",
      role: "Member",
      avatar: "/default-avatar.png",
    },
    {
      name: "Taylor Swift",
      email: "taylor@taskero.com",
      role: "Member",
      avatar: "/default-avatar.png",
    },
    {
      name: "Morgan Black",
      email: "morgan@taskero.com",
      role: "Admin",
      avatar: "/default-avatar.png",
    },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      onClick={closeSettings}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        exit={{ x: 300 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:max-w-xl p-6 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={closeSettings}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FiX className="text-gray-700 dark:text-gray-300" size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col space-y-2 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Manage Members
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage access and roles for your workspace.
          </p>
        </div>

        {/* Invite Section */}
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FiUserPlus size={16} className="text-violet-600" />
            Invite New Members
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Email Field */}
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

            {/* Role Select */}
            <select className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition">
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>

            {/* Invite Button */}
            <button className="h-10 px-5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm transition shadow-sm">
              Send Invite
            </button>
          </div>
        </div>

        {/* Members List */}
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">
          Workspace Members ({workspaceMembers.length})
        </h3>

        <div className="border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-300 dark:divide-gray-700 overflow-hidden">
          {workspaceMembers.map((member, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 hover:bg-gray-200/20 dark:hover:bg-gray-700/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={member.avatar}
                    alt="member avatar"
                    fill
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="items-center rounded-md px-2.5 py-0.5 text-xs border capitalize border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                  {member.role}
                </span>
                <LuEllipsis className="text-gray-500 dark:text-gray-400 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
