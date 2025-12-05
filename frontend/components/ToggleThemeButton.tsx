"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import ToggleButton from "./toggleButton";
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
    <div className="flex gap-2 items-center">
      <FiSun
        className={theme === "dark" ? "text-slate-500" : "text-orange-500"}
      />
      <ToggleButton isOn={theme === "dark"} toggleFn={handleToggleTheme} />
      <FiMoon
        className={theme === "dark" ? "text-violet-500" : "text-slate-500"}
      />
    </div>
  );
}
