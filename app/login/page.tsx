"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = (searchParams.get("callbackUrl") as string) ?? "/";
  if (session?.user?.email) {
    router.push(callbackUrl);
  }
  return (
    <div className="flex  items-center justify-center h-[80dvh] text-2xl sm:text-6xl ">
      Hello, Please sign In.
    </div>
  );
};

export default Page;
