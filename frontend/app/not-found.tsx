"use client"

import Link from "next/link";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-linear-to-br from-violet-50 to-violet-100 px-4">
      {/* Circle Icon */}
      <motion.div
        className="flex justify-center items-center rounded-full w-24 h-24 shadow-[0_0_40px_20px] shadow-violet-200 bg-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
      >
        <FiSearch className="text-5xl text-violet-500" />
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-violet-500 mt-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-md md:text-lg text-violet-600 mt-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Ooops! The page you are looking for does not exist.
      </motion.p>

      {/* Button to Home */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-br from-violet-500 to-violet-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
        >
          Go Home <FiArrowRight className="text-lg" />
        </Link>
      </motion.div>
    </div>
  );
}
