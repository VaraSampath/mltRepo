"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginBtn() {
  return (
    <div className="">
      <Button
        className="w-full"
        onClick={() => signIn("google")}
      >
        Sign in
      </Button>
    </div>
  );
}
