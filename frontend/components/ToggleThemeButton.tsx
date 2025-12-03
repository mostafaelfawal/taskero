"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ToggleThemeButton() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setIsDark(currentTheme === "light" ? false : true);
  }, []);

  function toggleTheme() {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
  
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      whileTap={{ rotate: 180, scale: 0.8 }}
    >
      {isDark ? <FaMoon /> : <FaSun />}
    </motion.button>
  );
}
