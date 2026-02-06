import { Request, Response } from "express";
import { Notification } from "../models/Notification.model";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const notifications = await Notification.find({ userId: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ notifications });
  } catch {}
};
