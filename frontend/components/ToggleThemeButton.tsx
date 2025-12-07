"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setTheme, toggleTheme } from "@/store/themeSlice";
import { useEffect } from "react";

export default function ToggleThemeButton() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    dispatch(setTheme(saved));
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleToggleTheme() {
    document.documentElement.classList.toggle("dark");
    dispatch(toggleTheme());
  }

  return (
    <button onClick={handleToggleTheme} className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-500 transition-colors w-9 h-9 flex justify-center items-center">
      {theme === "dark" ? (
        <FiSun />
      ) : (
        <FiMoon />
      )}
    </button>
  );
}
