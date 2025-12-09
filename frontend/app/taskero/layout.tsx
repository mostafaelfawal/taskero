"use client";

import Sidebar from "@/features/taskero/components/Sidebar";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { RootState } from "@/store/store";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FiBell, FiLogOut, FiSearch, FiSettings, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import UserProvider from "@/providers/UserProvider";
import Link from "next/link";
import LogoutModal from "@/features/taskero/components/logoutModal";

export default function MainLayout({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);
  const [userPopup, setUserPopup] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full text-gray-900 dark:text-gray-100">
          <header className="sticky z-2 top-0 backdrop-blur px-6 h-16 flex items-center border-b border-b-gray-300 dark:border-b-slate-700 w-full bg-white/80 dark:bg-gray-900/80">
            <div className="flex justify-between w-full">
              <div className="relative w-md mr-3">
                <input
                  type="search"
                  placeholder="Search projects, tasks, or workspaces..."
                  className="w-full bg-gray-100 dark:bg-gray-800 pl-9 pr-4 py-2 rounded focus:outline-none focus:ring-3 focus:ring-violet-300 dark:focus:ring-violet-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-shadow"
                />
                <FiSearch className="absolute top-3 left-2 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex gap-3 items-center">
                <ToggleThemeButton />
                <button className="relative text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 transition-colors w-9 h-9 flex justify-center items-center">
                  <FiBell />
                  <span className="absolute top-1.5 right-1.5 rounded-full size-3 bg-red-500 border border-white dark:border-gray-800"></span>
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-slate-600 mx-1"></div>
                <div
                  onClick={() => setUserPopup(true)}
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
        {userPopup && (
          <div onClick={() => setUserPopup(false)} className="absolute z-3 inset-0">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
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
        {logoutModal && (
          <LogoutModal closeModal={() => setLogoutModal(false)} />
        )}
      </div>
    </>
  );
}
