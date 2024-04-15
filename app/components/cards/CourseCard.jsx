"use client";
import React from "react";
import {
  AiFillStar,
  AiOutlineCloudSync,
  AiOutlineDollar,
  AiOutlineRight,
  AiOutlineStar,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CourseCard({ course }) {
  const router = useRouter();
  function navigateToCourse() {
    return `/courses/${course._id}`;
  }
  return (
    <div className="min-h-[320px] flex flex-col justify-start p-5 rounded-md items-center gap-3 bg-gray-100 pb-10">
      <div className="flex w-full">
        <img
          src={course.image}
          alt="course"
          className="object-cover w-full h-52 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2 w-full  overflow-hidden">
        <Link
          href={navigateToCourse()}
          className="text-md font-bold josin h-12 text-start hover:underline cursor-pointer"
        >
          {course.title.length > 40
            ? course.title.slice(0, 40) + "...."
            : course.title}
        </Link>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-400 duration-200 bg-gray-300">
            <img
              src={course?.createdBy?.image}
              alt="avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-sm font-bold">
              {course?.createdBy?.name || "Anonymous"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div
          onClick={() => {
            router.push("/search/uiux");
          }}
          className="flex whitespace-nowrap rounded-md cursor-pointer bg-red-300 hover:bg-red-200 duration-200 p-2 items-center gap-2 text-xs"
        >
          <AiOutlineCloudSync size={22} />
          {course.category.length > 50
            ? course.category.slice(0, 50)
            : course.category}
        </div>
        <div className="flex whitespace-nowrap rounded-md text-red-800 p-2 items-center gap-1 text-sm">
          <AiOutlineDollar size={22} />
          NPR. {course.price}
        </div>
      </div>

      <div className="flex h-[2px] w-full bg-red-800 rounded-full opacity-30"></div>
      <div className="flex  gap-2 w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: course?.createdBy?.rating }, (_, i) => (
              <AiFillStar key={i} size={22} className="text-yellow-400" />
            ))}
            {Array.from({ length: 5 - course?.createdBy?.rating }, (_, i) => (
              <AiOutlineStar key={i} size={22} className="text-yellow-400" />
            ))}
          </div>
          <p className="text-sm">({course.createdBy?.rating}/5)</p>
        </div>
        <Link
          href={navigateToCourse()}
          className="flex h-10 w-10 hover:text-[#3F6745] hover:bg-transparent border text-white cursor-pointer duration-200 hover:border-[#3F6745] items-center justify-center rounded-full bg-[#3F6745]"
        >
          <AiOutlineRight size={22} />
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
