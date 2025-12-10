import express from "express";
import { deleteMember, getMembers, updateMemberRole } from "../controllers/member.controller";

const router = express.Router();

router.get("/:id/members", getMembers);
router.patch("/:id/members/:userId", updateMemberRole);
router.delete("/:id/members/:userId", deleteMember);

export default router;
