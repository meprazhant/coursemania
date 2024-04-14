"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import CreatingUser from "../components/(auth)/CreatingUser";

function page({ res }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  async function getUserExist() {
    if (!!session) {
      const res = await fetch(`/api/user/${session.user.email}`);
      const data = await res.json();
      if (data.status === "success") {
        setLoading(false);
        return "good";
      } else if (data.status === "error") {
        setLoading(false);
        return "error";
      } else if (data.status === "exist") {
        setLoading(false);
        return "exist";
      } else {
        return data.status;
      }
    } else {
      return "error";
    }
  }

  useEffect(() => {
    getUserExist().then((exist) => {
      if (exist === "good") {
        setLoading(false);
      } else if (exist === "exist") {
        router.push("/my-space");
      } else if (exist === "error") {
        router.push("/");
      }
      console.log(exist);
    });
  }, []);

  if (loading || status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <h2 className="text-2xl font-bold text-center">
        You are just one step away from creating your account. Please fill in
        the details below.
      </h2>
      {!!session && <CreatingUser session={session} />}
    </div>
  );
}

export default page;
