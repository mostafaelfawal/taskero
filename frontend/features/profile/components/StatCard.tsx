"use client";

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value: number;
  bg?: string;
};

export default function StatCard({ icon, title, value, bg = "" }: Props) {
  return (
    <div className="flex items-center gap-3 p-6 bg-white rounded-xl shadow hover:scale-102 hover:shadow-lg transition">
      <div className={`p-3 rounded-lg ${bg}`}>{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="font-bold text-2xl">{value}</p>
      </div>
    </div>
  );
}
