"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MSMain from "../components/mySpace/MSMain";

function page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/");
  }
  return (
    <div className="min-h-screen flex w-full">
      <MSMain />
    </div>
  );
}

export default page;
