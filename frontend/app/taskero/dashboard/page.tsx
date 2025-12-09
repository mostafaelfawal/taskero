"use client";

import AdminProjectItem from "@/features/taskero/dashboard/components/AdminProjectItem";
import EmptyState from "@/features/taskero/dashboard/components/EmptyState";
import ProjectItem from "@/features/taskero/dashboard/components/ProjectItem";
import ProPlanComponent from "@/features/taskero/dashboard/components/ProPlanComponent";
import RecentActivity from "@/features/taskero/dashboard/components/RecentActivity";
import WorkspaceItem from "@/features/taskero/dashboard/components/WorkspaceItem";
import { RootState } from "@/store/store";
import Link from "next/link";
import { FiArrowRight, FiPlus, FiUsers } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import CreateWorkspaceModal from "@/features/taskero/wokspaces/components/CreateWorkspaceModal";

export default function Dashboard() {
  const userName = useSelector((state: RootState) => state.user.name);
  const firstName = useMemo(() => userName.split(" ")[0] || "User", [userName]);
  const [createWorkspaceModal, setCreateWorkspaceModal] = useState(false);

  const workspaces: any[] = [
    {
      id: 9,
      title: "Product Design",
      lastActive: "2h",
      members: 12,
      projects: 8,
    },
    {
      id: 10,
      title: "Marketing Team",
      lastActive: "1d",
      members: 5,
      projects: 3,
    },
    {
      id: 11,
      title: "Engineering",
      lastActive: "4h",
      members: 24,
      projects: 15,
    },
  ];

  const adminProjects: any[] = [
    {
      id: 1,
      title: "Website Redesign",
      remainingTask: 34,
      progressed: 75,
      state: "On Track",
    },
    {
      id: 2,
      title: "Mobile App Q2",
      remainingTask: 12,
      progressed: 30,
      state: "At Risk",
    },
  ];

  const userProjects: any[] = [
    { id: 3, title: "Q3 Marketing Campaign", tasks: 8, progressed: 90 },
    { id: 4, title: "Internal Tools", tasks: 45, progressed: 50 },
    { id: 5, title: "Customer Feedback", tasks: 12, progressed: 15 },
  ];

  const recentActivity: any[] = [
    {
      id: 6,
      isLastRecent: false,
      userInitials: "MA",
      user: "Mostafa Ahmed",
      action: "created a new task in",
      task: "Design Landing Page",
      time: "2 hours ago",
    },
    {
      id: 7,
      isLastRecent: false,
      userInitials: "SR",
      user: "Sara Reda",
      action: "completed the task",
      task: "Update Profile UI",
      time: "5 hours ago",
    },
    {
      id: 8,
      isLastRecent: true,
      userInitials: "AH",
      user: "Ali Hassan",
      action: "commented on",
      task: "Fix Sidebar Bug",
      time: "1 day ago",
    },
  ];

  // ===========================

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
      className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 duration-500"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-slate-500 mt-1">
            Welcome back, {firstName}. Here's what's happening today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            {/* WORKSPACES SECTION */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FiUsers className="text-violet-500 text-xl" />
                  Your Workspaces
                </h2>

                <Link
                  href="/taskero/workspaces"
                  className="group flex items-center gap-2 hover:underline text-violet-500 hover:text-violet-400 transition-colors"
                >
                  View All
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {workspaces.length === 0 ? (
                <EmptyState
                  icon={FiUsers}
                  title="No Workspaces Yet"
                  description="Start by creating your first workspace."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workspaces.map((w) => (
                    <WorkspaceItem {...w} key={w.id} />
                  ))}

                  <div onClick={() => setCreateWorkspaceModal(true)} className="rounded-xl border shadow flex flex-col items-center justify-center border-dashed text-slate-500 hover:text-violet-500 hover:border-violet-500/50 hover:bg-violet-500/5 cursor-pointer transition-colors h-30">
                    <FiPlus size={25} />
                    Create Workspace
                  </div>
                </div>
              )}
            </section>

            {/* PROJECTS SECTION */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <LuFolderKanban className="text-violet-500 text-xl" />
                  Projects
                </h2>
                <Link
                  href="/taskero/workspaces"
                  className="group flex items-center gap-2 hover:underline text-violet-500 hover:text-violet-400 transition-colors"
                >
                  View All
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Admin Projects */}
              <h3 className="font-medium text-slate-500 uppercase tracking-wider text-xs">
                Projects you manage
              </h3>

              {adminProjects.length === 0 ? (
                <EmptyState
                  icon={LuFolderKanban}
                  title="No Managed Projects"
                  description="Projects you manage will appear here."
                />
              ) : (
                adminProjects.map((p) => <AdminProjectItem key={p.id} {...p} />)
              )}

              {/* User Projects */}
              <div>
                <h3 className="font-medium text-slate-500 mb-3 uppercase tracking-wider text-xs">
                  Projects you participate in
                </h3>

                {userProjects.length === 0 ? (
                  <EmptyState
                    icon={LuFolderKanban}
                    title="No Participated Projects"
                    description="Projects you participate in will appear here."
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {userProjects.map((p) => (
                      <ProjectItem key={p.id} {...p} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* RECENT ACTIVITY */}
            <div className="rounded-xl border bg-white dark:bg-transparent border-gray-200 dark:border-slate-700 text-slate-500 shadow p-6">
              <h2 className="font-semibold tracking-tight text-lg text-black dark:text-white">
                Recent Activity
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                What's happening in your team
              </p>

              {recentActivity.length === 0 ? (
                <EmptyState
                  icon={FiUsers}
                  title="No Recent Activity"
                  description="Your team's latest updates will appear here."
                />
              ) : (
                <div className="space-y-6">
                  {recentActivity.map((a, i) => (
                    <RecentActivity
                      key={a.id}
                      isLastRecent={i !== recentActivity.length - 1}
                      {...a}
                    />
                  ))}
                </div>
              )}
            </div>

            <ProPlanComponent />
          </div>
        </div>
      </div>
      {createWorkspaceModal && (
        <CreateWorkspaceModal
          closeModal={() => setCreateWorkspaceModal(false)}
        />
      )}
    </motion.main>
  );
}
