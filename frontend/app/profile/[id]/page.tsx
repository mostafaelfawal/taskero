"use client";

import DangerZoneSection from "@/features/profile/components/sections/DangerZoneSection";
import ExternalLinksSection from "@/features/profile/components/sections/ExternalLinksSection";
import HeaderSection from "@/features/profile/components/sections/HeaderSection";
import PreferencesSection from "@/features/profile/components/sections/PreferencesSection";
import ProfileCardSection from "@/features/profile/components/sections/ProfileCardSection";
import QuickActionsSection from "@/features/profile/components/sections/QuickActionsSection";
import StatsSection from "@/features/profile/components/sections/StatsSection";
import { AppDispatch } from "@/store/store";
import { getUserData } from "@/store/UserSection/thunks/getUserData";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userData = await dispatch(getUserData(id));
      if (!getUserData.fulfilled.match(userData)) {
        toast.error(userData.payload as string);
        router.replace("/auth/login");
      }
    };
    getUser();
  }, []);

  return (
    <div className="max-w-6xl mx-auto min-h-screen py-8 px-4 sm:px-6 lg:px-8">
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
    </div>
  );
}
