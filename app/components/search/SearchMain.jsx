"use client";
import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CourseCard from "../cards/CourseCard";
import { useRouter } from "next/navigation";

function SearchMain({ search, query }) {
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState(query);
  const router = useRouter();
  const handleSearch = () => {
    setLoading(true);
    if (searchText === "") {
      router.push(`/search/all`);
      return;
    }
    router.push(`/search/${searchText}`);
  };

  useEffect(() => {
    setSearchText(query);
    setLoading(false);
  }, [query]);

  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Search For Query"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          defaultValue={query}
          className="border-2  border-gray-200 p-5 outline-none rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-5 hover:bg-transparent border hover:border-blue-500 hover:text-blue-500 duration-300 rounded-md"
        >
          <AiOutlineSearch size={22} />
        </button>
      </div>

      {!loading && (
        <div className="flex flex-col gap-5 ">
          <div className="flex">
            <h2 className="text-xl md:text-3xl">
              Search Results for <span className="text-red-800">"{query}"</span>
            </h2>
          </div>
          {search.length !== 0 && (
            <div
              className="grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
        "
            >
              {search.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          {search.length === 0 && (
            <div className="flex justify-center items-center h-96">
              <p>No results found</p>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-96">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default SearchMain;
