"use client";

import Sidebar from "@/features/taskero/components/Sidebar";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { RootState } from "@/store/store";
import Image from "next/image";
import { ReactNode } from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function MainLayout({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full text-gray-900 dark:text-gray-100">
          <header className="sticky top-0 backdrop-blur px-6 h-16 flex items-center border-b border-b-gray-300 dark:border-b-slate-700 w-full bg-white/80 dark:bg-gray-900/80">
            <div className="flex justify-between w-full">
              <div className="relative w-md">
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
                <div className="relative h-9 w-9 border rounded-full border-gray-300 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-500 transition-colors cursor-pointer">
                  <Image
                    src={user.avatar || "/default-avatar.png"}
                    alt="userAvatar"
                    fill
                    className="object-cover p-0.5"
                  />
                </div>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
