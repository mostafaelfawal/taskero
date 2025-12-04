"use client";

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
};

export default function InfoRow({ icon, label, value }: Props) {
  return (
    <div className="flex justify-between">
      <p className="inline-flex items-center gap-1 text-slate-500">
        {icon} {label}
      </p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
