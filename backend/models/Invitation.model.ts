import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const InvitationSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    inviterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["owner", "admin", "member"],
    },

    token: {
      type: String,
      default: uuidv4,
    },

    expiresAt: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 Days
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "expired", "revoked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

InvitationSchema.index({ email: 1 });
InvitationSchema.index({ workspaceId: 1 });

export const Invitation = mongoose.model("Invitation", InvitationSchema);
