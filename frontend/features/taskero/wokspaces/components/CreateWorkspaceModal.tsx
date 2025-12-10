import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schemas/createWorspaceSchema";
import ErrorText from "@/features/auth/components/ErrorText";

export default function CreateWorkspaceModal({
  closeModal,
}: {
  closeModal: VoidFunction;
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const handleCreateWorkspace = () => {};

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
        <form
          onSubmit={handleSubmit(handleCreateWorkspace)}
          className="space-y-6 py-2"
        >
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
              {...register("name")}
              placeholder="e.g. Acme Corp Marketing"
              className="flex h-9 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-violet-500 md:text-sm"
            />
            {errors.name && <ErrorText errorMessage={errors.name.message!} />}
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
              {...register("description")}
              placeholder="Briefly describe what this workspace is for..."
              className="flex w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1 text-base shadow-sm transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-violet-500 md:text-sm"
            />
            {errors.description && (
              <ErrorText errorMessage={errors.description.message!} />
            )}
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
