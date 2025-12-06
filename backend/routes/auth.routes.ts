import express from "express";
import {
  getUserData,
  login,
  logout,
  oauthSignin,
  signup,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/oauth-signin", oauthSignin);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/user-data", getUserData);

export default router;
