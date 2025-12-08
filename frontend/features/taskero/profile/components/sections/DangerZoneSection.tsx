"use client";

import { AppDispatch, RootState } from "@/store/store";
import { deleteUser } from "@/store/UserSection/thunks/deleteUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";

export default function DangerZoneSection() {
  const { _id, loading } = useSelector((state: RootState) => state.user);
  const [step, setStep] = useState<1 | 2>(1);
  const [openModal, setOpenModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (_id) {
      const deleteAccount = await dispatch(deleteUser(_id));
      if (deleteUser.fulfilled.match(deleteAccount)) {
        toast.success(deleteAccount.payload.message);
        router.replace("/auth/login");
      } else {
        const errMsg = deleteAccount.payload as string;
        toast.error(errMsg);
      }
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setConfirmText("");
    setStep(1);
  };

  return (
    <section className="p-6 border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 rounded-xl shadow dark:shadow-lg">
      <div className="mb-6">
        <h2 className="text-red-500 dark:text-red-400 text-lg font-semibold">
          Danger Zone
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Irreversible actions for your account.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold dark:text-white">
            Delete Account
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Permanently remove your account and all data.
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() => setOpenModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors disabled:opacity-50 font-semibold px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white min-w-38"
        >
          <FiTrash2 />
          Delete Account
        </button>
      </div>

      {/* MODAL */}
      {openModal && (
        <Modal closeModal={closeModal}>
          {step === 1 && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FiAlertTriangle className="text-violet-500" size={28} />
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Confirm Account Deletion
                </h2>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                This action is <span className="font-semibold">permanent</span>{" "}
                and will delete all your account data.
                <br />
                Please type{" "}
                <span className="font-semibold text-violet-500">
                  delete account
                </span>{" "}
                to continue.
              </p>

              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type: delete account"
                className="w-full px-3 py-2 border border-gray-500 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow"
              />

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  disabled={
                    confirmText.trim().toLowerCase() !== "delete account"
                  }
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-lg bg-violet-500 text-white font-semibold disabled:opacity-50 hover:bg-violet-600"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FiAlertTriangle className="text-red-500" size={28} />
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Final Warning
                </h2>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Your account and all data will be permanently deleted.
                <br />
                <span className="font-semibold">
                  This action cannot be undone.
                </span>
              </p>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          )}
        </Modal>
      )}
    </section>
  );
}
