"use client";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MSMain from "../components/mySpace/MSMain";

function page() {
  const { data: session } = useSession();
  const [enrolled, setEnrolled] = React.useState([]);
  const [enrollLoading, setEnrollLoading] = React.useState(true);
  const [myCourse, setMyCourse] = React.useState([]);
  const [myCourseLoading, setMyCourseLoading] = React.useState(true);
  const [userLoading, setUserLoading] = React.useState(true);
  const [user, setUser] = React.useState({});
  const router = useRouter();
  async function FetchenrolledCourse() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/enrolled`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    const data = await res.json();
    if (data.status === "error") {
      throw new Error(data.message);
    }
    setEnrolled(data.enrolled);
    setEnrollLoading(false);
  }

  async function fetchUser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    const data = await res.json();
    if (data.status !== "exist") {
      throw new Error(data.message);
    }
    setUser(data.user);
    setUserLoading(false);
  }

  async function getMyCOurse() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/mycourse`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    const data = await res.json();
    if (data.status === "error") {
      return;
    }
    setMyCourse(data.courses);
    setMyCourseLoading(false);
  }

  useEffect(() => {
    if (session) {
      FetchenrolledCourse();
      fetchUser();
      getMyCOurse();
    }
  }, []);

  if (!session) {
    router.push("/");
  }
  return (
    <div className="min-h-screen flex w-full">
      <MSMain
        enrollLoading={enrollLoading}
        userLoading={userLoading}
        myCourseLoading={myCourseLoading}
        enrolled={enrolled}
        user={user}
        myCourse={myCourse}
      />
    </div>
  );
}

export default page;
