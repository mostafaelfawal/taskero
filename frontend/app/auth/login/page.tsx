"use client";

import InputField from "@/features/auth/components/InputField";
import PasswordField from "@/features/auth/components/PasswordField";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsGoogle } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { authSchema, AuthSchemaType } from "@/features/auth/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/features/auth/components/ErrorText";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  });

  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col justify-center w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 font-display mb-2">
        Welcome back
      </h2>
      <p className="text-gray-500 text-center font-semibold">
        Enter your credentials to access your workspace.
      </p>
      <form
        onSubmit={handleSubmit(() => console.log("Logged in"))}
        className="space-y-3 my-7"
      >
        <div>
          <InputField
            icon={<MdOutlineMailOutline />}
            id="email"
            label="Email"
            placeholder="name@example.com"
            type="email"
            register={register("email")}
          />
          {errors.email && <ErrorText errorMessage={errors.email?.message!} />}
        </div>
        <div>
          <PasswordField register={register("password")} />
          {errors.password && (
            <ErrorText errorMessage={errors.password?.message!} />
          )}
        </div>
        <button
          type="submit"
          className="flex justify-center items-center gap-3 text-white bg-violet-500 font-semibold rounded-lg w-full py-2.5 hover:bg-violet-400 hover:scale-102 transition-all shadow-md shadow-violet-300"
        >
          Create account <FiArrowRight />
        </button>
        <div className="flex items-center w-full gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>

          <p className="text-sm text-gray-500 whitespace-nowrap">
            OR CONTINUE WITH
          </p>

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <button
          type="button"
          className="flex justify-center items-center gap-2 border border-gray-200 font-semibold rounded-lg w-full py-2.5 hover:bg-gray-100 transition-colors shadow-md"
        >
          <BsGoogle /> Google
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-violet-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </motion.section>
  );
}
