import React from "react";
import MStab from "./MStab";
import Enrolled from "./Enrolled";

function MSMain() {
  return (
    <div className="flex flex-col w-full">
      <MStab />
      <Enrolled />
    </div>
  );
}

export default MSMain;
