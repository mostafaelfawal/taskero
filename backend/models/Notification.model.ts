import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["invite", "alert", "message", "comment", "system"],
    },
    read: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: String,
    workspaceName: String,
  },
  { timestamps: true },
);

export const Notification = mongoose.model("Notification", NotificationSchema);
