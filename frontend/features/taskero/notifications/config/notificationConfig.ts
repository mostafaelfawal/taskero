import {
  FiBell,
  FiInfo,
  FiMessageSquare,
} from "react-icons/fi";

export const notificationConfig = {
  invite: {
    icon: "avatar",
    badgeClass: "bg-violet-200 text-violet-800 dark:bg-violet-500/20 dark:text-violet-300",
  },
  system: {
    icon: FiBell,
    iconColor: "text-gray-500 dark:text-gray-200",
    badgeClass: "bg-slate-200 text-slate-800 dark:bg-slate-500/20 dark:text-slate-300",
  },
  comment: {
    icon: FiMessageSquare,
    iconColor: "text-green-500 dark:text-green-200",
    badgeClass: "bg-green-200 text-green-800 dark:bg-green-500/20 dark:text-green-300",
  },
  message: {
    icon: FiMessageSquare,
    iconColor: "text-blue-500 dark:text-blue-200",
    badgeClass: "bg-blue-200 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
  },
  alert: {
    icon: FiInfo,
    iconColor: "text-orange-500 dark:text-orange-200",
    badgeClass: "bg-orange-200 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300",
  },
} as const;
