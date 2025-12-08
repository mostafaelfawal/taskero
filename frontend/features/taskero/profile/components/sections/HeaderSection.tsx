export default function HeaderSection() {
  return (
    <section className="mb-9 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
      <div>
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">
          Account Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1">
          Manage your personal information and preferences.
        </p>
      </div>
    </section>
  );
}
