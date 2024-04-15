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

function EnrollCard({ course }) {
  const router = useRouter();
  function navigateToCourse() {
    return `/enrolled/${course._id}`;
  }
  return (
    <div className="min-h-[320px] flex flex-col justify-start p-5 rounded-md items-center gap-3 bg-gray-100 ">
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
          className="text-md font-bold josin text-start hover:underline cursor-pointer"
        >
          {course.title.length > 40
            ? course.title.slice(0, 40) + "...."
            : course.title}
        </Link>
      </div>
      <div className="flex justify-between w-full">
        <div
          onClick={() => {
            router.push("/search/" + course.category);
          }}
          className="flex whitespace-nowrap rounded-md cursor-pointer bg-red-300 hover:bg-red-200 duration-200 p-2 items-center gap-2 text-xs"
        >
          <AiOutlineCloudSync size={22} />
          {course.category.length > 50
            ? course.category.slice(0, 50)
            : course.category}
        </div>
      </div>
    </div>
  );
}

export default EnrollCard;
