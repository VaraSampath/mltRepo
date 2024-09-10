"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-wrap  justify-between mb-6">
        <p className="text-xl font-semibold">
          Signed in as {session?.user?.email} <br />
        </p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap  justify-between mb-6">
      <p className="text-xl font-semibold">Not signed in</p>

      <Button onClick={() => signIn("google")}>Sign in</Button>
    </div>
  );
}
