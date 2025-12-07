export default function ProPlanComponent() {
  return (
    <div className="rounded-xl bg-violet-600 text-white shadow p-6">
      <h2 className="font-semibold tracking-tight text-lg">Pro Plan</h2>
      <p className="text-sm text-violet-200">
        You're on the Pro plan. Your team is growing!
      </p>
      <div className="mt-6 text-sm">
        <div className="flex justify-between mb-1">
          <span>Storage Used</span>
          <span>85%</span>
        </div>
        <div className="w-full bg-violet-400 dark:bg-violet-800 h-2 rounded-full overflow-hidden">
          <div className="bg-white h-full" style={{ width: `85%` }} />
        </div>
        <button className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 bg-violet-50 border border-violet-300 min-h-9 px-4 py-2 w-full text-violet-500 hover:bg-white/90">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
