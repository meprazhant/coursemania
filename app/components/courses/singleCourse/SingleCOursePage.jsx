"use client";
import React, { useEffect } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineCloudSync,
  AiOutlineDollar,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import Countdown from "react-countdown";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EnrollCourse from "./EnrollCourse";

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">{days > 9 ? days : "0" + days}</p>
          <p className="text-gray-500">Days</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">
            {hours > 9 ? hours : "0" + hours}
          </p>
          <p className="text-gray-500">Hours</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">
            {minutes > 9 ? minutes : "0" + minutes}
          </p>
          <p className="text-gray-500">Minutes</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold">
            {seconds > 9 ? seconds : "0" + seconds}
          </p>
          <p className="text-gray-500">Seconds</p>
        </div>
      </div>
    );
  }
};

function SingleCOursePage({ course }) {
  const [hydrated, setHydrated] = React.useState(false);
  const [showModel, setShowModel] = React.useState(false);

  const courseData = course.course;

  const { data: session } = useSession();
  const isSelf = session?.user?.email === courseData?.createdBy?.email;

  function checkEnrolled() {
    if (courseData?.students) {
      const student = courseData.students.find(
        (student) => student.email === session?.user?.email
      );
      if (student) {
        return true;
      } else {
        return false;
      }
    }
  }
  const isEnrolled = checkEnrolled();

  const expired = new Date(courseData?.startDate) < new Date();
  useEffect(() => {
    if (window) {
      window.scroll(0, 0);
    }
  }, []);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <div className="flex gap-3 flex-col relative">
      <div className="flex md:p-7 p-4 w-full">
        <img
          src={courseData?.image}
          className="w-full max-h-[400px] object-cover rounded-md"
          alt="course image"
        />
      </div>
      <div className="flex relative  flex-col md:flex-row gap-5 md:p-10 p-4 md:pt-2 pt-2">
        <div className="flex flex-col gap-3  md:w-2/3 w-full ">
          {/* title */}
          <h1 className="text-3xl font-bold ">{courseData?.title}</h1>
          {/* short Description */}
          <p className="text-gray-500">{courseData?.shortDescription}</p>
          {/* ratings and students */}
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <AiFillStar size={22} className="text-yellow-500" />
              <p className="text-gray-500">{courseData?.createdBy?.rating}</p>
            </div>
            <div className="flex gap-1 items-center">
              <AiOutlineUser size={22} className="text-gray-500" />
              <p className="text-gray-500">
                {courseData?.students.length} students
              </p>
            </div>
          </div>
          {/* created by */}
          <div className="flex gap-2 items-center">
            <AiOutlineUser size={22} className="text-gray-800" />
            <p className="text-gray-500">
              Created by{" "}
              <Link href={`/user/${courseData?.createdBy?._id}`}>
                {courseData?.createdBy?.name}
              </Link>
            </p>
          </div>
          {/* a line */}
          <div className="flex h-[2px] w-full bg-gray-800 rounded-full opacity-30"></div>
          {/* big description */}
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">About The Course</h1>
            <div id="content" className="text-gray-500">
              {
                <div
                  dangerouslySetInnerHTML={{ __html: courseData?.description }}
                ></div>
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-gray-200 sticky top-2 right-10 max-h-[98vh] p-5 md:w-1/3 w-full">
          <img
            src={courseData?.image}
            alt="course"
            className="object-cover w-full rounded-md"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Course Starts In</h1>
            <div className="flex w-full justify-center items-center">
              <Countdown date={courseData?.startDate} renderer={renderer} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Course Details</h1>
            <div className="flex gap-2 items-center">
              <AiOutlineClockCircle size={22} className="text-gray-800" />
              <p className="text-gray-500">
                Duration: {courseData?.duration} Weeks
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <AiOutlineDollar size={22} className="text-gray-800" />
              <p className="text-gray-500">Price: NPR. {courseData?.price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Enroll Now</h1>
            {!isSelf && !isEnrolled && (
              <button
                onClick={() => setShowModel(true)}
                disabled={expired}
                className={`${
                  expired ? "bg-blue-300" : "bg-blue-500"
                } text-white p-3 hover:bg-transparent border hover:border-blue-500 hover:text-blue-500 duration-300 rounded-md`}
              >
                {expired ? "Course Expired" : "Enroll Now"}
              </button>
            )}
            {isEnrolled && (
              <button className="bg-green-500 text-white p-3 hover:bg-transparent border hover:border-green-500 hover:text-green-500 duration-300 rounded-md">
                Visit Course
              </button>
            )}
            {isSelf && (
              <button className="bg-blue-500 text-white p-3 hover:bg-transparent border hover:border-blue-500 hover:text-blue-500 duration-300 rounded-md">
                Edit Course
              </button>
            )}
          </div>
        </div>
      </div>
      {showModel && (
        <EnrollCourse
          session={session}
          courseData={courseData}
          showModel={setShowModel}
        />
      )}
    </div>
  );
}

export default SingleCOursePage;
