import mongoose from "mongoose";
import { v4 } from "uuid";

const InvitationSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true, // لتسريع البحث
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      required: true,
      default: "member",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "expired"],
      default: "pending",
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      default: () => v4(),
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // صلاحية 7 أيام
    },
  },
  { timestamps: true }
);

// Index على workspaceId + email لتسريع البحث عند التحقق من الدعوات
InvitationSchema.index({ workspaceId: 1, email: 1 }, { unique: true });
InvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Invitation = mongoose.model("Invitation", InvitationSchema);
