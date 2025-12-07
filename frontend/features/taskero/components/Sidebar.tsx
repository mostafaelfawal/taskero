import Link from "next/link";
import { useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import Tooltip from "../../../components/Tooltip";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LuFolderKanban, LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoGear } from "react-icons/go";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lockCollapse, setLockCollapse] = useState(false);

  const handleMouseEnter = () => {
    if (!lockCollapse) setIsCollapsed(true);
  };

  const handleMouseLeave = () => {
    if (!lockCollapse) setIsCollapsed(false);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`float-left min-h-screen border-r border-r-gray-300 
      dark:border-slate-700 dark:bg-slate-900 transition-all duration-300
      ${isCollapsed || lockCollapse ? "w-64" : "w-20"}`}
    >
      <div className="sticky top-0">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b h-16 w-full px-4 border-b-gray-300 dark:border-b-slate-700 dark:bg-slate-800">
          <Link
            href="/taskero/dashboard"
            className="font-bold flex gap-2 items-center"
          >
            <p className="h-8 w-8 bg-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 text-xl text-white">
              T
            </p>

            {(isCollapsed || lockCollapse) && (
              <motion.h1
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                className="text-xl text-violet-500 dark:text-violet-400 transition-opacity"
              >
                Taskero
              </motion.h1>
            )}
          </Link>
          {(isCollapsed || lockCollapse) && (
            <Tooltip
              message={lockCollapse ? "Unlock Collapse" : "Lock Collapse"}
            >
              <button
                onClick={() => {
                  setLockCollapse(!lockCollapse);
                  if (!lockCollapse) setIsCollapsed(true);
                }}
                className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-500 transition-colors w-9 h-9 flex justify-center items-center"
              >
                {lockCollapse ? <FiUnlock /> : <FiLock />}
              </button>
            </Tooltip>
          )}
        </div>

        {/* NAV */}
        <nav className="py-6 px-2 space-y-2">
          <SidebarItem
            href="/taskero/dashboard"
            icon={<LuLayoutDashboard size={24} />}
            text="Dashboard"
            expanded={isCollapsed || lockCollapse}
          />

          <SidebarItem
            href="/taskero/workspaces"
            icon={<MdOutlineWorkOutline size={24} />}
            text="Workspaces"
            expanded={isCollapsed || lockCollapse}
          />

          <SidebarItem
            href="/taskero/projects"
            icon={<LuFolderKanban size={24} />}
            text="Projects"
            expanded={isCollapsed || lockCollapse}
          />

          <SidebarItem
            href="/taskero/notifications"
            icon={<IoMdNotificationsOutline size={24} />}
            text="Notifications"
            expanded={isCollapsed || lockCollapse}
          />

          <SidebarItem
            href="/taskero/settings"
            icon={<GoGear size={24} />}
            text="Settings"
            expanded={isCollapsed || lockCollapse}
          />
        </nav>
      </div>
    </aside>
  );
}
