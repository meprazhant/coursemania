"use client";
import React from "react";
import CaregoriesData from "@/app/lib/Category";
import { useRouter } from "next/navigation";

function Categories() {
  const router = useRouter();
  return (
    <div className="flex flex-col p-5 gap-5">
      <h2 className="text-xl md:text-3xl font-bold">Available Categories</h2>
      <div
        className=" grid
        lg:grid-cols-5
        md:grid-cols-3
        sm:grid-cols-2
        gap-5
        w-full
      "
      >
        {CaregoriesData.map((category) => (
          <div className="flex flex-col gap-2 bg-[#3F6745] text-white p-4 rounded-lg">
            <h1 className="text-lg font-bold">{category.title}</h1>
            {category.tags.map((tag, index) => (
              <p
                onClick={() => {
                  router.push(`/search/${tag}`);
                }}
                key={index}
                className="text-sm text-gray-100 opacity-80 hover:underline hover:opacity-100 cursor-pointer"
              >
                {tag}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
