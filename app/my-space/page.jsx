"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/");
  }
  return (
    <div className="h-screen flex w-full justify-center items-center">
      <button
        className="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
            "
        onClick={() => signOut()}
      >
        Log out
      </button>
    </div>
  );
}

export default page;
