import { FiCheckCircle, FiGrid, FiLayout } from "react-icons/fi";
import StatCard from "../StatCard";

export default function StatsSection() {
  const stats = [
    {
      icon: <FiCheckCircle size={20} />,
      title: "Tasks Created",
      value: 1243,
      bg: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
    {
      icon: <FiLayout size={20} />,
      title: "Tasks Completed",
      value: 892,
      bg: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    },
    {
      icon: <FiGrid size={20} />,
      title: "Workspaces",
      value: 4,
      bg: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300",
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {stats.map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </section>
  );
}
