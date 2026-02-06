import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: String,
    read: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model("Notification", NotificationSchema);
