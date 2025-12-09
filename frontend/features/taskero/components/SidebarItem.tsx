import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function SidebarItem({ href, icon, text, expanded }: any) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all group ${!expanded && "justify-center"} ${
        pathName === href
          ? "text-violet-500 dark:text-violet-600 bg-violet-300/35 dark:bg-violet-500/20 border-l-3 border-l-violet-500 dark:border-l-violet-700"
          : "text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
      }`}
    >
      {icon}
      {expanded && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {text}
        </motion.span>
      )}
    </Link>
  );
}
