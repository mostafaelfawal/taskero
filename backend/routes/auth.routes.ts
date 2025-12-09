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
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", login);
router.post("/oauth-signin", oauthSignin);
router.post("/signup", signup);
router.get("/logout", logout);

router.get("/user-data", auth, getUserData);
router.put("/", auth, updateUserData);
router.delete("/delete-account", auth, deleteAccount);

export default router;
