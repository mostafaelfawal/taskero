import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LuEllipsis } from "react-icons/lu";
import { FiEdit3, FiShield, FiTrash } from "react-icons/fi";
import { TeamMemberType } from "../../types/TeamMemberType";
import { useEffect, useState } from "react";

export default function MemberItem({
  member,
  idx,
  popoverOpen,
  togglePopover,
  popoverRef,
  isLast,
  handleDelete,
  handleUpdate,
}: {
  member: TeamMemberType;
  idx: number;
  popoverOpen: number | null;
  togglePopover: (i: number) => void;
  popoverRef: any;
  isLast: (i: number) => boolean;
  handleDelete: (id: string) => void;
  handleUpdate: (memberId: string, newRole: string) => void;
}) {
  const [isChangeRole, setIsChangeRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(member.role);

  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 10, opacity: 0 }}
      className="relative flex items-center justify-between p-4 hover:bg-gray-200/20 dark:hover:bg-gray-700/20 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700">
          <Image
            src={member.avatar || "/default-avatar.png"}
            alt="member avatar"
            fill
            className="object-cover"
          />
        </span>
        <div>
          <p className="text-gray-800 dark:text-gray-200">{member.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {member.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isChangeRole ? (
          <select
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
            className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          >
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        ) : (
          <span className="items-center rounded-md px-2.5 py-0.5 text-xs border capitalize border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200">
            {member.role}
          </span>
        )}

        <div className="relative">
          {isChangeRole ? (
            <button
              className="rounded-md bg-violet-500 hover:bg-violet-400 p-1 transition-colors text-white"
              onClick={() => {
                handleUpdate(member._id!, selectedRole);
                setIsChangeRole(false);
              }}
            >
              <FiEdit3 />
            </button>
          ) : (
            <button
              onClick={() => togglePopover(idx)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <LuEllipsis />
            </button>
          )}

          <AnimatePresence>
            {popoverOpen === idx && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`absolute right-0 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-3 p-1
                  ${isLast(idx) ? "bottom-full mb-2" : "top-full mt-2"}`}
              >
                <div className="px-2 py-1.5 text-sm font-semibold">
                  Manage Access
                </div>

                <div className="-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700" />

                <button
                  onClick={() => setIsChangeRole(true)}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                >
                  <FiShield /> Change Role
                </button>

                <button
                  onClick={() => handleDelete(member._id!)}
                  className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-red-950 w-full text-red-500"
                >
                  <FiTrash /> Remove Member
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
