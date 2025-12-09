import Modal from "@/components/Modal";
import { AppDispatch, RootState } from "@/store/store";
import { updateUser } from "@/store/UserSection/thunks/updateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiUser } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  passwordSchema,
  PasswordSchemaType,
} from "../../schemas/passwordSchema";

export default function QuickActionsSection() {
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  // **react-hook-form + zod**
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordSchemaType) => {
    if (!user._id) return;

    const updatedUser = await dispatch(
      updateUser({
        ...user,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
    );

    if (updateUser.fulfilled.match(updatedUser)) {
      toast.success("Password updated successfully");
      reset();
      setChangePasswordModal(false);
    } else {
      toast.error(updatedUser.payload as string);
    }
  };

  const quickActions = [
    { icon: <FiUser />, text: "Edit Profile Details" },
    {
      icon: <FiLock />,
      text: "Change Password",
      cmd: () => setChangePasswordModal(true),
    },
    { icon: <MdLanguage />, text: "Connected Apps" },
  ];

  return (
    <section className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-lg">
      <h2 className="text-lg font-semibold mb-6 dark:text-white">
        Quick Actions
      </h2>

      <div className="space-y-2">
        {quickActions.map((item, i) => (
          <button
            key={i}
            className="rounded-lg border border-gray-600 dark:border-slate-600 w-full flex gap-2 items-center py-2 px-4 font-semibold text-sm text-gray-600 dark:text-slate-300 hover:border-violet-200 dark:hover:border-violet-400 hover:text-violet-500 dark:hover:text-violet-400 transition-all"
            type="button"
            onClick={item.cmd}
          >
            {item.icon} {item.text}
          </button>
        ))}
      </div>

      {/* 🔥 Modal */}
      {changePasswordModal && (
        <Modal closeModal={() => setChangePasswordModal(false)}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
              Change Password
            </h2>

            <div className="space-y-4">
              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Old Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("currentPassword")}
                    type="password"
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 
                      bg-white dark:bg-slate-700 text-slate-700 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    placeholder="Enter old password"
                  />
                </div>
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("newPassword")}
                    type="password"
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 
                      bg-white dark:bg-slate-700 text-slate-700 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                    placeholder="Enter new password"
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setChangePasswordModal(false)}
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 
                   text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
              >
                Change
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
