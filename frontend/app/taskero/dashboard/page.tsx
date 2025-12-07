"use client";

import AdminProjectItem from "@/features/taskero/dashboard/components/AdminProjectItem";
import ProjectItem from "@/features/taskero/dashboard/components/ProjectItem";
import ProPlanComponent from "@/features/taskero/dashboard/components/ProPlanComponent";
import WorkspaceItem from "@/features/taskero/dashboard/components/WorkspaceItem";
import { RootState } from "@/store/store";
import Link from "next/link";
import { FiArrowRight, FiPlus, FiUsers } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const userName = useSelector((state: RootState) => state.user.name);

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 duration-500">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-slate-500 mt-1">
            Welcome back, {userName || "User"}. Here's what's happening today.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FiUsers className="text-violet-500 text-xl" />
                  Your Workspaces
                </h2>
                <Link
                  href="taskero/workspaces"
                  className="group flex items-center gap-2 hover:underline text-violet-500 hover:text-violet-400 transition-colors"
                >
                  View All{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <WorkspaceItem
                  title="Product Design"
                  lastActive="2h"
                  members={12}
                  projects={8}
                />
                <WorkspaceItem
                  title="Marketing Team"
                  lastActive="1d"
                  members={5}
                  projects={3}
                />
                <WorkspaceItem
                  title="Engineering"
                  lastActive="4h"
                  members={24}
                  projects={15}
                />
                <div className="rounded-xl border shadow flex flex-col items-center justify-center border-dashed text-slate-500 hover:text-violet-500 hover:border-violet-500/50 hover:bg-violet-500/5 cursor-pointer transition-colors h-30">
                  <FiPlus size={25} />
                  Create Workspace
                </div>
              </div>
            </section>
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <LuFolderKanban className="text-violet-500 text-xl" />
                  Projects
                </h2>
                <Link
                  href="taskero/workspaces"
                  className="group flex items-center gap-2 hover:underline text-violet-500 hover:text-violet-400 transition-colors"
                >
                  View All{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <h3 className="font-medium text-slate-500 uppercase tracking-wider text-xs ">
                Projects you manage
              </h3>
              <AdminProjectItem
                progressed={75}
                remainingTask={34}
                state="On Track"
                title="Website Redesign"
              />
              <AdminProjectItem
                progressed={30}
                remainingTask={12}
                state="At Risk"
                title="Mobile App Q2"
              />
              {/* User Projects */}
              <div>
                <h3 className="font-medium text-slate-500 mb-3 uppercase tracking-wider text-xs">
                  Projects you participate in
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ProjectItem
                    title="Q3 Marketing Campaign"
                    tasks={8}
                    progressed={90}
                  />
                  <ProjectItem
                    title="Internal Tools"
                    tasks={45}
                    progressed={50}
                  />
                  <ProjectItem
                    title="Customer Feedback"
                    tasks={12}
                    progressed={15}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <div className="rounded-xl border bg-white dark:bg-transparent border-gray-200 dark:border-slate-700 text-slate-500 shadow p-6">
              <h2 className="font-semibold tracking-tight text-lg text-black dark:text-white">
                Recent Activity
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                What's happening in your team
              </p>

              {/* Activity List */}
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative pl-10 group">
                    {/* Vertical Line */}
                    {i !== 4 && (
                      <div className="absolute left-4 top-8 w-px h-full bg-gray-300 dark:bg-slate-700" />
                    )}

                    {/* Avatar */}
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-sm font-semibold text-violet-600 dark:text-violet-300">
                      AM
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-sm text-black dark:text-white font-medium">
                        Alex Morgan{" "}
                        <span className="font-normal text-slate-500 dark:text-slate-400">
                          completed task
                        </span>
                      </p>

                      <a
                        href="#"
                        className="text-violet-600 dark:text-violet-400 text-sm hover:underline"
                      >
                        #2045 Update Hero
                      </a>

                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProPlanComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
