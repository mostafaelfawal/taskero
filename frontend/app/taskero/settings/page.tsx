"use client"

import { motion } from "framer-motion";

export default function Settings() {
  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10"
    >
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
    </motion.main>
  );
}
