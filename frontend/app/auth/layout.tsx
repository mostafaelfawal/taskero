import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-50/50 dark:bg-slate-900/40 space-y-6 p-6 md:p-10 flex-1 flex flex-col justify-between">
        <Link href="/auth/login" className="font-bold flex gap-2">
          <p className="h-8 w-8 bg-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 text-xl text-white">
            T
          </p>
          <h1 className="text-xl text-violet-500">Taskero</h1>
        </Link>
        {children}
        <div className="text-center lg:text-left text-xs text-gray-600 dark:text-slate-400">
          © 2025 Taskero . All rights reserved.
        </div>
      </div>

      <div className="relative flex-1 hidden lg:block bg-linear-to-tl from-transparent via-transparent to-violet-200 dark:bg-linear-to-tl dark:from-transparent dark:via-transparent dark:to-violet-900">
        <Image
          src="/authImage.png"
          alt="auth image"
          fill
          className="object-cover opacity-40 dark:opacity-30"
        />

        <div className="absolute bottom-0 flex flex-col justify-center p-12 dark:text-gray-100">
          <h2 className="font-semibold text-xl max-w-md">
            "Taskero has completely transformed how our team manages projects.
            It's not just a tool, it's a new way of working."
          </h2>

          <footer className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Mostafa Hamdi, Website builder
          </footer>
        </div>
      </div>
    </div>
  );
}
