"use client";

import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordField({
  register,
  showForgetPassword = false
}: {
  register: any;
  showForgetPassword?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <label htmlFor="password" className="font-semibold dark:text-white">
          Password
        </label>
        {showForgetPassword && (
          <button
            type="button"
            className="text-sm text-violet-500 hover:underline dark:text-violet-300"
          >
            Forget password?
          </button>
        )}
      </div>
      <div className="relative mt-1">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="••••••••"
          {...register}
          className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow placeholder-gray-500 dark:placeholder-slate-400 w-full rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-700 dark:text-white shadow pl-10 py-2"
        />
        <CiLock className="absolute top-3.5 left-3 text-gray-500 dark:text-slate-400" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-3.5 right-3 text-gray-500 dark:text-slate-400"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </>
  );
}
