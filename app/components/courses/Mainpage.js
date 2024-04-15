"use client";
import React, { useState } from "react";
import CategoriesData from "@/app/lib/Category";
import CourseCard from "../cards/CourseCard";

function Mainpage({ courses }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category === category)
      );
    }
  };

  return (
    <div className="flex p-2 flex-col gap-4">
      <div className="flex border-b border-b-black scrollbar-hide py-3 overflow-x-scroll w-full gap-8">
        {/* Render the active category */}
        <h1
          className={`text-sm bg-gray-200 p-2 rounded-full px-4 cursor-pointer hover:bg-gray-300 duration-200 ${
            activeCategory === "All" ? "bg-blue-500 text-white" : ""
          }`}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => handleClick("All")}
        >
          All
        </h1>
        {/* Render the rest of the categories */}
        {CategoriesData.map((category) =>
          activeCategory !== category.title ? (
            <h1
              key={category.id}
              onClick={() => handleClick(category.title)}
              className="text-sm bg-gray-200 p-2 rounded-full border px-4 cursor-pointer hover:bg-gray-300 duration-200"
              style={{ whiteSpace: "nowrap" }}
            >
              {category.title}
            </h1>
          ) : (
            <h1
              key={category.id}
              onClick={() => handleClick(category.title)}
              className="text-sm p-2 rounded-full px-4 cursor-pointer hover:bg-transparent hover:border-blue-500 border hover:text-blue-500 duration-200 bg-blue-500 text-white"
              style={{ whiteSpace: "nowrap" }}
            >
              {category.title}
            </h1>
          )
        )}
      </div>
      <div className="flex px-5">
        <h2 className="text-xl md:text-3xl font-bold">
          <span className="text-orange-800">{activeCategory}</span> course
          available for you
        </h2>
      </div>
      {(filteredCourses.length !== 0 && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-5">
          {filteredCourses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )) || (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-2xl text-gray-500">
            No courses found for category "{activeCategory}"
          </h1>
        </div>
      )}
    </div>
  );
}

export default Mainpage;
