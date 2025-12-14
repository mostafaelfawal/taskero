import { NextFunction, Request, Response } from "express";
import { Workspace } from "../models/Workspace.model";

export default function role(requiredRole: "owner" | "admin" | "member") {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const workspaceId = req.params.workspaceId;
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" });

    let hasRole = false;

    switch (requiredRole) {
      case "owner":
        hasRole = workspace.owners.some((o) => o.toString() === user.id);
        break;
      case "admin":
        hasRole =
          workspace.admins.some((o) => o.toString() === user.id) ||
          workspace.owners.some((o) => o.toString() === user.id);
        break;
      case "member":
        hasRole =
          workspace.members.some((o) => o.toString() === user.id) ||
          workspace.admins.some((o) => o.toString() === user.id) ||
          workspace.owners.some((o) => o.toString() === user.id);
        break;
    }
    (req as any).role = requiredRole

    if (!hasRole) return res.status(403).json({ message: "Forbidden" });

    next();
  };
}
