import SingleCOursePage from "@/app/components/courses/singleCourse/SingleCOursePage";
import React from "react";

function page({ params }) {
  const { slug } = params;
  return <SingleCOursePage slug={slug} />;
}

export default page;
