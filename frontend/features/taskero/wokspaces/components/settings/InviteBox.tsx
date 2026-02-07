import { useState } from "react";
import { FiSend, FiUserPlus } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RoleType } from "../../types/RoleType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import ErrorText from "@/features/auth/components/ErrorText";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { TeamMemberType } from "../../types/TeamMemberType";

export default function InviteBox({ workspaceId }: { workspaceId: string }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RoleType>("owner");
  const [isSend, setIsSend] = useState(false);
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["invitations", workspaceId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/invitation/${workspaceId}`, {
        withCredentials: true,
      });
      return res.data.invitations;
    },
  });

  const sendInvite = useMutation({
    mutationFn: async () => {
      setIsSend(true);
      return axios.post(
        `${API_URL}/api/invitation/${workspaceId}/`,
        {
          memberEmail: email,
          role,
        },
        { withCredentials: true },
      );
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      setEmail("");
      setIsSend(false);
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
    onError: (res: AxiosError<{ message: string }>) => {
      toast.error(res.response?.data.message);
      setIsSend(false);
    },
  });

  const handleSendInvite = () => sendInvite.mutate();

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-5 shadow-sm">
      {/* Header */}
      <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <FiUserPlus size={18} className="text-violet-600" />
        Invite New Members
      </h3>

      {/* Input + Role + Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <MdOutlineMailOutline
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-10 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as RoleType)}
          className="h-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow w-fit"
        >
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>

        <button
          disabled={isSend || !email}
          onClick={handleSendInvite}
          className="h-10 px-5 rounded-md bg-violet-600 disabled:opacity-60 hover:bg-violet-700 text-white text-sm transition shadow-sm flex items-center gap-2 w-fit"
        >
          {isSend ? (
            "Inviting..."
          ) : (
            <>
              <FiSend /> Invite
            </>
          )}
        </button>
      </div>

      {/* Invitations List */}
      <div className="space-y-2">
        {isLoading && (
          <p className="text-sm text-gray-500">Loading invitations...</p>
        )}
        {isError && <ErrorText errorMessage="Failed to get invitations" />}
        {data.length === 0 && !isLoading && !isError && (
          <p className="text-sm text-gray-500">No invitations yet</p>
        )}

        <ul className="space-y-2">
          {data.map((i: TeamMemberType) => (
            <motion.li
              key={i._id}
              className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={i.memberId?.avatar || "/default-avatar.png"}
                  alt={i.memberId?.name || "User"}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {i.memberId?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {i.memberId?.name || "taskero@example.com"} • {i.role}
                  </span>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  i.status === "pending"
                    ? "bg-violet-100 text-violet-700"
                    : i.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : i.status === "expired"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                }`}
              >
                {i.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
