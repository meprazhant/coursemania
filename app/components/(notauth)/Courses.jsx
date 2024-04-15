"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import CourseCard from "../cards/CourseCard";
import Link from "next/link";

function Courses() {
  const ref = useRef(null);
  const [Viewpoint, setViewPoint] = useState("lg");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/course`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data" + res.status);
    }
    const data = await res.json();
    if (data.status === "error") {
      throw new Error(data.message);
    }
    setCourses(data.course);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewPoint("sm");
      } else if (window.innerWidth < 768) {
        setViewPoint("md");
      } else {
        setViewPoint("lg");
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col p-5 gap-5">
      <h2 className="text-xl md:text-3xl font-bold">
        Courses available for you
      </h2>
      {/* <div className="flex"> */}
      <Swiper
        ref={ref}
        slidesPerView={Viewpoint === "lg" ? 3 : Viewpoint === "md" ? 2 : 1}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper pb-8"
      >
        {courses.slice(0, 9).map((course) => (
          <SwiperSlide key={course._id}>
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className="h-[500px] flex flex-col justify-start p-5 rounded-md items-center gap-3 bg-gray-100 pb-10">
            <p>There's more to learn. Check out our courses page for more</p>
            <img
              src="https://www.catena-business-network.com/images/d5edaffd824dc4cd05987bb167a6033ea83e5bd5.png"
              alt="more"
              className="w-full h-[450px] rounded-md object-cover"
            />
            <Link
              href={"/courses"}
              className="bg-blue-500 border hover:border-blue-500 hover:text-blue-500 hover:bg-transparent duration-300 transition text-white p-2 rounded-md"
            >
              Explore more
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* </div> */}
    </div>
  );
}

export default Courses;
