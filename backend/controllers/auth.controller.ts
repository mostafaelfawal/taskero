import { CookieOptions, Request, Response } from "express";
import { User } from "../models/User.model";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // week only 🙂
  path: "/",
};

function sendCookie(userId: object, res: Response) {
  const token = generateToken(userId);
  res.cookie("token", token, cookieOptions);
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Check user exists 👁
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email alredy exists" });
  }

  // hash password 🔐
  const hash = await bcrypt.hash(password, 10);

  // Create Usre and save Cookie 🍪
  const user = await User.create({ name, email, password: hash });
  sendCookie(user._id, res);
  return res.status(201).json({
    userData: user,
    message: `🎉 Welcome to Taskero, ${user.name}! Your account has been created successfully. Let's start organizing your team tasks!`,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Check user exists 👁
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message:
        "❌ No account found with this email. Please check or sign up first.",
    });
  }

  // compare password 🔐
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({
      message:
        "❌ Incorrect password. Please try again or reset your password.",
    });
  }

  // Login and save Cookie 🍪
  sendCookie(user._id, res);

  res.status(200).json({
    userData: user,
    message: `👋 Welcome back, ${user.name}! Let's continue managing your team tasks efficiently.`,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: `👋 You have been logged out from Taskero. See you soon!`,
  });
};
