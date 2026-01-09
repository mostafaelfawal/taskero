import { notificationConfig } from "../config/notificationConfig";
import { MessageType } from "../types/NotificationType";

export function NotificationBadge({ type }: { type: MessageType }) {
  const config = notificationConfig[type];

  return (
    <span
      className={`capitalize px-2 py-1 text-xs rounded-md border border-transparent ${config.badgeClass}`}
    >
      {type}
    </span>
  );
}
