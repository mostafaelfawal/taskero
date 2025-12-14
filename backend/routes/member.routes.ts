import express from "express";
import { deleteMember, getMembers, updateMemberRole } from "../controllers/member.controller";
import role from "../middlewares/role.middleware";

const router = express.Router();

router.get("/:workspaceId", role("member"), getMembers);
router.patch("/:workspaceId/:memberId", role("admin"), updateMemberRole);
router.delete("/:workspaceId/:memberId", role("admin"), deleteMember);

export default router;
