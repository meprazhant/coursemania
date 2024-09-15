"use client";
import React from "react";
import EnrollCard from "../cards/EnrollCard";
import { useRouter } from "next/navigation";

function Enrolled({ enrolled, enrollLoading }) {
  const router = useRouter();
  if (enrollLoading) return <h1>Loading...</h1>;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Enrolled Courses</h1>
      {(enrolled.length !== 0 && (
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
          {enrolled.map((enrolle) => {
            const course = enrolle?.course;
            return <EnrollCard key={course._id} course={course} />;
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
          <h1 className="text-3xl ">
            You have not enrolled in any course yet. Please Enroll some
          </h1>
          <p className="text-md text-gray-500">
            There are a lot of courses available for you. Check out our courses.
          </p>
          <button
            onClick={() => router.push("/courses")}
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
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
}

export default Enrolled;
