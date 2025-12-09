import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    owners: [String],
    members: [{userId: Number, role: String}],
    
  },
  { timestamps: true }
);

export const Workspace = mongoose.model("Workspace", WorkspaceSchema);
