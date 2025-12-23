import express from "express";
import role from "../middlewares/role.middleware";
import {
  acceptInvite,
  declineInvite,
  deleteInvite,
  getInvites,
  inviteMember,
  updateInvite,
} from "../controllers/invitation.controller";

const router = express.Router();

router.post("/:workspaceId", role("owner"), inviteMember);
router.get("/:workspaceId", role("admin"), getInvites);
router.patch("/:workspaceId/:inviteId", updateInvite);
router.delete("/:workspaceId/:inviteId", deleteInvite);
router.post("/:token/accept", acceptInvite);
router.post("/:token/decline", declineInvite);

export default router;
