"use client";

export default function LoadingTaskero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-700 dark:text-white text-lg font-medium">The page is loading...</p>
    </div>
  );
}
