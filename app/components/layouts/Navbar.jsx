"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import academix from "../../res/academix.jpg";
import { usePathname } from "next/navigation";

function Navbar({ user }) {
  const { status, data } = useSession();
  const auth = status === "authenticated";
  const pathname = usePathname();
  const [role, setRole] = useState("student");

  function getRole() {
    fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "exist") {
          setRole(data.user.role);
        }
      });
  }

  useEffect(() => {
    getRole();
  }, []);

  if (status === "loading") return null;

  return (
    <div className="flex py-3 justify-between items-center px-5 bg-[#E4E5DF] shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <Image src={academix} alt="logo" height={45} />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className={` text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out ${
            pathname === "/" ? "text-blue-900" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/courses"
          className={` text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out ${
            pathname === "/courses" ? "text-blue-900" : ""
          } `}
        >
          Courses
        </Link>
        <Link
          href="/teach"
          className={` text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out ${
            pathname === "/teach" ? "text-blue-900" : ""
          } `}
        >
          Teach on Academix
        </Link>
      </div>
      <div className="flex items-center">
        {role === "teacher" && (
          <Link
            href="/create"
            className="text-white hover:text-gray-900 border hover:bg-transparent hover:border-black transition duration-300 ease-in-out bg-black p-2 rounded-md "
          >
            Create Course
          </Link>
        )}

        {(!auth && (
          <Link
            href="/login"
            className=" bg-black p-2 rounded-md text-white px-5 hover:bg-transparent border-2 hover:border-black transition duration-300 ease-in-out hover:text-black"
          >
            Get Started
          </Link>
        )) || (
          <Link
            href="/my-space"
            className="text-white px-5 hover:bg-transparent transition duration-300 ease-in-out "
          >
            <img
              src={data?.user?.image}
              referrerPolicy="no-referrer"
              alt="pp"
              className="h-8 w-8 rounded-full "
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
