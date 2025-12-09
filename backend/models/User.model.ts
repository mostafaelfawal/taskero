import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String, required: true },
    tasksCreated: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    workspaces: { type: Number, default: 0 },
    gitHubProfile: String,
    linkedInProfile: String,
    portfolioWebsite: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
