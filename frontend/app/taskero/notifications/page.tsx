"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { NotificationItem } from "@/features/taskero/notifications/components/NotificationItem";
import NotificationFilters from "@/features/taskero/notifications/components/NotificationFilters";
import { NotificationType } from "@/features/taskero/notifications/types/NotificationType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Notifications() {
  const { data = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,
        { withCredentials: true },
      );
      return res.data.notifications as NotificationType[];
    },
  });

  const [filteredNotifications, setFilteredNotifications] =
    useState<NotificationType[]>(data);

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
          notifications={data}
        />

        {filteredNotifications.length ? (
          <div className="space-y-3 mt-6">
            {filteredNotifications.map((n) => (
              <NotificationItem key={n._id} {...n} />
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
