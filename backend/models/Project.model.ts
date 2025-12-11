import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],

    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProjectSchema.index({ workspaceId: 1 });

export const Project = mongoose.model("Project", ProjectSchema);
