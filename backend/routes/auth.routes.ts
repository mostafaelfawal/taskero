import express from "express";
import {
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

export default router;
