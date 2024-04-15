"use client";
import React from "react";
import EnrollCard from "../cards/EnrollCard";
import { useRouter } from "next/navigation";

function MsMyCourse({ myCourse, myCourseLoading }) {
  console.log(myCourse);
  const router = useRouter();
  if (myCourseLoading) return <h1>Loading...</h1>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Courses</h1>
      {(myCourse.length !== 0 && (
        <div
          className="
        grid 
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
        mt-4
      "
        >
          {myCourse.map((course) => {
            return <EnrollCard key={course?._id} course={course} />;
          })}
        </div>
      )) || (
        <div className="flex justify-center items-center flex-col h-[70vh]">
          <img
            src="
            https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.png"
            alt=""
            className="h-52"
          />
          <h1 className="text-3xl ">You have not created any course yet.</h1>
          <p className="text-md text-gray-500">
            If You have any course to create, Sell and earn your skills.
          </p>
          <button
            onClick={() => router.push("/create")}
            className="
                bg-blue-500
                text-white
                p-2
                rounded-md
                mt-4
                hover:bg-blue-600
                duration-200
                "
          >
            Create Course
          </button>
        </div>
      )}
    </div>
  );
}

export default MsMyCourse;
