import { Request, Response } from "express";
import { Workspace } from "../models/Workspace.model";
import mongoose from "mongoose";
import { User } from "../models/User.model";

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const ownerId = new mongoose.Types.ObjectId(userId);

    const createdWorkspace = await Workspace.create({
      name,
      description,
      owners: [ownerId],
      admins: [],
      members: [],
      projects: [],
    });

    await User.findByIdAndUpdate(userId, { $inc: { workspaces: 1 } });

    return res.status(201).json({
      message: "Workspace created successfully",
      workspace: createdWorkspace,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to create workspace" });
  }
};

export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workspaces = await Workspace.find({
      $or: [{ owners: userId }, { admins: userId }, { members: userId }],
    }).populate("owners", "avatar");

    return res.status(200).json({ workspaces });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to get workspaces" });
  }
};

export const getWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const workspaceId = req.params.id;

    const workspace = await Workspace.findOne({
      _id: workspaceId,
      $or: [{ owners: userId }, { admins: userId }, { members: userId }],
    });

    return res.status(200).json({ workspace });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to get workspace" });
  }
};

export const updateWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const workspaceId = req.params.id;
    const { name, description } = req.body;

    const workspace = await Workspace.findOneAndUpdate(
      {
        _id: workspaceId,
        $or: [{ owners: userId }, { admins: userId }, { members: userId }],
      },
      { name, description },
      { new: true }
    );

    if (!workspace) {
      return res
        .status(404)
        .json({ message: "Workspace not found or access denied" });
    }

    return res.status(200).json({
      message: "Workspace updated successfully",
      workspace,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to update workspace" });
  }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const workspaceId = req.params.id;
    const workspace = await Workspace.findByIdAndDelete(workspaceId);
    await User.findByIdAndUpdate(userId, { $inc: { workspaces: -1 } });
    
    if (!workspace) {
      return res
        .status(404)
        .json({ message: "Workspace not found or access denied" });
    }
    return res.status(200).json({ message: "Workspace deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to delete workspace" });
  }
};
