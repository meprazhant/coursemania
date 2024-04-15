"use client";
import { useRouter } from "next/navigation";
import React from "react";

function ErEditCourse({ course }) {
  const [meetLink, setMeetLink] = React.useState(course?.meetLink || "");
  const [isLive, setIsLive] = React.useState(course?.isLive || false);
  const [updating, setUpdating] = React.useState(false);
  const router = useRouter();

  function updateCourse() {
    setUpdating(true);
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetLink,
        isLive,
        id: course._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Course Updated Successfully");
          setUpdating(false);
          router.refresh();
        } else {
          alert("An error occurred while updating the course");
          setUpdating(false);
        }
      });
  }
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <div className="w-1/2 bg-gray-100 rounded-lg p-4">
        <h1 className="text-2xl font-bold">Edit Course</h1>
        <div className="mt-4">
          <label htmlFor="meetLink" className="text-lg">
            Meeting Link
          </label>
          <input
            type="text"
            id="meetLink"
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
            placeholder="Meeting Link"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <label htmlFor="isLive" className="text-lg">
            Live Status : &nbsp;
            <span
              className={`
            ${isLive ? "text-green-500" : "text-red-500"}
            `}
            >
              {isLive ? "Live" : "Not Live"}
            </span>
          </label>
          <div className="flex">
            <button
              className={`ml-2 ${
                isLive ? "bg-red-500" : "bg-green-500"
              } text-white p-2 rounded-md`}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? "Make it Offline" : "Make it Live"}
            </button>
          </div>
        </div>
        <button
          disabled={updating}
          onClick={updateCourse}
          className={` ${
            updating
              ? "bg-gray-500 hover:bg-gray-400"
              : "bg-blue-500 hover:text-blue-500 hover:bg-transparent  hover:border-blue-500"
          } text-white p-2 rounded-md duration-200  border mt-6`}
        >
          {updating ? "Updating..." : "Update Course"}
        </button>
      </div>
    </div>
  );
}

export default ErEditCourse;
