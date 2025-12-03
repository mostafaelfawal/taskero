import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Signup() {
  return (
    <section className="flex flex-col justify-center w-full max-w-md mx-auto">
      <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 font-display mb-2">
        Create an account
      </h2>
      <p className="text-gray-500 text-center font-semibold">
        Join Taskero to start organizing your life.
      </p>
      <form className="space-y-3 my-7">
        <div>
          <label htmlFor="name" className="font-semibold ">
            Username
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              id="name"
              placeholder="johndoe"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow placeholder-gray-500 w-full rounded-xl border border-gray-200 shadow pl-10 py-2"
            />
            <FiUser className="absolute top-3 left-3 text-gray-500" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="font-semibold ">
            Email
          </label>
          <div className="relative mt-1">
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow placeholder-gray-500 w-full rounded-xl border border-gray-200 shadow pl-10 py-2"
            />
            <MdOutlineMailOutline className="absolute top-3 left-3 text-gray-500" />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="font-semibold ">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow placeholder-gray-500 w-full rounded-xl border border-gray-200 shadow pl-10 py-2"
            />
            <CiLock className="absolute top-3 left-3 text-gray-500" />
          </div>
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
        <button className="flex justify-center items-center gap-2 border border-gray-200 font-semibold rounded-lg w-full py-2.5 hover:bg-gray-100 transition-colors shadow-md">
          <BsGoogle /> Google
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-violet-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
