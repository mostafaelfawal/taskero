export default function RecentActivity({
  isLastRecent,
  userInitials,
  user,
  action,
  task,
  time,
}: {
  isLastRecent: boolean;
  userInitials: string;
  user: string;
  action: string;
  task: string;
  time: string;
}) {
  return (
    <div className="relative pl-10 group">
      {!isLastRecent && (
        <div className="absolute left-4 top-8 w-px h-full bg-gray-300 dark:bg-slate-700" />
      )}

      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-sm font-semibold text-violet-600 dark:text-violet-300">
        {userInitials}
      </div>

      <div>
        <p className="text-sm text-black dark:text-white font-medium">
          {user}{" "}
          <span className="font-normal text-slate-500 dark:text-slate-400">
            {action}
          </span>
        </p>

        <a
          href="#"
          className="text-violet-600 dark:text-violet-400 text-sm hover:underline"
        >
          {task}
        </a>

        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          {time}
        </p>
      </div>
    </div>
  );
}
