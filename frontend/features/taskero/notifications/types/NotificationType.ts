export type MessageType = "invite" | "alert" | "message" | "comment" | "system";

export type NotificationType = {
  _id: number;
  message: string;
  type: MessageType;
  createdAt: string;
  read: boolean;
  image?: string;
};
