import express from "express";
import { deleteMember, getMembers, updateMemberRole } from "../controllers/member.controller";

const router = express.Router();

router.get("/:id", getMembers);
router.patch("/:id/:memberId", updateMemberRole);
router.delete("/:id/:memberId", deleteMember);

export default router;
