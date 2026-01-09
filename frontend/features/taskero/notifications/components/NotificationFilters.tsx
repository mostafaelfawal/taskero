export default function NotificationFilters() {
  return (
    <div className="space-y-4 border-b border-slate-300 dark:border-slate-700 pb-6">
      {/* Status */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="text-white min-h-8 rounded-md px-3 text-xs bg-violet-600 hover:bg-violet-700">
            All
          </button>

          {["Read", "Unread"].map((i) => (
            <button
              key={i}
              className="min-h-8 rounded-md px-3 text-xs transition-colors
                  border border-slate-300 bg-white hover:bg-slate-100
                  dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Type
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="text-white min-h-8 rounded-md px-3 text-xs bg-violet-600 hover:bg-violet-700">
            All
          </button>

          {["invite", "alert", "message", "comment", "system"].map((i) => (
            <button
              key={i}
              className="min-h-8 rounded-md px-3 text-xs transition-colors
                  border border-slate-300 bg-white hover:bg-slate-100
                  dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
