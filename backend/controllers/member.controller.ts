import { Request, Response } from "express";
import { Workspace } from "../models/Workspace.model";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.workspaceId;

    const workspace = await Workspace.findById(workspaceId)
      .populate("owners", "name avatar email")
      .populate("admins", "name avatar email")
      .populate("members", "name avatar email");

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // تجميع الأعضاء مع الـ role الخاص بكل واحد
    const formatUsers = (users: any[], role: string) =>
      users.map((u) => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        role,
      }));

    const members = [
      ...formatUsers(workspace.owners, "owner"),
      ...formatUsers(workspace.admins, "admin"),
      ...formatUsers(workspace.members, "member"),
    ];

    return res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to get members" });
  }
};

export const updateMemberRole = async (req: Request, res: Response) => {
  try {
    const { newRole } = req.body;
    const workspaceId = req.params.workspaceId;
    const memberId = req.params.memberId;
    const role = (req as any).role

    if (role==="admin" && newRole === "owner") {
      return res.status(400).json({ message: "admin cannot change owners role" })
    }
    if (!["owner", "admin", "member"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ازالة العضو من كل الأدوار
    await Workspace.findByIdAndUpdate(workspaceId, {
      $pull: {
        owners: memberId,
        admins: memberId,
        members: memberId,
      },
    });

    const roleField =
      newRole === "owner"
        ? "owners"
        : newRole === "admin"
        ? "admins"
        : "members";

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { $addToSet: { [roleField]: memberId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Role updated successfully",
      workspace: updatedWorkspace,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to change role" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.workspaceId;
    const memberId = req.params.memberId;

    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $pull: {
          members: memberId,
          admins: memberId,
          owners: memberId,
        },
      },
      { new: true }
    );

    if (!updatedWorkspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    return res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to delete member" });
  }
};
