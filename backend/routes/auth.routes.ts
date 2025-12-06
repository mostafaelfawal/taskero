import express from "express";
import {
  deleteAccount,
  getUserData,
  login,
  logout,
  oauthSignin,
  signup,
  updateUserData,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/oauth-signin", oauthSignin);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/user-data", getUserData);
router.put("/", updateUserData)
router.post("/delete-account", deleteAccount)

export default router;
