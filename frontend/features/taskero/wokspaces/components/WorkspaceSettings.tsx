import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import InviteBox from "./settings/InviteBox";
import MembersList from "./settings/MembersList";

export default function WorkspaceSettings({
  workspaceId,
  closeSettings,
}: {
  workspaceId: string;
  closeSettings: VoidFunction;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/member/${workspaceId}`, {
        withCredentials: true,
      });
      return res.data.members;
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (memberId: string) =>
      axios.delete(`${API_URL}/api/member/${workspaceId}/${memberId}`, {
        withCredentials: true,
      }),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
    },
    onError: () => toast.error("Failed to delete member"),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({
      memberId,
      newRole,
    }: {
      memberId: string;
      newRole: string;
    }) =>
      axios.patch(
        `${API_URL}/api/member/${workspaceId}/${memberId}`,
        { newRole },
        { withCredentials: true }
      ),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["members", workspaceId] });
    },
    onError: () => toast.error("Failed to change role"),
  });

  const handleDelete = (id: string) => deleteMemberMutation.mutate(id);
  const handleUpdate = (id: string, newRole: string) =>
    updateRoleMutation.mutate({ memberId: id, newRole });

  const [popoverOpen, setPopoverOpen] = useState<number | null>(null);
  const togglePopover = (i: number) =>
    setPopoverOpen(popoverOpen === i ? null : i);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const isLast = (i: number) => i >= data.length - 2;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(null);
      }
    }
    if (popoverOpen !== null)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popoverOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-2 bg-black/70 backdrop-blur-sm"
      onClick={closeSettings}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        exit={{ x: 300 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:max-w-xl p-6 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 overflow-y-auto"
      >
        <button
          onClick={closeSettings}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col space-y-2 mb-8">
          <h2 className="text-xl font-semibold">Manage Members</h2>
          <p className="text-sm text-gray-500">Manage access and roles.</p>
        </div>

        <InviteBox workspaceId={workspaceId}/>

        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">
          Workspace Members ({data.length})
        </h3>

        <MembersList
          data={data}
          isLoading={isLoading}
          isError={isError}
          popoverOpen={popoverOpen}
          togglePopover={togglePopover}
          popoverRef={popoverRef}
          isLast={isLast}
          handleDelete={handleDelete}
          handleUpdate={(memberId: string, newRole: string) =>
            handleUpdate(memberId, newRole)
          }
        />
      </motion.div>
    </motion.div>
  );
}
