import React from "react";

function page({ params }) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}

export default page;
