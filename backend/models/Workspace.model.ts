import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

WorkspaceSchema.index({ owners: 1 });
WorkspaceSchema.index({ admins: 1 });
WorkspaceSchema.index({ members: 1 });

export const Workspace = mongoose.model("Workspace", WorkspaceSchema);
