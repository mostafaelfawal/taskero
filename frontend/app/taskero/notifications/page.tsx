"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { NotificationItem } from "@/features/taskero/notifications/components/NotificationItem";
import NotificationFilters from "@/features/taskero/notifications/components/NotificationFilters";
import { NotificationType } from "@/features/taskero/notifications/types/NotificationType";

export default function Notifications() {
  const [notifications] = useState<NotificationType[]>([
    {
      id: 1927319823,
      message: "Sarah Connor invited you to 'Product Design' workspace",
      type: "invite",
      createdAt: "30 minutes",
      read: true,
    },
    {
      id: 1927319824,
      message: "You were added to 'Engineering' workspace",
      type: "system",
      createdAt: "1 day",
      read: false,
    },
    {
      id: 1927319825,
      message: "New comment on 'Homepage Hero' design",
      type: "comment",
      createdAt: "1 hour",
      read: true,
    },
    {
      id: 1927319826,
      message: "Jhon Doe mentioned you in a comment",
      type: "message",
      createdAt: "2 hours",
      read: false,
    },
    {
      id: 1927319827,
      message: "Project 'Website Redesign' status updated to At Risk",
      type: "alert",
      createdAt: "3 hours",
      read: true,
    },
  ]);
  const [filteredNotifications, setFilteredNotifications] =
    useState<NotificationType[]>(notifications);

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
      className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 text-slate-900 dark:text-slate-100"
    >
      <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-1">
        Stay updated with your team activity and workspace changes.
      </p>

      <div className="mt-8">
        {/* Filters */}
        <NotificationFilters
          setFilteredNotifications={(n) => setFilteredNotifications(n)}
          notifications={notifications}
        />

        {filteredNotifications.length ? (
          <div className="space-y-3 mt-6">
            {filteredNotifications.map((n) => (
              <NotificationItem key={n.id} {...n} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-slate-300/50 dark:bg-slate-700/50 flex items-center justify-center mb-4">
              <FiBell size={25} />
            </div>
            <h2 className="text-lg font-semibold mb-2">No notifications</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              No notifications match your current filters.
            </p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
