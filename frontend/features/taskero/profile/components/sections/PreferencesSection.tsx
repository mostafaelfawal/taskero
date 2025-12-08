import ToggleThemeButton from "@/components/ToggleThemeButton";
import SettingsToggleRow from "../SettingsToggleRow";
import ToggleButton from "@/components/toggleButton";
import { toast } from "react-toastify";

export default function PreferencesSection() {
  return (
    <section className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold dark:text-white">Preferences</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your interface settings and visibility.
        </p>
      </div>

      <div className="space-y-3">
        <SettingsToggleRow
          title="Theme Mode"
          desc="Toggle between light and dark appearance"
          control={<ToggleThemeButton />}
        />

        <div className="h-px bg-slate-200 dark:bg-slate-700 my-3" />

        <SettingsToggleRow
          title="Email Notifications"
          desc="Receive daily summaries of your tasks"
          control={
            <ToggleButton
              isOn={false}
              toggleFn={() => toast.info("Email notifications toggled")}
            />
          }
        />
      </div>
    </section>
  );
}
