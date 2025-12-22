import Link from "next/link";
import { FiArrowRight, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="h-screen flex gap-4 flex-col justify-center items-center bg-linear-to-br from-violet-50 to-violet-100">
      <div className="flex justify-center items-center rounded-full size-20 shadow-[0_0_20px_40px] shadow-violet-50">
        <FiSearch className="text-4xl text-violet-500" />
      </div>
      <h1 className="text-4xl font-extrabold text-violet-500">404</h1>
      <p className="text-sm text-slate-500">the page is not found</p>
      <Link href="/" className="rounded-full px-4 py-1 bg-linear-to-br from-violet-500 to-violet-300 flex items-center gap-3 text-white">
        to home <FiArrowRight />
      </Link>
    </div>
  );
}
