"use client";

import { ReactNode } from "react";

type Props = {
  title: string;
  desc: string;
  control: ReactNode;
};

export default function SettingsToggleRow({ title, desc, control }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold dark:text-white">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
      {control}
    </div>
  );
}
