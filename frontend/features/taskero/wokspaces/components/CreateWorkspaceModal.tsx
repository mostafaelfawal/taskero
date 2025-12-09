import Modal from "@/components/Modal";
import { useState } from "react";
import { FiPlus, FiShield } from "react-icons/fi";

type TeamMemberType = {
  email: string;
  role: "owner" | "admin" | "member";
};

export default function CreateWorkspaceModal({
  closeModal,
}: {
  closeModal: VoidFunction;
}) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  
  const handleAddMember = () => {

  }
  return (
    <Modal closeModal={closeModal}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="font-semibold tracking-tight text-xl text-slate-800 dark:text-slate-100">
            Create New Workspace
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create a new shared environment for your team to collaborate on
            projects.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6 py-2">
          {/* Workspace Name */}
          <div>
            <label
              htmlFor="workspace-name"
              className="text-sm text-slate-700 dark:text-slate-300"
            >
              Workspace Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="workspace-name"
              placeholder="e.g. Acme Corp Marketing"
              className="flex h-9 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-violet-500 md:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm text-slate-700 dark:text-slate-300"
            >
              Description
            </label>
            <textarea
              rows={4}
              id="description"
              placeholder="Briefly describe what this workspace is for..."
              className="flex w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-violet-500 md:text-sm"
            />
          </div>

          {/* Invite Members */}
          <div className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-slate-900/40 transition-colors">
            <label className="text-slate-700 dark:text-slate-300">
              Invite Team Members
            </label>

            <div className="flex gap-2 items-end mt-4">
              {/* Email */}
              <div className="grid gap-2 flex-1">
                <label
                  htmlFor="email"
                  className="font-medium text-xs text-slate-500 dark:text-slate-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email@taskero.com"
                  className="flex h-9 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-violet-500 md:text-sm"
                />
              </div>

              {/* Role */}
              <div className="grid gap-2 flex-1">
                <label
                  htmlFor="role"
                  className="font-medium text-xs text-slate-500 dark:text-slate-400"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="flex h-9 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-violet-500 md:text-sm"
                >
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              </div>

              {/* Add button */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors text-white h-9 w-9 shrink-0 bg-violet-600 hover:bg-violet-700"
              >
                <FiPlus size={20} />
              </button>
            </div>

            {/* Roles Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <FiShield size={20} />
              <div className="space-y-1">
                <div>
                  <b>Owner: </b>
                  <span>Full access, billing, and deletion rights.</span>
                </div>
                <div>
                  <b>Admin: </b>
                  <span>Can manage members and projects.</span>
                </div>
                <div>
                  <b>Member: </b>
                  <span>Can view and edit projects they are part of.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="h-10 px-4 rounded-md border border-gray-300 dark:border-gray-600 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 px-4 rounded-md bg-violet-600 hover:bg-violet-700 text-white transition"
            >
              Create Workspace
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
