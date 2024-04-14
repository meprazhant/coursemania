"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

function page({ res }) {
  const { data: session, status } = useSession();
  const { provider } = useParams();
  const navigate = useRouter();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    useEffect(() => {
      fetch("/api/createuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            navigate.push("/");
          }
        });
    }, []);
    return <div>This won't take a long</div>;
  } else {
    navigate.push("/");
  }
}

export default page;
