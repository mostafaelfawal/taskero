import { IconType } from "react-icons";

interface EmptyStateProps {
  icon: IconType;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-6 border rounded-xl border-dashed 
    bg-gray-50 dark:bg-slate-900/30 border-gray-300 dark:border-slate-700"
    >
      <Icon className="text-4xl text-slate-400 dark:text-slate-500 mb-3" />

      <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </div>
  );
}
