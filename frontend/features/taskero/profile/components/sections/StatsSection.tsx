import { FiCheckCircle, FiGrid, FiLayout } from "react-icons/fi";
import StatCard from "../StatCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function StatsSection() {
  const user = useSelector((state: RootState) => state.user);

  const stats = [
    {
      icon: <FiCheckCircle size={20} />,
      title: "Tasks Created",
      value: user.tasksCreated,
      bg: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
    {
      icon: <FiLayout size={20} />,
      title: "Tasks Completed",
      value: user.tasksCompleted,
      bg: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    },
    {
      icon: <FiGrid size={20} />,
      title: "Workspaces",
      value: user.workspaces,
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
