"use client";

import Sidebar from "@/features/taskero/components/Sidebar";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { RootState } from "@/store/store";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FiBell, FiLogOut, FiSearch, FiSettings, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import UserProvider from "@/providers/UserProvider";
import Link from "next/link";
import LogoutModal from "@/features/taskero/components/logoutModal";
import BottomBar from "@/features/taskero/components/Bottombar";
import { MdNotifications } from "react-icons/md";

export default function MainLayout({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const notifications: string[] = [
    "New comment on 'Homepage Hero'",
    "Project 'Website Redesign' status updated",
    "You were added to 'Engineering' workspace",
  ];
  const [userPopover, setUserPopover] = useState(false);
  const [notificationsPopover, setNotificationsPopover] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <BottomBar />
        <div className="w-full text-gray-900 dark:text-gray-100 pb-12 md:pb-0">
          <header className="sticky z-2 top-0 backdrop-blur px-6 h-16 flex items-center border-b border-b-gray-300 dark:border-b-slate-700 w-full bg-white/80 dark:bg-gray-900/80">
            <div className="flex justify-between w-full">
              <div className="relative w-md mr-3">
                <input
                  type="search"
                  placeholder="Search projects, tasks, or workspaces..."
                  className="hidden sm:block w-full bg-gray-100 dark:bg-gray-800 pl-9 pr-4 py-2 rounded focus:outline-none focus:ring-3 focus:ring-violet-300 dark:focus:ring-violet-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-shadow"
                />
                <FiSearch className="absolute top-3 left-2 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex gap-3 items-center">
                <ToggleThemeButton />
                <button
                  onClick={() => setNotificationsPopover(true)}
                  className="relative text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors w-9 h-9 flex justify-center items-center"
                >
                  <FiBell />
                  {!!notifications.length && (
                    <span className="absolute top-1.5 right-1.5 rounded-full size-3 bg-red-500 border border-white dark:border-gray-800" />
                  )}
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-slate-600 mx-1" />
                <div
                  onClick={() => setUserPopover(true)}
                  className="relative h-9 w-9 rounded-full border border-gray-300 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-500 transition-colors cursor-pointer"
                >
                  <Image
                    src={user.avatar || "/default-avatar.png"}
                    alt="userAvatar"
                    fill
                    className="object-cover p-0.5 rounded-full"
                  />
                </div>
              </div>
            </div>
          </header>
          <UserProvider>{children}</UserProvider>
        </div>
        <AnimatePresence>
          {userPopover && (
            <div
              onClick={() => setUserPopover(false)}
              className="absolute z-3 inset-0"
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="fixed top-14 right-5 
               bg-white dark:bg-slate-900 
               border border-gray-200 dark:border-slate-700 
               shadow-lg rounded-md min-w-56 overflow-hidden"
              >
                {/* User Info */}
                <div className="text-sm px-3 py-2.5">
                  <p className="text-sm font-medium leading-none text-slate-800 dark:text-white">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-slate-500 dark:text-slate-400 mt-1">
                    {user.email || "user@taskero.com"}
                  </p>
                </div>

                <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />

                {/* Menu Items */}
                <div className="px-1">
                  <Link
                    href={`/taskero/profile/${user._id}`}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm
                   transition-colors 
                   hover:bg-gray-100 dark:hover:bg-slate-800 
                   text-slate-700 dark:text-slate-300"
                  >
                    <FiUser />
                    Profile
                  </Link>

                  <button
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm 
                   transition-colors 
                   hover:bg-gray-100 dark:hover:bg-slate-800 
                   text-slate-700 dark:text-slate-300 w-full"
                  >
                    <FiSettings />
                    Settings
                  </button>
                </div>

                <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />

                {/* Logout */}
                <div className="px-1 pb-1">
                  <button
                    disabled={user.loading}
                    onClick={() => setLogoutModal(true)}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm 
                   transition-colors 
                   hover:bg-gray-100 dark:hover:bg-slate-800 
                   w-full text-red-500 dark:text-red-400 
                   disabled:bg-gray-200 dark:disabled:bg-slate-700"
                  >
                    {user.loading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin" />
                    ) : (
                      <>
                        <FiLogOut />
                        Logout
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {notificationsPopover && (
            <div
              onClick={() => setNotificationsPopover(false)}
              className="absolute z-3 inset-0"
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="fixed top-14 right-5
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-slate-700
        shadow-lg rounded-md min-w-56 overflow-hidden"
              >
                {/* Header */}
                <h2
                  className="px-4 py-3 font-medium text-sm
          text-slate-800 dark:text-slate-100
          border-b border-gray-200 dark:border-slate-700"
                >
                  Notifications
                </h2>

                {notifications.length ? (
                  <div className="max-h-75 overflow-y-auto">
                    {notifications.map((n, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 cursor-pointer transition-colors
                        hover:bg-gray-100 dark:hover:bg-slate-800
                        border-b border-gray-200 dark:border-slate-700 last:border-0"
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-200">
                          {n}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                          3h ago
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="px-4 py-6 flex flex-col items-center gap-2
                  text-gray-500 dark:text-slate-400"
                  >
                    <MdNotifications size={20} />
                    <span className="text-xs">No notifications</span>
                  </div>
                )}

                {/* Footer */}
                <div className="p-2 border-t border-gray-200 dark:border-slate-700">
                  <Link
                    href="/taskero/notifications/"
                    className="inline-flex items-center justify-center
                    w-full h-8 rounded-md text-xs
                    text-violet-600 dark:text-violet-400
                    hover:bg-gray-100 dark:hover:bg-slate-800
                    transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {logoutModal && (
            <LogoutModal closeModal={() => setLogoutModal(false)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
