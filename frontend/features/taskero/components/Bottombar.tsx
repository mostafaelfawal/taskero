import Link from "next/link";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LuFolderKanban, LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoGear } from "react-icons/go";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";

export default function BottomBar() {
  return (
    <aside
      className={`fixed z-3 bottom-0 w-full md:hidden border-t border-t-gray-300 bg-white
      dark:border-slate-700 dark:bg-slate-900 transition-all duration-300`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b h-12 w-full px-4 border-b-gray-300 dark:border-b-slate-700 dark:bg-slate-800">
        <div
          className="border-r border-r-gray-300 dark:border-slate-700 px-2"
        >
          <Link
            href="/taskero/dashboard"
            className="font-bold flex gap-2 items-center"
          >
            <p className="h-8 w-8 bg-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 text-xl text-white">
              T
            </p>

            <motion.h1
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="text-xl text-violet-500 dark:text-violet-400 transition-opacity hidden sm:block"
            >
              Taskero
            </motion.h1>
          </Link>
        </div>

        {/* NAV */}
        <nav className="flex gap-2 overflow-x-auto max-w-screen">
          <SidebarItem
            href="/taskero/dashboard"
            icon={<LuLayoutDashboard size={15} />}
            text="Dashboard"
          />

          <SidebarItem
            href="/taskero/workspaces"
            icon={<MdOutlineWorkOutline size={15} />}
            text="Workspaces"
          />

          <SidebarItem
            href="/taskero/projects"
            icon={<LuFolderKanban size={15} />}
            text="Projects"
          />

          <SidebarItem
            href="/taskero/notifications"
            icon={<IoMdNotificationsOutline size={15} />}
            text="Notifications"
          />

          <SidebarItem
            href="/taskero/settings"
            icon={<GoGear size={15} />}
            text="Settings"
          />
        </nav>
      </div>
    </aside>
  );
}
