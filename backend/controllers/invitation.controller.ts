import { Request, Response } from "express";
import { Workspace } from "../models/Workspace.model";
import { User } from "../models/User.model";
import { Invitation } from "../models/Invitation.model";
import { Notification } from "../models/Notification.model";

export const inviteMember = async (req: Request, res: Response) => {
  try {
    const { memberEmail, role } = req.body;
    const inviterId = (req as any).user.id;
    const workspaceId = req.params.workspaceId;

    const inviter = await User.findById(inviterId).select("name");
    if (!inviter) {
      return res.status(404).json({ message: "Inviter not found" });
    }

    const member = await User.findOne({ email: memberEmail }).select("_id");
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    const memberId = member._id;

    // تأكد أن الـ workspace موجود
    const workspace = await Workspace.findById(workspaceId).select("name");
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // تحقق هل العضو موجود بالفعل
    const memberIsInWorkspace = await Workspace.exists({
      _id: workspaceId,
      $or: [{ owners: memberId }, { admins: memberId }, { members: memberId }],
    });

    if (memberIsInWorkspace) {
      return res.status(400).json({ message: "Member already in workspace" });
    }

    // تحقق هل تمت دعوته مسبقاً
    const inviteExists = await Invitation.exists({
      memberId,
      workspaceId,
    });

    if (inviteExists) {
      return res.status(400).json({ message: "Member already invited" });
    }

    const newInvitation = await Invitation.create({
      workspaceId,
      inviterId,
      memberId,
      role,
    });

    await Notification.create({
      message: `${inviter.name} invited you to '${workspace.name}' workspace`,
      type: "invite",
      userId: memberId,
      token: newInvitation.token,
    });

    return res.status(201).json({ message: "Member invited successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to invite Member" });
  }
};

export const getInvites = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params.workspaceId;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const invitations = await Invitation.find({ workspaceId }).populate(
      "memberId",
      "email name avatar",
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
      return res
        .status(403)
        .json({ message: "Not allowed to accept this invite" });
    }

    const workspace = await Workspace.findById(invite.workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

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
    await Invitation.findOneAndDelete({ token });
    await invite.save();

    return res
      .status(200)
      .json({ message: "Invitation accepted successfully" });
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
