"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import ToggleButton from "./toggleButton";

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
    <div className="flex gap-2 items-center">
      <FiSun className={isDark ? "text-slate-500" : "text-orange-500"} />
      <ToggleButton isOn={isDark} toggleFn={toggleTheme} />
      <FiMoon className={isDark ? "text-violet-500" : "text-slate-500"} />
    </div>
  );
}
