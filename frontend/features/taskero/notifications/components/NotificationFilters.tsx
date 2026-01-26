"use client";

import { useEffect, useState } from "react";
import { MessageType, NotificationType } from "../types/NotificationType";

export default function NotificationFilters({
  notifications,
  setFilteredNotifications,
}: {
  notifications: NotificationType[];
  setFilteredNotifications: (n: NotificationType[]) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState<MessageType | "all">("all");

  useEffect(() => {
    const newNotifications = notifications.filter(
      (n) =>
        (n.type === selectedType || selectedType === "all") &&
        ((selectedStatus === "Read" && n.read) ||
          (selectedStatus === "Unread" && !n.read) ||
          selectedStatus === "all"),
    );
    setFilteredNotifications(newNotifications);
  }, [notifications, selectedStatus, selectedType]);

  return (
    <div className="space-y-4 border-b border-slate-300 dark:border-slate-700 pb-6">
      {/* Status */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`min-h-8 rounded-md px-3 text-xs transition-colors
                  border border-slate-300
                  dark:border-slate-700 dark:text-slate-300
                  ${selectedStatus === "all" ? "bg-violet-600 hover:bg-violet-700 text-white border-transparent" : "dark:hover:bg-slate-800 dark:bg-slate-900 bg-white hover:bg-slate-100"}`}
          >
            All
          </button>

          {["Read", "Unread"].map((i) => (
            <button
              key={i}
              onClick={() => setSelectedStatus(i)}
              className={`min-h-8 rounded-md px-3 text-xs transition-colors
                  border border-slate-300
                  dark:border-slate-700 dark:text-slate-300
                  ${selectedStatus === i ? "bg-violet-600 hover:bg-violet-700 text-white border-transparent" : "dark:hover:bg-slate-800 dark:bg-slate-900 bg-white hover:bg-slate-100"}`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Type
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType("all")}
            className={`min-h-8 rounded-md px-3 text-xs transition-colors
                  border border-slate-300
                  dark:border-slate-700 dark:text-slate-300 
                  ${selectedType === "all" ? "text-white bg-violet-600 hover:bg-violet-700 border-transparent" : "dark:bg-slate-900 dark:hover:bg-slate-800 bg-white hover:bg-slate-100"}`}
          >
            All
          </button>

          {["invite", "alert", "message", "comment", "system"].map((i) => (
            <button
              key={i}
              onClick={() => setSelectedType(i as MessageType)}
              className={`min-h-8 rounded-md px-3 text-xs transition-colors
                  border border-slate-300 
                  dark:border-slate-700 dark:text-slate-300 
                  ${selectedType === i ? "text-white bg-violet-600 hover:bg-violet-700 border-transparent" : "dark:bg-slate-900 dark:hover:bg-slate-800 bg-white hover:bg-slate-100"}`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
