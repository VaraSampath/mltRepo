"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const Header = () => {
  const { data: session } = useSession();
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0]).join("");
  };
  if (session) {
    return (
      <div className="flex flex-wrap gap-4 mb-6 justify-between items-center data-[state=closed]:border-none">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">Hello, {session.user?.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user && (
              <Avatar>
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback className="px-4 py-2.5 rounded-full bg-black text-white ">
                  {getInitials(session?.user?.name ?? "")}
                </AvatarFallback>
              </Avatar>
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

            <DropdownMenuItem>
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
