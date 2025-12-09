"use client";

import DangerZoneSection from "@/features/taskero/profile/components/sections/DangerZoneSection";
import ExternalLinksSection from "@/features/taskero/profile/components/sections/ExternalLinksSection";
import HeaderSection from "@/features/taskero/profile/components/sections/HeaderSection";
import PreferencesSection from "@/features/taskero/profile/components/sections/PreferencesSection";
import ProfileCardSection from "@/features/taskero/profile/components/sections/ProfileCardSection";
import QuickActionsSection from "@/features/taskero/profile/components/sections/QuickActionsSection";
import StatsSection from "@/features/taskero/profile/components/sections/StatsSection";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <HeaderSection />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <ProfileCardSection />
          <QuickActionsSection />
        </div>
        <div className="lg:col-span-8 space-y-6">
          <StatsSection />
          <PreferencesSection />
          <ExternalLinksSection />
          <DangerZoneSection />
        </div>
      </div>
    </motion.main>
  );
}
