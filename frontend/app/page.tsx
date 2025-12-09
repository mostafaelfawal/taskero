<<<<<<< HEAD
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => router.replace("/taskero/dashboard"), []);
=======
export default function Home() {
  return <div>MM</div>;
>>>>>>> 0460bd9acc706cb6a710f462cf6e6c956c26685a
}
