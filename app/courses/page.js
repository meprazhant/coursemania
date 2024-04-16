import React from "react";
import Mainpage from "../components/courses/Mainpage";

const fetchCourses = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/course`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data " + res.status);
  }
  return res.json();
};

async function page() {
  let courses = "";
  try {
    courses = await fetchCourses();
  } catch (error) {
    console.error(error);
    courses = { status: "error", message: error.message };
  }

  if (courses.status === "error") {
    throw new Error(courses.message);
  }
  return (
    <div>
      <Mainpage courses={courses.course} />
    </div>
  );
}

export default page;
