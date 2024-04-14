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

function Courses() {
  const ref = useRef(null);
  const [Viewpoint, setViewPoint] = useState("lg");

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
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
      </Swiper>
      {/* </div> */}
    </div>
  );
}

export default Courses;
