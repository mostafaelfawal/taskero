import express from "express";
import {
  acceptInvite,
  declineInvite,
  deleteInvite,
  getInvites,
  inviteMember,
  updateInvite,
} from "../controllers/invitation.controller";

const router = express.Router();

router.post("/:id/invitations", inviteMember);
router.get("/:id/invitations", getInvites);
router.patch("/:id/invitations/:inviteId", updateInvite);
router.delete("/:id/invitations/:inviteId", deleteInvite);
router.post("/:token/accept", acceptInvite);
router.post("/:token/decline", declineInvite);

export default router;
