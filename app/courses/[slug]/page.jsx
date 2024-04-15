import SingleCOursePage from "@/app/components/courses/singleCourse/SingleCOursePage";
import React from "react";

async function fetchCourse(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return res.json();
}

async function page({ params }) {
  const { slug } = params;
  const course = await fetchCourse(slug);
  return <SingleCOursePage slug={slug} course={course} />;
}

export default page;
