"use client";
import React from "react";
import {
  AiFillStar,
  AiOutlineCloudSync,
  AiOutlineDollar,
  AiOutlineRight,
  AiOutlineStar,
} from "react-icons/ai";
import Router, { useRouter } from "next/navigation";
import Link from "next/link";

function CourseCard() {
  const router = useRouter();
  return (
    <div className="min-h-[320px] flex flex-col justify-start p-5 rounded-md items-center gap-3 bg-gray-200 pb-10">
      <div className="flex w-full">
        <img
          src="https://i.ibb.co/9HbyJgH/landing.jpg"
          alt="course"
          className="object-cover w-full rounded-md"
        />
      </div>
      <div className="flex justify-between w-full">
        <div
          onClick={() => {
            router.push("/search/uiux");
          }}
          className="flex rounded-md cursor-pointer bg-red-300 hover:bg-red-200 duration-200 p-2 items-center gap-2 text-sm"
        >
          <AiOutlineCloudSync size={22} />
          Ui/Ux Design
        </div>
        <div className="flex rounded-md text-red-800 p-2 items-center gap-1 text-sm">
          <AiOutlineDollar size={22} />
          220
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Link
          href={"/courses/hehehaa"}
          className="text-lg font-bold josin text-start hover:underline cursor-pointer"
        >
          UI/UX Design. How To Design A Website like Professionals
        </Link>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-400 duration-200 bg-gray-300">
            <img
              src="https://i.ibb.co/9HbyJgH/landing.jpg"
              alt="avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-sm font-bold">John Doe</p>
          </div>
        </div>
      </div>

      <div className="flex h-[2px] w-full bg-red-800 rounded-full opacity-30"></div>
      <div className="flex  gap-2 w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p className="text-sm">(32 Votes)</p>
        </div>
        <Link
          href={"/courses/hehehaa"}
          className="flex h-10 w-10 hover:text-[#3F6745] hover:bg-transparent border text-white cursor-pointer duration-200 hover:border-[#3F6745] items-center justify-center rounded-full bg-[#3F6745]"
        >
          <AiOutlineRight size={22} />
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
