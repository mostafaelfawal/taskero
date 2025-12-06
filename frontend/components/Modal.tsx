import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({
  closeModal,
  children,
}: {
  closeModal: VoidFunction;
  children: ReactNode;
}) {
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-xl p-6 animate-fadeIn relative"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 dark:hover:text-white"
        >
          <FiX size={20} />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
