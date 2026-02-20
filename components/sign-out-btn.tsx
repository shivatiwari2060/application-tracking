"use client";

import { signOut } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <DropdownMenuItem>
      <Button
        variant="ghost"
        className="text-primary"
        onClick={async () => {
          const result = await signOut();
          if (result.data) {
            router.push("/sign-in");
          } else {
            alert("Error in logging out please try again after sometime!");
          }
        }}
      >
        Log Out
      </Button>
    </DropdownMenuItem>
  );
}
