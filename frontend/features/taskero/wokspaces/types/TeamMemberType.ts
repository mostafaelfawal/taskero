export type TeamMemberType = {
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  memberId: { name: string; avatar: string };
};
