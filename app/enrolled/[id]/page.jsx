"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainPage from "@/app/components/enrolled/MainPage";
import Error from "@/app/error";
import ErrorPage from "./ErrorPage";

function page({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  async function fetchEnroll(id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/enrolled/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    const data = await res.json();
    if (data.status === "error") {
      setError(data.message);
      setLoading(false);
      return;
    }
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchEnroll(id);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {error && <ErrorPage message={error} />}
      {!error && <MainPage data={data} />}
    </div>
  );
}

export default page;
