"use client";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

function Landing() {
  let router = useRouter();
  const [search, setSearch] = useState("");

  function searchCourse() {
    if (search) {
      router.push(`/search/${search}`);
    }
  }
  return (
    <div className="md:p-16 p-0 max-h-[90vh]  overflow-hidden">
      <div className="bg-[#3F6745] rounded-md relative  ">
        <img
          src={"https://i.ibb.co/9HbyJgH/landing.jpg"}
          alt="landing"
          className="object-contain h-full w-4/5 rounded-md "
        />
        <div className="flex absolute top-0 left-0 h-full w-full justify-center items-end flex-col px-10 gap-5 pb-10">
          <div className="flex md:w-1/2 w-full flex-col gap-7">
            <h1 className="text-6xl josin text-white text-center">
              Lets grow your education level up with Academix
            </h1>
            <p className="text-white text-lg text-center">
              Join Academix to learn from the best
            </p>
            <div className="flex gap-1 justify-center items-center ">
              <div className="flex bg-white p-2 w-96 rounded-md">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchCourse();
                    }
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search for Course"
                  className="p-2 rounded-l-md w-10/12 outline-0 border-0"
                />
                <button
                  onClick={searchCourse}
                  className="bg-[#3F6745] text-white p-2 rounded-r-md w-2/12 flex justify-center items-center"
                >
                  <AiOutlineSearch size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
