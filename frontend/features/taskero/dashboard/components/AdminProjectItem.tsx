export default function AdminProjectItem({
  title,
  remainingTask,
  progressed,
  state,
}: {
  title: string;
  remainingTask: number;
  progressed: number;
  state: "At Risk" | "On Track";
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 shadow overflow-hidden border-l-4 border-l-violet-500 bg-white dark:bg-slate-900">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        {/* Title + Tasks */}
        <div className="space-y-1 min-w-50">
          <h4 className="leading-none hover:text-violet-500 dark:hover:text-violet-400 text-black dark:text-white cursor-pointer transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {remainingTask} tasks remaining
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">
                Progress
              </span>
              <span className="text-slate-700 dark:text-slate-200">
                {progressed}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-violet-300 dark:bg-violet-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-violet-500 dark:bg-violet-400 h-full"
                style={{ width: `${progressed}%` }}
              />
            </div>
          </div>

          {/* Status Badge */}
          <p
            className={`${
              state === "At Risk"
                ? "bg-red-500 text-white dark:bg-red-600"
                : "bg-gray-200 text-black dark:text-white dark:bg-gray-600"
            } rounded-lg px-2 py-1 text-xs whitespace-nowrap`}
          >
            {state}
          </p>
        </div>
      </div>
    </div>
  );
}
