import { CookieOptions, Request, Response } from "express";
import { User } from "../models/User.model";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

// ===============================
// Cookie Settings
// ===============================
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false, // true in production with HTTPS
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  path: "/",
};

// ===============================
// Helper – Send JWT Cookie
// ===============================
function sendCookie(userId: object, res: Response) {
  const token = generateToken(userId);
  res.cookie("token", token, cookieOptions);
}

// ===============================
// Signup
// ===============================
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      avatar: "/default-avatar.png",
    });

    sendCookie(user._id, res);

    return res.status(201).json({
      userData: user,
      message: `🎉 Welcome to Taskero, ${user.name}! Your account has been created successfully.`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Login
// ===============================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "❌ No account found with this email.",
      });
    }

    const match = await bcrypt.compare(password, user.password!);
    if (!match) {
      return res.status(400).json({
        message: "❌ Incorrect password.",
      });
    }

    sendCookie(user._id, res);

    return res.status(200).json({
      userData: user,
      message: `👋 Welcome back, ${user.name}!`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Logout
// ===============================
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  return res.status(200).json({
    message: "👋 Logged out successfully.",
  });
};

// ===============================
// OAuth Signin
// ===============================
export const oauthSignin = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, avatar });
      sendCookie(user._id, res);

      return res.status(201).json({
        userData: user,
        message: `🎉 Welcome to Taskero, ${user.name}!`,
      });
    }

    sendCookie(user._id, res);

    return res.status(200).json({
      userData: user,
      message: `👋 Welcome back, ${user.name}!`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Get User Data
// ===============================
export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ userData: user });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Update User Data (Profile + Password)
// ===============================
export const updateUserData = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, ...rest } = req.body;

    // Password update
    if (currentPassword && newPassword) {
      const user = await User.findById(req.query.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const match = await bcrypt.compare(currentPassword, user.password!);
      if (!match) {
        return res.status(400).json({
          message: "The current password is incorrect.",
        });
      }

      rest.password = await bcrypt.hash(newPassword, 10);
    }

    // Update other fields
    const user = await User.findByIdAndUpdate(req.query.id, rest, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ userData: user });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Delete Account
// ===============================
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.query.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Your account has been deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
