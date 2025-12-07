import { LuEllipsis } from "react-icons/lu";

export default function ProjectItem({
  title,
  tasks,
  progressed,
}: {
  title: string;
  tasks: number;
  progressed: number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-600 text-slate-500 shadow">
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="leading-none hover:text-violet-500 dark:hover:text-violet-400 text-black dark:text-white cursor-pointer transition-colors">
            {title}
          </h2>
          <LuEllipsis className="text-slate-500 dark:text-slate-400" />
        </div>
        <div className="text-xs">
          <div className="flex justify-between mb-2 text-slate-500 dark:text-slate-400">
            <span>{tasks} tasks</span>
            <span>{progressed}%</span>
          </div>
          <div className="w-full bg-violet-300 dark:bg-violet-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-violet-500 dark:bg-violet-400 h-full"
              style={{ width: `${progressed}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
