import SearchMain from "@/app/components/search/SearchMain";
import React from "react";

const fetchSearch = async (query) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/search/${query}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data" + res.status);
  }
  return res.json();
};

async function page({ params }) {
  const { query } = params;
  if (!query) {
    return <div>No query provided</div>;
  }
  const search = await fetchSearch(query);
  if (search.status === "error") {
    throw new Error(search.message);
  }

  return (
    <div>
      <SearchMain search={search?.courses} query={query} />
    </div>
  );
}

export default page;
