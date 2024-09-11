"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-wrap gap-4 mb-6 justify-between items-center data-[state=closed]:border-none">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">
            Hello, {session?.user?.name} <br />
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user?.image && (
              <div className="w-10 relative h-10 rounded-full overflow-hidden border-none">
                <Image
                  src={session?.user?.image}
                  alt="user"
                  fill
                  className="selection:border-none"
                />
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/normal-values">Normal Values</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/patients">Patients</Link>
            </DropdownMenuItem>

            <DropdownMenuItem >
              <Button
                className="w-full"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
};

export default Header;
