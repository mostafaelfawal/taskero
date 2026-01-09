import Image from "next/image";
import { notificationConfig } from "../config/notificationConfig";
import { MessageType } from "../types/NotificationType";

export function NotificationIcon({
  type,
  image,
}: {
  type: MessageType;
  image?: string;
}) {
  const config = notificationConfig[type];

  if (config.icon === "avatar") {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-800">
        <Image
          src={image || "/default-avatar.png"}
          alt="User avatar"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const Icon = config.icon;
  return (
    <div
      className={`h-fit rounded-md p-3 bg-slate-200 dark:bg-slate-600 ${config.iconColor} text-xl`}
    >
      <Icon />
    </div>
  );
}
