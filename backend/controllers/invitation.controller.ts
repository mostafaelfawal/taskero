import { Request, Response } from "express";
import { Workspace } from "../models/Workspace.model";
import { User } from "../models/User.model";
import { Invitation } from "../models/Invitation.model";

export const inviteMember = async (req: Request, res: Response) => {
  try {
    const { memberEmail, role } = req.body;
    const inviterId = (req as any).user.id;

    const member = await User.findOne({ email: memberEmail });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    const memberId = member._id;

    const workspaceId = req.params.workspaceId;

    const workspace = await Workspace.findOne({
      _id: workspaceId,
      $or: [{ owners: memberId }, { admins: memberId }, { members: memberId }],
    });

    if (workspace) {
      return res.status(400).json({ message: "User already in workspace" });
    }

    const inviteExists = await Invitation.findOne({ memberId, workspaceId });
    if (inviteExists) {
      return res.status(400).json({ message: "Member already invited" });
    }

    await Invitation.create({ workspaceId, inviterId, memberId, role });

    return res.status(201).json({ message: "User invited successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to invite user" });
  }
};

export const getInvites = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.workspaceId;
    const workspace = await Workspace.findOne({ _id: workspaceId });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    const invitations = await Invitation.find({ workspaceId }).populate(
      "memberId",
      "email name avatar"
    );
    return res.status(200).json({ invitations });
  } catch (error) {
    return res.status(400).json({ message: "Failed to get invites" });
  }
};

export const updateInvite = async (req: Request, res: Response) => {};

export const deleteInvite = async (req: Request, res: Response) => {};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const userId = (req as any).user.id;

    const invite = await Invitation.findOne({ token });
    if (!invite) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    if (invite.status !== "pending") {
      return res.status(400).json({ message: "Invitation is not valid" });
    }

    if (invite.expiresAt < new Date()) {
      invite.status = "expired";
      await invite.save();
      return res.status(400).json({ message: "Invitation expired" });
    }

    if (invite.memberId.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to accept this invite" });
    }

    const workspace = await Workspace.findById(invite.workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // إضافة العضو حسب الدور
    switch (invite.role) {
      case "owner":
        workspace.owners.push(invite.memberId);
        break;
      case "admin":
        workspace.admins.push(invite.memberId);
        break;
      default:
        workspace.members.push(invite.memberId);
    }

    await workspace.save();

    invite.status = "accepted";
    await invite.save();

    return res.status(200).json({ message: "Invitation accepted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to accept invite" });
  }
};

export const declineInvite = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const userId = (req as any).user.id;

    const invite = await Invitation.findOne({ token });
    if (!invite) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    if (invite.memberId.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    invite.status = "revoked";
    await invite.save();

    return res.status(200).json({ message: "Invitation declined" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to decline invite" });
  }
};
