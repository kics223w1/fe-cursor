'use client';

import ShareSetup from "@/app/components/ShareSetup";
import { useRouter } from "next/navigation";

export default function SharePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black bg-grid-pattern bg-gradient-radial">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20">
        <div className="w-full max-w-2xl">
          <ShareSetup onSucccess={() => router.push('/')} />
        </div>
      </div>
    </div>
  );
}
